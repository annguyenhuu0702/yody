const Group_Category_Controller = require("../controllers/Group_Category_Controller");

const router = require("express").Router();

router.get("/slug/:slug", Group_Category_Controller.getBySlug);
router.get("/:id", Group_Category_Controller.getById);
router.get("/", Group_Category_Controller.getAll);
router.post("/", Group_Category_Controller.create);
router.put("/", Group_Category_Controller.update);
router.delete("/:id", Group_Category_Controller._delete);

module.exports = router;
