const db = require("../config/db");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.create = (req, res) => {
  const { name = "", email = "", message = "" } = req.body;
  if (!name.trim() || !emailPattern.test(email) || !message.trim())
    return res.status(400).json({
      error: "Vui lòng nhập đầy đủ họ tên, email hợp lệ và nội dung.",
    });
  db.prepare("INSERT INTO contacts(name,email,message) VALUES (?,?,?)").run(
    name.trim(),
    email.trim(),
    message.trim(),
  );
  res.status(201).json({
    message: "Contact message sent successfully",
  });
};
