const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    //unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  imageUrl:{
    type: Sequelize.TEXT
  }
})

module.exports = Product
