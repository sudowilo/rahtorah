import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import path from "path";

const router = new Router();

const __dirname = import.meta.dirname;
const clientPath = path.join(__dirname, "../../client");

router.get("/", authMiddleware, (req, res) => {
  const user = req.user;
  
  res.sendFile(path.join(clientPath, "index.html"));
});

export default router;
