const Product_Color_Image_Controller = require("../controllers/Product_Color_Image_Controller");

const router = require("express").Router();

router.get("/:id", Product_Color_Image_Controller.getById);
router.post("/", Product_Color_Image_Controller.create);
router.put("/", Product_Color_Image_Controller.update);
router.delete("/:id", Product_Color_Image_Controller._delete);

module.exports = router;
