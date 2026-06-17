import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECTS_DIR = path.resolve(__dirname, "../src/content/projects");
const PORT = 4322;

// Projects are organised into category subfolders on disk, but their public IDs
// stay flat (just the filename). These helpers map between the two.
const CATEGORY_DIRS = { Design: "design", Interactive: "interactive" };

function dirForCategory(category) {
  return path.join(PROJECTS_DIR, CATEGORY_DIRS[category] || "interactive");
}

// Recursively collect every .md file under PROJECTS_DIR as { id, filePath }.
function listProjectFiles(dir = PROJECTS_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listProjectFiles(full);
    if (entry.isFile() && entry.name.endsWith(".md")) {
      return [{ id: entry.name.replace(/\.md$/, ""), filePath: full }];
    }
    return [];
  });
}

// Find an existing project file by its flat ID, wherever it lives.
function findProjectFile(id) {
  return listProjectFiles().find((p) => p.id === id)?.filePath ?? null;
}

// Helper to parse simple frontmatter and body from Markdown files
function parseMarkdown(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parts = fileContent.split("---");
  if (parts.length < 3) return null;

  const frontmatterText = parts[1];
  const body = parts.slice(2).join("---").trim();

  const data = {};
  const lines = frontmatterText.split("\n");
  let currentKey = null;
  let inMultiLine = false;
  let multiLineValue = "";

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed && !inMultiLine) continue;

    // Check if we are parsing multiline codeSnippet
    if (inMultiLine) {
      // If line is indented, it's part of the multiline block
      if (line.startsWith("  ") || line.startsWith("\t") || line === "") {
        // Strip out the first 2 spaces of indentation
        const contentLine = line.startsWith("  ") ? line.substring(2) : line;
        multiLineValue += contentLine + "\n";
        continue;
      } else {
        // End of multiline block
        data[currentKey] = multiLineValue.trimEnd();
        inMultiLine = false;
      }
    }

    if (line.includes(":")) {
      const colonIdx = line.indexOf(":");
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();

      if (val === "|") {
        currentKey = key;
        inMultiLine = true;
        multiLineValue = "";
        continue;
      }

      if (val === "") {
        currentKey = key;
        data[key] = [];
      } else {
        // Simple parser for numbers, booleans, and quotes
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        } else if (val.startsWith("'") && val.endsWith("'")) {
          val = val.slice(1, -1);
        } else if (val === "true") {
          val = true;
        } else if (val === "false") {
          val = false;
        } else if (!isNaN(val)) {
          val = Number(val);
        }
        data[key] = val;
      }
    } else if (line.startsWith("-") && currentKey && Array.isArray(data[currentKey])) {
      let val = line.substring(1).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      } else if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1);
      }
      data[currentKey].push(val);
    }
  }

  if (inMultiLine && currentKey) {
    data[currentKey] = multiLineValue.trimEnd();
  }

  return { data, body };
}

// Helper to format metadata back into Markdown frontmatter
function formatMarkdown(data, body) {
  let fm = "---\n";
  fm += `title: "${data.title.replace(/"/g, '\\"')}"\n`;
  fm += `category: "${data.category || "Interactive"}"\n`;
  fm += `year: ${data.year}\n`;
  fm += `status: "${data.status}"\n`;

  fm += "medium:\n";
  if (Array.isArray(data.medium)) {
    data.medium.forEach((m) => {
      fm += `  - "${m.replace(/"/g, '\\"')}"\n`;
    });
  }

  fm += `concept: "${data.concept.replace(/"/g, '\\"').replace(/\n/g, " ")}"\n`;

  fm += "software:\n";
  if (Array.isArray(data.software)) {
    data.software.forEach((s) => {
      fm += `  - "${s.replace(/"/g, '\\"')}"\n`;
    });
  }

  fm += "hardware:\n";
  if (Array.isArray(data.hardware)) {
    data.hardware.forEach((h) => {
      fm += `  - "${h.replace(/"/g, '\\"')}"\n`;
    });
  }

  fm += "inputs:\n";
  if (Array.isArray(data.inputs)) {
    data.inputs.forEach((i) => {
      fm += `  - "${i.replace(/"/g, '\\"')}"\n`;
    });
  }

  fm += `videoUrl: "${data.videoUrl}"\n`;
  fm += `thumbnailUrl: "${data.thumbnailUrl}"\n`;

  if (data.blueprintUrl) {
    fm += `blueprintUrl: "${data.blueprintUrl}"\n`;
  }
  if (data.blueprintCaption) {
    fm += `blueprintCaption: "${data.blueprintCaption.replace(/"/g, '\\"')}"\n`;
  }

  if (data.academicContext) {
    fm += `academicContext: "${data.academicContext.replace(/"/g, '\\"').replace(/\n/g, " ")}"\n`;
  }
  if (Array.isArray(data.process) && data.process.length > 0) {
    fm += "process:\n";
    data.process.forEach((step) => {
      fm += `  - "${step.replace(/"/g, '\\"').replace(/\n/g, " ")}"\n`;
    });
  }
  if (data.challenges) {
    fm += `challenges: "${data.challenges.replace(/"/g, '\\"').replace(/\n/g, " ")}"\n`;
  }
  if (data.researchRelevance) {
    fm += `researchRelevance: "${data.researchRelevance.replace(/"/g, '\\"').replace(/\n/g, " ")}"\n`;
  }

  if (data.mediaGallery && data.mediaGallery.length > 0) {
    fm += "mediaGallery:\n";
    data.mediaGallery.forEach((url) => {
      fm += `  - "${url}"\n`;
    });
  }

  fm += `codeLanguage: "${data.codeLanguage || "glsl"}"\n`;

  if (data.codeSnippet) {
    fm += "codeSnippet: |\n";
    const lines = data.codeSnippet.split("\n");
    lines.forEach((line) => {
      fm += `  ${line}\n`;
    });
  }

  fm += "---\n";
  fm += body;
  return fm;
}

