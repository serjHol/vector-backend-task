const Router = require("express");
const router = new Router();
const Controller = require("../Controllers/ProductController.js");

router.get("", Controller.getProducts);
router.get("/:id", Controller.getProductById)
router.post("/create", Controller.createProduct);
router.put("/update/:id", Controller.updateProduct);
router.delete("/delete/:id", Controller.deleteProduct);


module.exports = router;
