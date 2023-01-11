const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
});

module.exports = Cart;
