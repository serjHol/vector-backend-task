const express = require("express");
const cors = require("cors");
const CategoriesRouter = require("./Routers/CategoriesRouter.js");
const ProductsRouter = require("./Routers/ProductsRouter.js");
const SuppliersRouters = require("./Routers/SuppliersRouters.js");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/categories", CategoriesRouter);
app.use("/products", ProductsRouter);
app.use("/suppliers", SuppliersRouters);
app.listen(PORT, () => {
    console.log(`Working on port ${PORT}`);
});
