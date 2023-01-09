const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')

User.hasMany(Product)
Product.hasMany(User)

module.exports = {
  db,
  models: {
    User,
    Product
  },
}
