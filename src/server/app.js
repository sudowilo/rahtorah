import express from "express";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";

const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/trip", tripRoutes);

//home page for tests
app.get("/", (req, res) => {
  res.json("this is home");
});

export default app;
