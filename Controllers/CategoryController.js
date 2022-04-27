const SQL = require("../SQLQuesries/CategorySQL.js");

class CategoryController {
    async getCategories(req, res) {
        try {
            const categories = await SQL.getCategories().then((response) => response.rows);
            return res.json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID is required" });
            }
            const category = await SQL.getCategoryById(id).then((response) => response.rows[0]);
            return res
                .status(category ? 200 : 404)
                .json(category || { message: "No category with this id" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createCategory(req, res) {
        try {
            const { categoryName, description } = req.body;
            if (!(categoryName && description)) {
                return res
                    .status(400)
                    .json({ message: "Category name and description are required" });
            }
            const newCategory = await SQL.createCategory(categoryName, description).then(
                (response) => response.rows[0]
            );
            return res.json(newCategory);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID is required" });
            }
            const { categoryName, description } = req.body;
            if (!(categoryName || description)) {
                return res.status(400).json({ message: "categoryName or description is required" });
            }
            const oldCategory = await SQL.getCategoryById(id).then((response) => response.rows[0]);
            const newCategory = await SQL.updateCategory(
                id,
                categoryName || oldCategory.categoryname,
                description || oldCategory.description
            ).then((response) => response.rows[0]);
            return res.json(newCategory);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID is required" });
            }
            const deletedCategory = await SQL.deleteCategory(id).then(
                (response) => response.rows[0]
            );
            return res.json({
                success: !!deletedCategory,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CategoryController();
