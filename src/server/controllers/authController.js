import supabase from "../lib/supabaseClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

    if (
      !(
        firstName &&
        lastName &&
        gender &&
        username &&
        password &&
        phoneNumber &&
        email
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "please fill all of the requirements",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (password.includes(" ") || password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "password should be more that 8 characters and shall not contain space",
      });
    }

    res.status(200).json({
      success: true,
      message: "ready to go",
      data: {
        firstName,
        lastName,
        gender,
        username,
        phoneNumber,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

export const login = (req, res) => {
  res.json("here is login section");
};
