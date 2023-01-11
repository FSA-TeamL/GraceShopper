const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Cart = require('./models/Cart')
const CartItem = require('./models/CartItem')


User.hasOne(Cart)
Cart.hasOne(User)
Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});
Product.hasMany(CartItem)
CartItem.hasOne(Product)

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem
  },
}
