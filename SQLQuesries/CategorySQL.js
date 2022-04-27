const db = require("../DB.js");

class CategorySQL {
    async getCategories() {
        return await db.query(`SELECT * FROM Categories`);
    }

    async createCategory(categoryName, description) {
        return await db.query(
            `INSERT INTO Categories (categoryName, description)
            values ('${categoryName}', '${description}') RETURNING *`
        );
    }

    async getCategoryById(id) {
        return await db.query(`SELECT * FROM Categories WHERE CategoryId = ${id}`);
    }

    async updateCategory(id, categoryName, description) {
        return await db.query(
            `UPDATE Categories SET
            categoryName ='${categoryName}', description ='${description}'
            WHERE CategoryId = ${id} RETURNING *`
        );
    }

    async deleteCategory(id) {
        return await db.query(
            `DELETE FROM Categories WHERE CategoryId = ${id} RETURNING *`
        )
    }
}

module.exports = new CategorySQL();
