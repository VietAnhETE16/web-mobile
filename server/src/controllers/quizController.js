const db = require("../config/db");
const base = `SELECT q.*,COUNT(DISTINCT qs.id) question_count,COUNT(DISTINCT c.id) comment_count,COALESCE(ROUND(AVG(c.rating),1),0) average_rating FROM quizzes q LEFT JOIN questions qs ON qs.quiz_id=q.id LEFT JOIN comments c ON c.quiz_id=q.id`;
exports.list = (_q, r) =>
  r.json(db.prepare(`${base} GROUP BY q.id ORDER BY q.created_at DESC`).all());
exports.detail = (req, res) => {
  const id = +req.params.id;
  if (!db.prepare("SELECT id FROM quizzes WHERE id=?").get(id))
    return res.status(404).json({
      error: "Không tìm thấy bài thi.",
    });
  db.prepare("UPDATE quizzes SET view_count=view_count+1 WHERE id=?").run(id);
  db.prepare(
    "UPDATE site_stats SET total_views=total_views+1 WHERE id=1",
  ).run();
  const quiz = db.prepare(`${base} WHERE q.id=? GROUP BY q.id`).get(id);
  quiz.comments = db
    .prepare("SELECT * FROM comments WHERE quiz_id=? ORDER BY created_at DESC")
    .all(id);
  res.json(quiz);
};
exports.questions = (req, res) => {
  const rows = db
    .prepare(
      "SELECT id,question_text,order_index FROM questions WHERE quiz_id=? ORDER BY order_index",
    )
    .all(+req.params.id);
  rows.forEach(
    (q) =>
      (q.options = db
        .prepare(
          "SELECT id,option_text,order_index FROM options WHERE question_id=? ORDER BY order_index",
        )
        .all(q.id)),
  );
  res.json(rows);
};
