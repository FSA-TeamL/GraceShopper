const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    name: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
  },
  imageUrl:{
    type: Sequelize.TEXT
  }
})

module.exports = Product
