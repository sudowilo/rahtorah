import { success } from "zod";
import { validateCity } from "../validators/city.js";

export const createTrip = async (req, res) => {
  const { origin, destination } = req.body;
  
  const validOrigin = validateCity(origin);
  const validDestination = validateCity(destination);

  if (!validOrigin) {
    return res.status(400).json({
      success: false,
      message: "مبدا ارسال شده صحیح نمی‌باشد"
    })
  }
  if (!validDestination) {
    return res.status(400).json({
      success: false,
      message: "مقصد ارسال شده صحیح نمی‌باشد"
    })
  }

  return res.json({
    message: "hi there"
  });
};
