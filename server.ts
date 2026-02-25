import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Database
const db = new Database("leads.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    whatsapp TEXT,
    operation TEXT,
    propertyType TEXT,
    zone TEXT,
    budget TEXT,
    classification TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/leads", (req, res) => {
    const { name, whatsapp, operation, propertyType, zone, budget, classification, timeline } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO leads (name, whatsapp, operation, propertyType, zone, budget, classification, timeline)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(name, whatsapp, operation, propertyType, zone, budget, classification, timeline);
      res.json({ id: info.lastInsertRowid, status: "success" });
    } catch (error) {
      console.error("Error saving lead:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.get("/api/leads", (req, res) => {
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY createdAt DESC").all();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.patch("/api/leads/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, id);
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  app.get("/api/leads/export", (req, res) => {
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY createdAt DESC").all();
      const headers = ["ID", "Nombre", "WhatsApp", "Operación", "Inmueble", "Zona", "Presupuesto", "Clasificación", "Plazo", "Estado", "Fecha"];
      const rows = leads.map((l: any) => [
        l.id, l.name, l.whatsapp, l.operation, l.propertyType, l.zone, l.budget, l.classification, l.timeline, l.status, l.createdAt
      ]);
      
      const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=leads_inmobiliaria.csv");
      res.send(csvContent);
    } catch (error) {
      res.status(500).send("Export failed");
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
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
