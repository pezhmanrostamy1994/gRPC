const { BlogModel } = require("./../model/blog.model");

async function listBlog(call, callback) {
    try {
        const blogs = await BlogModel.find({});
        callback(null, { blogs });
    } catch (error) {
        callback(error, null);
    }
}

async function getBlog(call, callback) {
    try {
        const { id } = call.request;
        const blog = await BlogModel.findOne({ id });
        callback(null, blog);
    } catch (error) {
        callback(error, null);
    }
}

async function createBlog(call, callback) {
    try {
        const { title, text } = call.request;
        await BlogModel.create({ title, text });
        callback(null, { status: "created" });
    } catch (error) {
        callback(error, null);
    }
}

async function updateBlog(call, callback) {
    try {
        const { id, ...data } = call.request;
        const result = await BlogModel.updateOne({ id }, { $set: data });

        if (result.modifiedCount > 0) {
            return callback(null, { status: "updated" });
        }

        return callback({ message: "failed to update" }, null);
    } catch (error) {
        callback(error, null);
    }
}

async function deleteBlog(call, callback) {
    try {
        const { id } = call.request;
        const result = await BlogModel.deleteOne({ id });

        if (result.deletedCount > 0) {
            return callback(null, { status: "deleted" });
        }

        return callback({ message: "cannot delete" }, null);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    deleteBlog,
    updateBlog,
    createBlog,
    getBlog,
    listBlog,
};
