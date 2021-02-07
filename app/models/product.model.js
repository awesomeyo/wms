module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });

  return Product;
};
