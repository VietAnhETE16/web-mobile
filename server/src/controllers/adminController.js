const db = require("../config/db");
const count = (t) => db.prepare(`SELECT COUNT(*) n FROM ${t}`).get().n;
exports.stats = (_q, r) =>
  r.json({
    total_views: db
      .prepare("SELECT total_views FROM site_stats WHERE id=1")
      .get().total_views,
    total_quizzes: count("quizzes"),
    total_questions: count("questions"),
    total_attempts: count("quiz_attempts"),
    total_comments: count("comments"),
    total_contacts: count("contacts"),
  });
exports.quizzes = (_q, r) =>
  r.json(db.prepare("SELECT * FROM quizzes ORDER BY created_at DESC").all());
exports.createQuiz = (q, r) => {
  const b = q.body;
  if (!b.title || !b.description || !b.category)
    return r.status(400).json({
      error: "Vui lòng nhập đủ thông tin.",
    });
  const id = Number(
    db
      .prepare(
        "INSERT INTO quizzes(title,description,category,duration_minutes,image_url,created_by) VALUES(?,?,?,?,?,?)",
      )
      .run(
        b.title,
        b.description,
        b.category,
        +b.duration_minutes || 15,
        b.image_url || "",
        q.user.id,
      ).lastInsertRowid,
  );
  r.status(201).json({
    message: "Quiz created successfully",
    quiz_id: id,
  });
};
exports.updateQuiz = (q, r) => {
  const b = q.body;
  db.prepare(
    "UPDATE quizzes SET title=?,description=?,category=?,duration_minutes=?,image_url=?,updated_at=CURRENT_TIMESTAMP WHERE id=?",
  ).run(
    b.title,
    b.description,
    b.category,
    +b.duration_minutes,
    b.image_url || "",
    +q.params.id,
  );
  r.json({
    message: "Quiz updated successfully",
  });
};
exports.deleteQuiz = (q, r) => {
  db.prepare("DELETE FROM quizzes WHERE id=?").run(+q.params.id);
  r.json({
    message: "Quiz deleted successfully",
  });
};
function validOptions(options) {
  return (
    Array.isArray(options) &&
    options.length === 4 &&
    options.filter((o) => +o.is_correct === 1).length === 1
  );
}
exports.createQuestion = (q, r) => {
  const b = q.body;
  if (!b.question_text || !validOptions(b.options))
    return r.status(400).json({
      error: "Câu hỏi phải có 4 đáp án và đúng 1 đáp án đúng.",
    });
  db.exec("BEGIN");
  try {
    const id = Number(
      db
        .prepare(
          "INSERT INTO questions(quiz_id,question_text,explanation,order_index) VALUES(?,?,?,?)",
        )
        .run(
          +q.params.id,
          b.question_text,
          b.explanation || "",
          +b.order_index || 0,
        ).lastInsertRowid,
    );
    const add = db.prepare(
      "INSERT INTO options(question_id,option_text,is_correct,order_index) VALUES(?,?,?,?)",
    );
    b.options.forEach((o) =>
      add.run(id, o.option_text, +o.is_correct, +o.order_index),
    );
    db.exec("COMMIT");
    r.status(201).json({
      message: "Question created successfully",
      question_id: id,
    });
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
};
exports.questions = (q, r) => {
  const rows = db
    .prepare("SELECT * FROM questions WHERE quiz_id=? ORDER BY order_index")
    .all(+q.params.id);
  rows.forEach(
    (x) =>
      (x.options = db
        .prepare(
          "SELECT * FROM options WHERE question_id=? ORDER BY order_index",
        )
        .all(x.id)),
  );
  r.json(rows);
};
exports.updateQuestion = (q, r) => {
  const b = q.body;
  if (!validOptions(b.options))
    return r.status(400).json({
      error: "Phải có 4 đáp án và đúng 1 đáp án đúng.",
    });
  db.exec("BEGIN");
  try {
    db.prepare(
      "UPDATE questions SET question_text=?,explanation=?,order_index=? WHERE id=?",
    ).run(b.question_text, b.explanation || "", +b.order_index, +q.params.id);
    db.prepare("DELETE FROM options WHERE question_id=?").run(+q.params.id);
    const add = db.prepare(
      "INSERT INTO options(question_id,option_text,is_correct,order_index) VALUES(?,?,?,?)",
    );
    b.options.forEach((o) =>
      add.run(+q.params.id, o.option_text, +o.is_correct, +o.order_index),
    );
    db.exec("COMMIT");
    r.json({
      message: "Question updated successfully",
    });
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
};
exports.deleteQuestion = (q, r) => {
  db.prepare("DELETE FROM questions WHERE id=?").run(+q.params.id);
  r.json({
    message: "Question deleted successfully",
  });
};
exports.comments = (_q, r) =>
  r.json(
    db
      .prepare(
        "SELECT c.*,q.title quiz_title FROM comments c JOIN quizzes q ON q.id=c.quiz_id ORDER BY c.created_at DESC",
      )
      .all(),
  );
exports.deleteComment = (q, r) => {
  db.prepare("DELETE FROM comments WHERE id=?").run(+q.params.id);
  r.json({
    message: "Comment deleted successfully",
  });
};
exports.contacts = (_q, r) =>
  r.json(db.prepare("SELECT * FROM contacts ORDER BY created_at DESC").all());
