const { ProductModel } = require("./../model/product.model");

async function listProduct(call, callback) {
    try {
        const products = await ProductModel.find({});
        callback(null, { products });
    } catch (error) {
        callback(error, null);
    }
}

async function getProduct(call, callback) {
    try {
        const { id } = call.request;
        const product = await ProductModel.findOne({ id });
        callback(null, product);
    } catch (error) {
        callback(error, null);
    }
}

async function createProduct(call, callback) {
    try {
        const { title, price } = call.request;
        await ProductModel.create({ title, price });
        callback(null, { status: "created" });
    } catch (error) {
        callback(error, null);
    }
}

async function updateProduct(call, callback) {
    try {
        const { id, ...data } = call.request;
        const result = await ProductModel.updateOne({ id }, { $set: data });

        if (result.modifiedCount > 0) {
            return callback(null, { status: "updated" });
        }

        return callback({ message: "failed to update" }, null);
    } catch (error) {
        callback(error, null);
    }
}

async function deleteProduct(call, callback) {
    try {
        const { id } = call.request;
        const result = await ProductModel.deleteOne({ id });

        if (result.deletedCount > 0) {
            return callback(null, { status: "deleted" });
        }

        return callback({ message: "cannot delete" }, null);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    deleteProduct,
    updateProduct,
    createProduct,
    getProduct,
    listProduct,
};
