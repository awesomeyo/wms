const { authJwt } = require("../middleware");
const warehouses = require("../controllers/warehouse.controller.js");
var router = require("express").Router();

module.exports = app => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Warehouse
  router.post("/", warehouses.create);

  // Retrieve all Warehouses
  router.get("/", warehouses.findAll);

  // Retrieve a single Warehouse with id
  router.get("/:id", warehouses.findOne);

  // Update a Warehouse with id
  router.put("/:id", warehouses.update);

  // Delete a Warehouse with id
  router.delete("/:id", warehouses.delete);

  // Delete all Warehouses
  router.delete("/", warehouses.deleteAll);

  app.use('/api/warehouses',[authJwt.verifyToken], router);
};
