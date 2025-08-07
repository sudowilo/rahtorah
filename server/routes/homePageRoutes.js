import { Router } from "express";
import { uiAuthMiddleware } from "../middleware/authMiddleware.js";
import path from "path";

const router = new Router();

const __dirname = import.meta.dirname;
const clientPath = path.join(__dirname, "../../client");

router.get("/", uiAuthMiddleware, (req, res) => {
  const user = req.user;
  if (!req.auth) {
    return res
      .status(401)
      .send(
        "<h1>oh hello stranger!</h1><h2>thanks god you are finally home</h2>"
      );
  }
  res.sendFile(path.join(clientPath, "index.html"));
});

export default router;
