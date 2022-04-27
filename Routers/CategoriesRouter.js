const Router = require("express");
const router = new Router();
const Controller = require("../Controllers/CategoryController.js");

router.get("", Controller.getCategories);
router.get("/:id", Controller.getCategoryById);
router.post("/create", Controller.createCategory);
router.put("/update/:id", Controller.updateCategory);
router.delete("/delete/:id", Controller.deleteCategory);

module.exports = router;
