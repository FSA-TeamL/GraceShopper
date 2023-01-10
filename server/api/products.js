const router = require('express').Router();
<<<<<<< HEAD
const Product = require('../db/models/Product.js')

=======
const {Product} = require('../db/models/Product.js')
>>>>>>> 8feeb169d3682779549a880ac880d1c9e7da80ba

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
