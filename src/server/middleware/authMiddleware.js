import jwt from "jsonwebtoken";

export const checkAlreadyLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.status(403).json({
        success: false,
        message: "شما در حال حاضر وارد شده‌اید.",
      });
    } catch (e) {
      // token invalid — continue to login/register
    }
  }
  next();
};
