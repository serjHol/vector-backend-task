const { getCategoryById } = require("./SQLQuesries/CategorySQL.js");
const { getSupplierById } = require("./SQLQuesries/SupplierSQL.js");


const productConstructor = async (product) => {
    const supplierName = await getSupplierById(product.supplierid).then(
        (response) => response.rows[0].suppliername
    );
    const categoryName = await getCategoryById(product.categoryid).then(
        (response) => response.rows[0].categoryname
    );
    return { ...product, supplierName, categoryName };
}

module.exports = productConstructor;