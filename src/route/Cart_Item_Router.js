const Cart_Item_Controller = require("../controllers/Cart_Item_Controller");
const { getUser, verifyToken } = require("../middleware/Auth_Middleware");

const router = require("express").Router();

router.get("/user/:user_id", Cart_Item_Controller.getByUser);
router.get("/:id", Cart_Item_Controller.getById);
router.post("/", getUser, Cart_Item_Controller.create);
router.put("/", verifyToken, Cart_Item_Controller.update);
router.delete("/:id", verifyToken, Cart_Item_Controller._delete);

module.exports = router;
