const r=require("express").Router(),a=require("../controllers/attemptController"),auth=require("../middleware/authMiddleware");r.get("/:attemptId",auth,a.detail);module.exports=r;
