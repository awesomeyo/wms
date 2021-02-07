module.exports = (sequelize, Sequelize) => {
    const LoginHistory = sequelize.define("loginHistories", {
      token: {
        type: Sequelize.STRING
      },
      logout: {
        type: Sequelize.BOOLEAN,
        defaultValue: false

      }
    });
  
    return LoginHistory;
  };
  