const r=require("express").Router(),q=require("../controllers/quizController"),c=require("../controllers/commentController"),a=require("../controllers/attemptController"),auth=require("../middleware/authMiddleware");
r.get("/",q.list);r.get("/:id",q.detail);r.get("/:id/questions",q.questions);r.post("/:id/submit",auth,a.submit);r.post("/:id/comments",c.create);module.exports=r;
