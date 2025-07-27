import { success } from "zod";
import supabase from "../lib/supabaseClient.js";

export const profileInfo = async (req, res) => {
  const user = req.user;

  const { data, error } = await supabase
    .from("users")
    .select("id, first_name, last_name, gender, username, phone_number, email")
    .eq("id", user.id)
    .single();

  if (error) {
    return res.status(500).json({
      success: false,
      message: "خطا در دریافت اطلاعات پروفایل بعدا تلاش کنید",
    });
  }

  res.status(200).json({
    success: true,
    message: "اطلاعات پروفایل با موفقیت دریافت شد",
    data
  });
};
