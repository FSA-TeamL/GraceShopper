const router = require('express').Router();
const CartItem = require('../db/models/CartItem');
const Product = require('../db/models/Product');

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await CartItem.findAll({
      where: { id: req.params.id },
      include: { model: Product },
    });
    res.json(cart);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
