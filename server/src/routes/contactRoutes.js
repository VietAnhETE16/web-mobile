const router = require("express").Router();
router.post("/", require("../controllers/contactController").create);
module.exports = router;
