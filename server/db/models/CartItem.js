const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define('cartitem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItem;
