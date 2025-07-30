import { z } from "zod";

const persianRegex = /^[\u0600-\u06FF\s]{3,}$/;
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{3,}$/;
const passwordRegex = /^[^\s]{8,}$/;
const phoneRegex = /^09\d{9}$/;

export const userSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .regex(persianRegex, "نام باید فارسی باشد و حداقل ۳ حرف داشته باشد"),
  lastName: z
    .string()
    .min(3)
    .regex(
      persianRegex,
      "نام خانوادگی باید فارسی باشد و حداقل ۳ حرف داشته باشد"
    ),
  gender: z.enum(["male", "female"]),
  username: z
    .string()
    .regex(
      usernameRegex,
      "نام کاربری باید با حرف شروع شود و حداقل ۳ کاراکتر انگلیسی باشد"
    ),
  password: z
    .string()
    .regex(
      passwordRegex,
      "رمز عبور باید حداقل ۸ کاراکتر باشد و فاصله نداشته باشد"
    ),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "شماره باید با 09 شروع شده و ۱۱ رقم باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
});
