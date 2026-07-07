const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const dbPath = path.join(__dirname, "../../database/app.db");
const db = new DatabaseSync(dbPath);
db.exec("PRAGMA foreign_keys = ON");

module.exports = db;
