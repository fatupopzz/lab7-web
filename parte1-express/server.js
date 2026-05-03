import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el body de las requests
app.use(express.json());

// Logger simple para ver que rutas se piden en consola
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Ruta raiz
app.get("/", (req, res) => {
  res.type("text/plain").send("Servidor activo");
});

// Info del curso
app.get("/info", (req, res) => {
  res.json({
    mensaje: "Ruta de informacion",
    curso: "Sistemas y Tecnologias Web",
    tecnologia: "Node.js + Express",
  });
});

// Saludo
app.get("/saludo", (req, res) => {
  res.type("text/plain").send("Hola! Bienvenido al servidor de Sistemas y Tecnologias Web");
});

// Estado del servidor
app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    status: "running",
    puerto: PORT,
  });
});

// Lee datos.json y los devuelve
app.get("/api/student", async (req, res, next) => {
  try {
    const filePath = path.join(process.cwd(), "datos.json");
    const texto = await fs.readFile(filePath, "utf-8");
    res.type("application/json").send(texto);
  } catch (err) {
    next(err);
  }
});

// Middleware 404 para rutas que no existen
app.use((req, res) => {
  res.status(404).type("text/plain").send(`Ruta no encontrada: ${req.url}`);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
