const Router = require("express");
const router = new Router();
const Controller = require("../Controllers/SupplierController.js");
router.get("", Controller.getSuppliers);
router.get("/:id", Controller.getSupplierById);
router.post("/create", Controller.createSupplier);
router.put("/update/:id", Controller.updateSupplier);
router.delete("/delete/:id", Controller.deleteSupplier);
module.exports = router;
