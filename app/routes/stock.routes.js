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
    router.put("/stock/:id", products.stock);

    router.put("/unstock/:id", products.unstock);

    app.use('/api',[authJwt.verifyToken], router);
  };
  