const db = require("../DB.js");

class ProductSQL {
    async getProducts() {
        return await db.query(`SELECT * FROM Products`);
    }

    async createProduct(productName, supplierID, categoryID, price) {
        return await db.query(
            `INSERT INTO Products (ProductName, SupplierID, CategoryID, Price) values 
            ('${productName}', ${supplierID}, ${categoryID}, ${price}) RETURNING *`
        );
    }

    async getProductById(id) {
        return await db.query(`SELECT * FROM Products WHERE ProductID = ${id}`);
    }

    async updatedProduct(id, productName, supplierID, categoryID, price) {
        return await db.query(
            `UPDATE Products SET
            ProductName='${productName}', SupplierID=${supplierID},
            CategoryID=${categoryID}, Price=${price} WHERE ProductID = ${id} RETURNING *`
        );
    }

    async deleteProduct(id) {
        return await db.query(`DELETE FROM Products WHERE ProductID = ${id} RETURNING *`);
    }
}

module.exports = new ProductSQL();
