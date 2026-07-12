const db = require("../config/db");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.create = (req, res) => {
  const contentId = Number(req.params.id);
  const { name = "", email = "", body = "", rating } = req.body;
  if (!db.prepare("SELECT id FROM quizzes WHERE id=?").get(contentId))
    return res.status(404).json({
      error: "Không tìm thấy bài thi.",
    });
  if (
    !name.trim() ||
    !emailPattern.test(email) ||
    !body.trim() ||
    Number(rating) < 1 ||
    Number(rating) > 5
  ) {
    return res.status(400).json({
      error: "Vui lòng nhập tên, email hợp lệ, bình luận và điểm từ 1 đến 5.",
    });
  }
  db.prepare(
    "INSERT INTO comments(quiz_id,name,email,body,rating) VALUES (?,?,?,?,?)",
  ).run(contentId, name.trim(), email.trim(), body.trim(), Number(rating));
  res.status(201).json({
    message: "Comment created successfully",
  });
};
