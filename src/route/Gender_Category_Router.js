const Gender_Category_Controller = require("../controllers/Gender_Category_Controller");

const router = require("express").Router();

router.get("/slug/:slug", Gender_Category_Controller.getBySlug);
router.get("/:id", Gender_Category_Controller.getById);
router.get("/", Gender_Category_Controller.getAll);
router.post("/", Gender_Category_Controller.create);
router.put("/", Gender_Category_Controller.update);
router.delete("/:id", Gender_Category_Controller._delete);

module.exports = router;
