const Product_Color_Size_Controller = require("../controllers/Product_Color_Size_Controller");

const router = require("express").Router();

router.get("/:id", Product_Color_Size_Controller.getById);
router.post("/", Product_Color_Size_Controller.create);
router.put("/", Product_Color_Size_Controller.update);
router.delete("/:id", Product_Color_Size_Controller._delete);

module.exports = router;
