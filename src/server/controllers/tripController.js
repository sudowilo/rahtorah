import supabase from "../lib/supabaseClient.js";
import { validateCity } from "../validators/city.js";
import { tripSchema, tripListSchema } from "../validators/trip.js";
import { timeLessThan } from "../utils/time.js";
import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";
dayjs.extend(jalali);
const now = dayjs();

const openCreatedTrips = async (userId) => {
  const { data, error } = await supabase
    .from("trip_participants")
    .select("*, trip_id!inner(*)")
    .eq("trip_id.status", "open")
    .eq("user_id", userId);

  return { data, error };
};

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
  } = req.body;
  const user = req.user;
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
    const from = dayjs(
      `${departureDate} ${departureTimeFrom}`,
      "YYYY-MM-DD HH:mm"
    );
    const to = dayjs(`${departureDate} ${departureTimeTo}`, "YYYY-MM-DD HH:mm");
    const nowTime = dayjs()
      .set("second", 0)
      .set("millisecond", 0)
      .calendar("jalali");

    if (timeLessThan(from, nowTime) || timeLessThan(to, nowTime)) {
      return res.status(400).json({
        success: false,
        message: "زمان حرکت باید بعد از زمان فعلی باشد",
      });
    }

    if (timeLessThan(to, from)) {
      return res.status(400).json({
        success: false,
        message: "زمان پایان نباید قبل از زمان شروع باشد",
      });
    }
  }

  const { data: hostUser, error: fetchError } = await supabase
    .from("users")
    .select()
    .maybeSingle();

  if (!hostUser) {
    console.log(fetchError);
    return res.status(500).json({
      success: false,
      message:
        "خطای غیرمنتظره، حساب کاربری شما در دیتابیس وجود ندارد با پشتیبانی ارتباط برقرار کنید",
    });
  }

  if (allowedGender !== hostUser.gender && allowedGender !== "any") {
    return res.status(400).json({
      success: false,
      message:
        'شما نمی‌توانید جنسیت مخالف خود را برای سفر انتخاب کنید از گزینه "مهم نیست" استفاده کنید',
    });
  }

  const openTrips = await openCreatedTrips(user.id);

  if (openTrips.error) {
    return res.status(500).json({
      success: false,
      message: "خطا هنگام دریافت اطلاعات سفر",
    });
  }

  if (openTrips.data.length >= 3) {
    return res.status(405).json({
      success: false,
      message:
        "شما نمی‌توانید همزمان در بیش از ۳ آگهی سفر فعال حضور داشته باشید",
    });
  }

  const { data, error } = await supabase
    .from("trips")
    .insert({
      creator_id: user.id,
      origin_text: origin,
      destination_text: destination,
      departure_date: departureDate,
      departure_time_from: departureTimeFrom,
      departure_time_to: departureTimeTo,
      suggested_transport_service: suggestedTransportService,
      seats_total: seatsTotal,
      allowed_gender: allowedGender,
      note,
      status: "open",
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "خطای داخلی بعدا تلاش کنید",
      error,
    });
  }

  const { data: participant, error: participantError } = await supabase
    .from("trip_participants")
    .insert({
      trip_id: data.id,
      user_id: user.id,
      role: "host",
      status: "accepted",
    })
    .select()
    .maybeSingle();

  if (participantError) {
    console.log(participantError);
    return res.status(500).json({
      success: false,
      message: "خطا در ثبت کاربر به عنوان صاحب آگهی",
    });
  }

  return res.json({
    success: true,
    message: "آگهی سفر با موفقیت ثبت شد",
    data,
    participant,
  });
};

export const listTrips = async (req, res) => {
  const result = tripListSchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "مشکل در اطلاعات ورودی",
      errors: result.error.format(),
    });
  }

  const { origin, destination } = result.data;

  //validate if provided city is valid or not
  const validOrigin = origin ? validateCity(origin) : true;
  const validDestination = destination ? validateCity(destination) : true;

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

  // building query
  let query = supabase
    .from("trips")
    .select("*")
    .eq("status", "open")
    .order("departure_date", { ascending: true })
    .order("departure_time_from", { ascending: true });

  if (origin) query = query.eq("origin_text", origin);
  if (destination) query = query.eq("destination_text", destination);

  //fetching data
  const { data, error } = await query;

  if (error) {
    return res.status(500).json({
      success: false,
      message: "مشکلی در دریافت سفرها پیش آمد",
    });
  }

  return res.status(200).json({
    success: true,
    message: "here is you list sir",
    data,
  });
};

export const createJoinRequest = async (req, res) => {
  const user = req.user;

  const { tripId, role, status } = req.body;

  const { data, error } = await supabase
    .from("trip_participants")
    .insert({
      trip_id: tripId,
      user_id: user.id,
      role,
      status,
    })
    .select()
    .maybeSingle();

  if (error) {
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: "درخواست شما از قبل ارسال شده",
      })
    }
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "خطا در ارسال درخواست",
    });
  }

  return res.status(200).json({
    success: true,
    message: "درخواست عضویت در سفر با موفقیت ارسال شد",
  });
};
