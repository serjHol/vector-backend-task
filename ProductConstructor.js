const { getCategoryById } = require("./SQLQuesries/CategorySQL.js");
const { getSupplierById } = require("./SQLQuesries/SupplierSQL.js");

const productConstructor = async (product) => {
    const supplierCountry = await getSupplierById(product.supplierid).then(
        (response) => response.rows[0].country
    );
    const categoryName = await getCategoryById(product.categoryid).then(
        (response) => response.rows[0].categoryname
    );
    return { ...product, supplierCountry, categoryName };
};

module.exports = productConstructor;
