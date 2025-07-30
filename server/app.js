import express from "express";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/profile", profileRoutes);

const __filename = import.meta.filename;
const __dirname = path.dirname(__filename);

// serving static files (images and ...)
const clientPath = path.join(__dirname, '../client');
app.use(express.static(clientPath));

//serving home page:
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

export default app;
