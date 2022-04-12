const Comment_Controller = require("../controllers/Comment_Controller");

const router = require("express").Router();

router.post("/", Comment_Controller.create);

module.exports = router;
