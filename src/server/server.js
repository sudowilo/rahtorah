import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error)=> {
    if (error) {
        return console.log(error);
    }
    console.log(`server running on http://localhost:${PORT}`);
})