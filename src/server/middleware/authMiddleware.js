import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "دسترسی غیرمجاز، توکن ارسال نشده است",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = decode;

    next();
  } catch(error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "دسترسی غیرمجاز، توکن نامعتبر یا منقضی شده است"
    })
  }
};

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
