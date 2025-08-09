import supabase from "../lib/supabaseClient.js";
import dayjs from "dayjs";
import jalali from "jalali-plugin-dayjs";
dayjs.extend(jalali);
dayjs.calendar("jalali");

export const closeTrips = async (req, res, next) => {
  const now = dayjs();

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("status", "open")
    .lte("departure_date", now.format("YYYY-MM-DD"));

  if (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "خطای داخلی هنگام دریافت سفرها",
    });
  }

  const ids = [];
  for (const trip of data) {
    const date = dayjs(`${trip.departure_date} ${trip.departure_time_to}`, {
      jalali: true,
    });

    if (date.unix() < now.unix()) {
      ids.push(trip.id);
      continue;
    }
  }

  const { error: updateError } = await supabase
    .from("trips")
    .update({ status: "closed" })
    .in("id", ids);

  if (updateError) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "خطای داخلی هنگام دریافت سفرها",
    });
  }
  next();
};

export const validateOpenTrip = async (req, res, next) => {};
