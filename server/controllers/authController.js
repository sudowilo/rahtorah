import supabase from "../lib/supabaseClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userSchema } from "../validators/user.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      username,
      password,
      phoneNumber,
      email,
    } = req.body;

    const userInput = {
      firstName,
      lastName,
      gender,
      username,
      password,
      phoneNumber,
      email,
    };

    const result = userSchema.safeParse(userInput);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "ورودی ها را طبق فرمت صحیح وارد نمایید",
        errors: result.error.format(),
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from("users")
      .insert({
        first_name: firstName,
        last_name: lastName,
        gender,
        username,
        password: hashPassword,
        phone_number: phoneNumber,
        email,
      })
      .select()
      .maybeSingle();

    if (error) {
      if (error.code === "23505") {
        const { details } = error;
        //getting all conflicts (not expected response from database so does'nt
        //work currently but it is a beautiful solution so i kept it)
        const conflicts = [];
        if (details.includes("username")) conflicts.push("نام کاربری");
        if (details.includes("phone_number")) conflicts.push("شماره همراه");
        if (details.includes("email")) conflicts.push("ایمیل");

        return res.status(409).json({
          success: false,
          message: `${conflicts.join(", ")} از قبل رزرو شده`,
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: "کاربر ثبت نشد دوباره تلاش کنید",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not defined in .env");
      return res.status(500).json({
        success: false,
        message: "خطای سرور",
      });
    }
    const token = jwt.sign(
      { id: data.id, username: data.username },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      success: true,
      message: "کاربر با موفقیت ثبت شد",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "خطای داخلی",
    });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!(identifier && password)) {
    return res.status(400).json({
      success: false,
      message: "لطفا اطلاعات را وارد کنید",
    });
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .or(
      `username.eq.${identifier},phone_number.eq.${identifier},email.eq.${identifier}`
    )
    .maybeSingle();

  if (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "مشکل در پردازش اطلاعات دوباره تلاش کنید",
    });
  }

  if (!data) {
    return res.status(401).json({
      success: false,
      message: "حسابی با اطلاعات ورودی وجود ندارد",
    });
  }

  const { id, password: hash } = data;
  const passwordVerify = await bcrypt.compare(password, hash);

  if (!passwordVerify) {
    return res.status(401).json({
      success: false,
      message: "رمز عبور اشتباه است",
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not defined in .env");
    return res.status(500).json({
      success: false,
      message: "خطای سرور",
    });
  }
  const token = jwt.sign(
    { id: data.id, username: data.username },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    success: true,
    message: "ورود موفق",
    token,
  });
};

export const isAuthorized = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "کاربر احراز هویت شده است.",
  });
}
