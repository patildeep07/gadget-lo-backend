const express = require('express')
const productRouter = express.Router()

const { fetchAllProducts, addProduct, deleteProduct, updateProduct } = require('../controllers/product.controller')

// Routes

// 1. Get all products

productRouter.get('/', async (req, res) => {
  try {
    const { products, message } = await fetchAllProducts()

    if (products) {
      res.json({ message, products })
    } else {
      res.status(404).json({ error: 'Products not found' })
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

// 2. Add a new product

productRouter.post('/', async (req,res) => {
  try {
    const {message, productAdded} = await addProduct(req.body)

    if (productAdded) {
      res.status(201).json({message, productAdded})
    } 
    
  } catch (error) {
    res.status(400).json({error: 'Failed to add a new product'})
  }
})

// 3. Delete a product

productRouter.delete('/:productId' , async (req,res) => {
  try {
    const {message, deletedProduct} = await deleteProduct(req.params.productId)

    if (deletedProduct) {
      res.status(202).json({message, deletedProduct})
    } else {
      res.status(400).json({error: 'Product already deleted, or does not exists in database'})
    }
    
  } catch (error) {
    res.status(400).json({error: 'Failed to delete product'})
  }
})

// 4. Update product

productRouter.post('/:productId', async (req,res ) => {
  try {
    const {message, updatedProduct} = await updateProduct(req.params.productId, req.body)

    if (updatedProduct) {
      res.json({message, updatedProduct})
    } 
    
  } catch (error) {
    res.status(400).json({error: 'Failed to find/update product'})
  }
})


// Exporting router

module.exports = productRouter