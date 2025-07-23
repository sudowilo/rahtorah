import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

//middlewares 
app.use(express.json());


//routes
app.use('/api/auth', authRoutes);

//home page for tests
app.get('/', (req, res)=>{
  res.json('this is home');
})

export default app;