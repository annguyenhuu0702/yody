const Category_Controller = require("../controllers/Category_Controller");

const router = require("express").Router();

router.get("/slug/:slug", Category_Controller.getBySlug);
router.get("/:id", Category_Controller.getById);
router.get("/", Category_Controller.getAll);
router.post("/", Category_Controller.create);
router.put("/", Category_Controller.update);
router.delete("/:id", Category_Controller._delete);

module.exports = router;
