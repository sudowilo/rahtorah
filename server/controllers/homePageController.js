import path from "path";
import { success } from "zod";

const __dirname = import.meta.dirname;
const clientPath = path.join(__dirname, "../../client");

export const homePage = (req, res) => {
  const user = req.user;
  res.sendFile(path.join(clientPath, "index.html"));
};

export const userCardRender = (req, res) => {
  return res.status(200).json({
    success: true,
    data: `<div class="up-side"><div class="user-info"><img src="public/profile-picture.svg" alt="profile picture" class="profile-picture"/><div class="user-name">حمیدرضا عباسی</div></div><nav><img src="public/menu.svg" alt="menu" class="menu" /></nav></div><div class="down-side"><div class="requests">درخواست‌ها</div><div class="open-trips">سفرهای فعال</div></div>`,
  });
};
