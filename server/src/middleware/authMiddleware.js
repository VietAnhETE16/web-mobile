const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token)
    return res.status(401).json({
      error: "Bạn cần đăng nhập.",
    });
  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET || "online-quiz-development-secret",
    );
    next();
  } catch {
    res.status(401).json({
      error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn.",
    });
  }
}
module.exports = authMiddleware;
