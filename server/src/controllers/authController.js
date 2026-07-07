const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

function publicUser(user) {
  return { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role };
}

exports.login = (req, res) => {
  const { username = "", password = "" } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username.trim());
  if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng." });
  const cleanUser = publicUser(user);
  const token = jwt.sign(cleanUser, process.env.JWT_SECRET || "online-quiz-development-secret", { expiresIn: "7d" });
  res.json({ message: "Login successful", token, user: cleanUser });
};

exports.me = (req, res) => res.json(req.user);
