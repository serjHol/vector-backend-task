const SQL = require("../SQLQuesries/ProductSQL.js");
const productConstructor = require("../ProductConstructor.js");
class ProductController {
    async getProducts(req, res) {
        try {
            let products = await SQL.getProducts().then((response) => response.rows);
            products = await Promise.all(
                products.map(async (product) => await productConstructor(product))
            );
            return res.json(products);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    message: "id is required",
                });
            }
            const product = await SQL.getProductById(id).then(
                async (response) => await productConstructor(response.rows[0])
            );

            return res
                .status(product ? 200 : 404)
                .json(product || { message: "No product with this id" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const { productName, supplierID, categoryID, price } = req.body;
            if (!(productName && supplierID && categoryID && price)) {
                return res.status(400).json({
                    message: "productName, supplierID, categoryID and price are required",
                });
            }
            const product = await SQL.createProduct(
                productName,
                supplierID,
                categoryID,
                price
            ).then(async (response) => await productConstructor(response.rows[0]));
            return res.json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    message: "id is required",
                });
            }
            const { productName, supplierID, categoryID, price } = req.body;
            if (!(productName || supplierID || categoryID || price)) {
                return res.status(400).json({
                    message: "productName, supplierID, categoryID or price is required",
                });
            }
            const oldProduct = await SQL.getProductById(id).then((response) => response.rows[0]);
            const updatedProduct = await SQL.updatedProduct(
                id,
                productName || oldProduct.productname,
                supplierID || oldProduct.supplierid,
                categoryID || oldProduct.categoryid,
                price || oldProduct.price
            ).then((response) => response.rows[0]);
            return res.json(updatedProduct);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    message: "id is required",
                });
            }
            const deletedProduct = await SQL.deleteProduct(id).then((response) => response.rows[0]);
            return res.json({ success: !!deletedProduct });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductController();
