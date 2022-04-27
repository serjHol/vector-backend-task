const SQL = require("../SQLQuesries/SupplierSQL.js");

class SupplierController {
    async getSuppliers(req, res) {
        try {
            const suppliers = await SQL.getSuppliers().then((response) => response.rows);
            return res.json(suppliers);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getSupplierById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID is required" });
            }
            const supplier = await SQL.getSupplierById(id).then((response) => response.rows[0]);
            return res
                .status(supplier ? 200 : 404)
                .json(supplier || { message: "No supplier with this id" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createSupplier(req, res) {
        try {
            const { supplierName, city, country } = req.body;
            if (!(supplierName && city && country)) {
                return res
                    .status(400)
                    .json({ message: "Supplier name, city and country are required" });
            }
            const newSupplier = await SQL.createSupplier(supplierName, city, country).then(
                (response) => response.rows[0]
            );
            return res.json(newSupplier);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateSupplier(req, res) {
        try {
            const { id } = req.params;
            const { supplierName, city, country } = req.body;
            if (!id) {
                return res.status(400).json({ message: "ID is required" });
            }
            if (!(supplierName || city || country)) {
                return res
                    .status(400)
                    .json({ message: "Supplier name, city or country is required" });
            }

            const oldSupplier = await SQL.getSupplierById(id).then((response) => response.rows[0]);

            const updatedSupplier = await SQL.updateSupplier(
                id,
                supplierName || oldSupplier.suppliername,
                city || oldSupplier.city,
                country || oldSupplier.country
            ).then((response) => response.rows[0]);
            return res.json(updatedSupplier);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteSupplier(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID is required" });
            }
            const deletedSupplier = await SQL.deleteSupplier(id).then(
                (response) => response.rows[0]
            );
            return res.json({ success: !!deletedSupplier });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new SupplierController();
