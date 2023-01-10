const router = require('express').Router();
const Product = require('../db/models/Product.js')


// api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
