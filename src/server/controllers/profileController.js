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
    data,
  });
};

export const requests = async (req, res) => {
  const user = req.user;

  const { data, error } = await supabase
    .from("trip_participants")
    .select(
      `id,
      role,
      status,
      trip_id!inner(id, status, creator_id, origin_text, seats_total, allowed_gender, departure_date, destination_text, departure_time_to, departure_time_from, suggested_transport_service), 
      user_id!inner(id, username, last_name, first_name)`
    )
    .eq("trip_id.status", "open")
    .eq("trip_id.creator_id", user.id)
    .eq("status", "pending");

  if (error) {
    res.status(500).json({
      success: false,
      message: "خطای داخلی",
      error,
    });
  }

  return res.status(200).json({
    success: true,
    message: "لیست درخواست های دریافتی",
    data,
  });
};

export const openTrips = async (req, res) => {
  const user = req.user;

  const { data, error } = await supabase
    .from("trip_participants")
    .select(
      `id,
      role,
      status,
      trip_id!inner(id, status, creator_id, origin_text, seats_total, allowed_gender, departure_date, destination_text, departure_time_to, departure_time_from, suggested_transport_service), 
      user_id`
    )
    .eq("user_id", user.id)
    .eq("status", "accepted")
    .eq("trip_id.status", "open");

  if (error) {
    res.status(500).json({
      success: false,
      message: "خطای داخلی",
      error,
    });
  }

  return res.status(200).json({
    success: true,
    message: "لیست سفرهای فعال",
    data
  });
};
