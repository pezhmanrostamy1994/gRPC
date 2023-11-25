const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoPath = path.resolve(
  __dirname,
  "..",
  "..",
  "protos",
  "product.proto"
);
const packageDefinition = protoLoader.loadSync(protoPath);
const loadedPackage = grpc.loadPackageDefinition(packageDefinition);
const { ProductService } = loadedPackage.productPackage;

const productServiceURL = "localhost:4001";

const {
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  listProduct,
} = require("./functions/product.grpc");

function main() {
  const server = new grpc.Server();
  server.addService(ProductService.service, {
    deleteProduct,
    updateProduct,
    createProduct,
    getProduct,
    listProduct,
  });

  server.bindAsync(
    productServiceURL,
    grpc.ServerCredentials.createInsecure(),
    async (err, port) => {
      if (err) {
        console.error(err.message);
        return;
      }

      console.log("gRPC ProductService Running over port " + port);
      await server.start();
    }
  );
}

main();
