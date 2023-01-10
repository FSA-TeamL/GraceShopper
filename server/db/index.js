const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Cart = require('./models/Cart')

User.hasOne(Cart)
Cart.hasOne(User)
Product.hasMany(Cart)
Cart.hasMany(Product)

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart
  },
}
