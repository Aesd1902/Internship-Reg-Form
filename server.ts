import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import multer from "multer";
import { body, validationResult } from "express-validator";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc and .docx files are allowed"));
    }
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize SQLite Database
  const db = new Database("database.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      collegeName TEXT NOT NULL,
      branch TEXT,
      yearOfPassing TEXT,
      selectedCourse TEXT NOT NULL,
      preferredJobRole TEXT,
      cvPath TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());
  app.use("/uploads", express.static("uploads"));

  // API Routes
  app.post(
    "/api/register",
    upload.single("cv"),
    [
      body("fullName").trim().notEmpty().escape(),
      body("email").isEmail().normalizeEmail(),
      body("phone").trim().notEmpty().escape(),
      body("collegeName").trim().notEmpty().escape(),
      body("selectedCourse").trim().notEmpty().escape(),
    ],
    (req: any, res: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        fullName,
        email,
        phone,
        collegeName,
        branch,
        yearOfPassing,
        selectedCourse,
        preferredJobRole,
      } = req.body;

      const cvPath = req.file ? req.file.path : null;

      try {
        const stmt = db.prepare(`
          INSERT INTO registrations (
            fullName, email, phone, collegeName, 
            branch, yearOfPassing, selectedCourse, preferredJobRole, cvPath
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const info = stmt.run(
          fullName,
          email,
          phone,
          collegeName,
          branch,
          yearOfPassing,
          selectedCourse,
          preferredJobRole,
          cvPath
        );

        res.json({ success: true, id: info.lastInsertRowid });
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to save registration" });
      }
    }
  );

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
