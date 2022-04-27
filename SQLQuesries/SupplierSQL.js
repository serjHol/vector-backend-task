const db = require("../DB.js");

class SupplierSQL {
    async getSuppliers() {
        return await db.query(`SELECT * FROM Suppliers`);
    }

    async createSupplier(supplierName, city, country) {
        return await db.query(
            `INSERT INTO Suppliers (SupplierName, City, Country) values (
                '${supplierName}', '${city}', '${country}'
            ) RETURNING *`
        );
    }

    async getSupplierById(id) {
        return await db.query(`SELECT * FROM Suppliers WHERE supplierid = ${id}`);
    }

    async updateSupplier(id, supplierName, city, country) {
        return await db.query(
            `UPDATE Suppliers SET
            supplierName='${supplierName}', city='${city}', country='${country}'
            WHERE supplierid = ${id} RETURNING *`
        );
    }

    async deleteSupplier(id) {
        return await db.query(`DELETE FROM Suppliers WHERE supplierid = ${id} RETURNING *`);
    }
}

module.exports = new SupplierSQL();
