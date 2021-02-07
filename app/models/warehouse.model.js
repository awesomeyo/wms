module.exports = (sequelize, Sequelize) => {
    const Warehouse = sequelize.define("warehouse", {
      name: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      }
    });
  
    return Warehouse;
  };
  