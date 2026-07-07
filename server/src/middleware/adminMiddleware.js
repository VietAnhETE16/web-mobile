function adminMiddleware(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Bạn không có quyền truy cập trang này." });
  next();
}

module.exports = adminMiddleware;