const server = http.createServer((req, res) => {
  // CORS Headers for Local Development Communication
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  // GET /api/projects - Returns list of all project data parsed from markdown
  if (req.method === "GET" && parsedUrl.pathname === "/api/projects") {
    try {
      if (!fs.existsSync(PROJECTS_DIR)) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify([]));
        return;
      }

      const projects = listProjectFiles().map(({ id, filePath }) => {
        const parsed = parseMarkdown(filePath);
        return {
          id,
          ...parsed,
        };
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(projects));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to read projects", details: err.message }));
    }
    return;
  }

  // POST /api/projects/save - Overwrites a markdown file with incoming edits
  if (req.method === "POST" && parsedUrl.pathname === "/api/projects/save") {
    let bodyData = "";
    req.on("data", (chunk) => {
      bodyData += chunk;
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(bodyData);
        const { id, data, body } = payload;

        if (!id || /[\/\\.]/.test(id)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid project ID" }));
          return;
        }

        // Target location is driven by the project's category folder. If the
        // category changed, the file is relocated by writing to the new folder
        // and removing the stale copy.
        const targetDir = dirForCategory(data.category);
        const filePath = path.join(targetDir, `${id}.md`);
        const existingPath = findProjectFile(id);
        const markdownContent = formatMarkdown(data, body || "");

        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(filePath, markdownContent, "utf-8");

        if (existingPath && path.resolve(existingPath) !== path.resolve(filePath)) {
          fs.unlinkSync(existingPath);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Project saved successfully", id }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to save project", details: err.message }));
      }
    });
    return;
  }

  // POST /api/projects/create - Generates a new blank template markdown file
  if (req.method === "POST" && parsedUrl.pathname === "/api/projects/create") {
    let bodyData = "";
    req.on("data", (chunk) => {
      bodyData += chunk;
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(bodyData);
        const name = payload.name || "new-project";
        const id = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        if (findProjectFile(id)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Project file already exists" }));
          return;
        }

        const defaultData = {
          title: name.toUpperCase(),
          category: "Interactive",
          year: new Date().getFullYear(),
          status: "In Development",
          medium: ["New Installation"],
          concept: "Artistic concept description goes here.",
          software: ["TouchDesigner"],
          hardware: ["ESP32"],
          inputs: ["None"],
          videoUrl:
            "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-in-dark-room-41617-large.mp4",
          thumbnailUrl:
            "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-in-dark-room-41617-large.mp4",
          blueprintUrl: "",
          blueprintCaption: "",
          codeLanguage: "javascript",
          codeSnippet: "// Insert code snippet here",
        };

        const markdownContent = formatMarkdown(
          defaultData,
          "### Detailed Section\n\nAdd extra descriptions or ASCII maps.",
        );

        const targetDir = dirForCategory(defaultData.category);
        const filePath = path.join(targetDir, `${id}.md`);
        fs.mkdirSync(targetDir, { recursive: true });

        fs.writeFileSync(filePath, markdownContent, "utf-8");

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Project created successfully", id }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to create project", details: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`SYS_CMS_DAEMON: Listening on http://localhost:${PORT}`);
});
