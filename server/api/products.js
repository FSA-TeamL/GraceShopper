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

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    // console.log("SINGLE PRODUCT API", product)
    res.json(product);
  } catch(err){
    next(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    const updatedProduct = await product.update(req.body)
    res.send(updatedProduct)
  } catch(err){
    next(err)
  }
});

//POST /api/products
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
  try {
    console.log("THIS IS THE REQ", req.params.id);
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
