import { validateCity } from "../validators/city.js";
import { tripSchema } from "../validators/trip.js";
import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";
dayjs.extend(jalali);
const now = dayjs();

export const createTrip = async (req, res) => {
  const {
    origin,
    destination,
    departureDate,
    departureTimeFrom,
    departureTimeTo,
    suggestedTransportService,
    seatsTotal,
    allowedGender,
    note,
    user,
  } = req.body;

  const result = tripSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "مشکل در اطلاعات ورودی",
      errors: result.error.format(),
    });
  }
  const validOrigin = validateCity(origin);
  const validDestination = validateCity(destination);

  if (!validOrigin) {
    return res.status(400).json({
      success: false,
      message: "مبدا ارسال شده صحیح نمی‌باشد",
    });
  }
  if (!validDestination) {
    return res.status(400).json({
      success: false,
      message: "مقصد ارسال شده صحیح نمی‌باشد",
    });
  }

  const dateIsToday = dayjs(departureDate, { jalali: true }).isSame(now, "day");
  if (dateIsToday) {
    const from = dayjs(`${departureDate} ${departureTimeFrom}`, "HH:mm");
    const to = dayjs(`${departureDate} ${departureTimeTo}`, "HH:mm");
    const nowTime = dayjs().set("second", 0).set("millisecond", 0).calendar("jalali");
    console.log("from:", from);
    console.log("to:", to);
    console.log("nowTime:", nowTime);
    if (from.isBefore(nowTime) || to.isBefore(nowTime)) {
      return res.status(400).json({
        success: false,
        message: "زمان حرکت باید بعد از زمان فعلی باشد",
      });
    }
  }

  return res.json({
    success: true,
    message: "hi there",
    origin,
    destination,
    user,
  });
};
