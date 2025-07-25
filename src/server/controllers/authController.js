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
    const hashPassword = await bcrypt.hash(password, salt);

    //checking least securities of password
    if (password.includes(" ") || password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "password should be more that 8 characters and shall not contain space",
      });
    }

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
      .single();

    if (error) {
      if (error.code === "23505") {
        const { details } = error;
        const conflicts = [];
        if (details.includes("username")) conflicts.push("username");
        if (details.includes("phone_number")) conflicts.push("phone_number");
        if (details.includes("email")) conflicts.push("email");

        return res.status(409).json({
          success: false,
          message: `user with same ${conflicts.join(", ")} already exists`,
        });
      }

      console.log(error);
      return res.status(500).json({
        success: false,
        message: "couldn't insert user to database",
      });
    }

    res.status(200).json({
      success: true,
      message: "ready to go",
      data,
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
