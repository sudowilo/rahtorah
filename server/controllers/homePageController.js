import path from "path";

const __dirname = import.meta.dirname;
const clientPath = path.join(__dirname, "../../client");

export const homePage = (req, res) => {
  const user = req.user;
  res.sendFile(path.join(clientPath, "index.html"));
};