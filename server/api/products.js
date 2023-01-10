const router = require('express').Router();
const {Product} = require('../db/models/Product.js')

// api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product);
  } catch(err){
    next(err)
  }
});

module.exports = router;
