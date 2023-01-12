const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Cart = require('./models/Cart')
const CartItem = require('./models/CartItem')


Cart.hasOne(User)
Cart.hasMany(Product)
Product.belongsToMany(Cart, {
    through: CartItem
});
Cart.belongsToMany(Product,
  {
    through: CartItem
  })
Product.hasMany(CartItem)
CartItem.belongsTo(Product)


module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem
  },
}
