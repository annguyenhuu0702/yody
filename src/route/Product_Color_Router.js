const Product_Color_Controller = require("../controllers/Product_Color_Controller");

const router = require("express").Router();

router.get("/:id", Product_Color_Controller.getById);
router.post("/", Product_Color_Controller.create);
router.put("/", Product_Color_Controller.update);
router.delete("/:id", Product_Color_Controller._delete);

module.exports = router;
