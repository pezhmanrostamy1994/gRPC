const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const blogProtoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(blogProtoPath);
const { blogPackage } = grpc.loadPackageDefinition(blogProto);
const blogServiceURL = "localhost:4001";
const blogClient = new blogPackage.BlogService(
  blogServiceURL,
  grpc.credentials.createInsecure()
);

async function listBlog(req, res, next) {
  try {
    const data = await callGrpcMethod(blogClient.listBlog);
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
}

async function getBlog(req, res, next) {
  try {
    const { id } = req.params;
    const data = await callGrpcMethod(blogClient.getBlog, { id });
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
}

async function createBlog(req, res, next) {
  try {
    const { title, price } = req.body;
    const data = await callGrpcMethod(blogClient.createBlog, {
      title,
      price,
    });
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
}

async function updateBlog(req, res, next) {
  try {
    const data = req.body;
    const { id } = req.params;
    const result = await callGrpcMethod(blogClient.updateBlog, { ...data, id });
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
}

async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;
    const result = await callGrpcMethod(blogClient.deleteBlog, { id });
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
}

async function callGrpcMethod(method, requestData) {
  return new Promise((resolve, reject) => {
    method(requestData, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  deleteBlog,
  updateBlog,
  createBlog,
  getBlog,
  listBlog,
};
