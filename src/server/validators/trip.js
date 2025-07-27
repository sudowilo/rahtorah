import { z } from "zod";
import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";

dayjs.extend(jalali);

const now = dayjs();

const persianLocationRegex = /^[\u0600-\u06FF\s]{2,}\/[\u0600-\u06FF\s]{2,}$/;
export const tripSchema = z.object({
  origin: z
    .string()
    .min(1, "مبدا الزامی است")
    .max(30, "مبدا نباید بیشتر از ۳۰ کاراکتر باشد")
    .regex(persianLocationRegex, "فرمت مبدا باید استان/شهر و به فارسی باشد"),

  destination: z
    .string()
    .min(1, "مقصد الزامی است")
    .max(30, "مقصد نباید بیشتر از ۳۰ کاراکتر باشد")
    .regex(persianLocationRegex, "فرمت مقصد باید استان/شهر و به فارسی باشد"),

  departureDate: z.string().refine((val) => {
    const inputDate = dayjs(val, { jalali: true });
    return (
      (inputDate.isValid() && inputDate.isSame(now, "day")) ||
      inputDate.isAfter(now, "day")
    );
  }, "تاریخ باید معتبر و امروز یا بعد از آن باشد"),

  departureTimeFrom: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "ساعت باید به فرمت HH:mm باشد"),

  departureTimeTo: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "ساعت باید به فرمت HH:mm باشد"),

  suggestedTransportService: z
    .string()
    .max(20, "نام سرویس نباید بیشتر از ۲۰ کاراکتر باشد")
    .optional(),

  seatsTotal: z
    .number({ invalid_type_error: "تعداد باید عدد باشد" })
    .int()
    .min(1)
    .max(3),

  allowedGender: z.enum(["male", "female", "any"]),

  note: z
    .string()
    .max(400, "یادداشت نباید بیشتر از ۴۰۰ کاراکتر باشد")
    .optional(),
});
