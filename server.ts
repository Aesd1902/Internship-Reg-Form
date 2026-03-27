import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());

  // API Routes
  app.post("/api/register", (req, res) => {
    const { 
      fullName, email, phone, collegeName, 
      branch, yearOfPassing, selectedCourse, preferredJobRole 
    } = req.body;

    try {
      const stmt = db.prepare(`
        INSERT INTO registrations (
          fullName, email, phone, collegeName, 
          branch, yearOfPassing, selectedCourse, preferredJobRole
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const info = stmt.run(
        fullName, email, phone, collegeName, 
        branch, yearOfPassing, selectedCourse, preferredJobRole
      );

      res.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save registration" });
    }
  });

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
