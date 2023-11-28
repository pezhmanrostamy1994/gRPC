require("./config/db.connection");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const protoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(protoPath);
const loadedPackage = grpc.loadPackageDefinition(blogProto);
const { BlogService } = loadedPackage.blogPackage;

const blogServiceURL = "localhost:4002";
const {
    deleteBlog,
    getBlog,
    listBlog,
    createBlog,
    updateBlog
} = require("./functions/blog.grpc");
function main() {
  const server = new grpc.Server();
  server.addService(BlogService.service, {
    deleteBlog,
    getBlog,
    listBlog,
    createBlog,
    updateBlog
  });
  server.bindAsync(
    blogServiceURL,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) return console.log(err.message);
      console.log("gRPC BlogService Runing over port " + port);
      server.start();
    }
  );
}
main();
