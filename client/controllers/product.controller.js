const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const productProtoPath = path.join(
  __dirname,
  "..",
  "..",
  "protos",
  "product.proto"
);
const productProto = protoLoader.loadSync(productProtoPath);
const { productPackage } = grpc.loadPackageDefinition(productProto);
const productServiceURL = "localhost:4001";
const productClient = new productPackage.ProductService(
  productServiceURL,
  grpc.credentials.createInsecure()
);

async function listProduct(req, res, next) {
  try {
    const data = await callGrpcMethod(productClient.listProduct);
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    const data = await callGrpcMethod(productClient.getProduct, { id });
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const { title, price } = req.body;
    const data = await callGrpcMethod(productClient.createProduct, {
      title,
      price,
    });
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const data = req.body;
    const { id } = req.params;
    const result = await callGrpcMethod(productClient.updateProduct, {
      ...data,
      id,
    });
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const result = await callGrpcMethod(productClient.deleteProduct, { id });
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
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  listProduct,
};
