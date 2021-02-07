const { authJwt } = require("../middleware");
const products = require("../controllers/product.controller.js");
var router = require("express").Router();

module.exports = app => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Product
  router.post("/", products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  // Update a Product with id
  router.put("/:id", products.update);

  // Delete a Product with id
  router.delete("/:id", products.delete);

  // Delete all Products
  router.delete("/", products.deleteAll);

  app.use('/api/products',[authJwt.verifyToken], router);
};
