const mongoose = require('mongoose')

const Product = require('../models/product.model')

// Defining functions

// 1. Get all products

const fetchAllProducts = async () => {
  try {
    const products = await Product.find().populate('reviews.user','userName firstName lastName ')

    return {message:'Successfully fetched all products', products}
    
  } catch (error) {
    console.log(error)
  }
}

// 2. Add a new product

const addProduct = async (newProduct) => {
  try {
    const product = await Product(newProduct)
    const productAdded = await product.save()

    return {message: "Successfully added a new product", productAdded}
    
  } catch (error) {
    console.log(error)
  }
}

// 3. Delete product by Id

const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId)

    return {message:'Successfully deleted product', deletedProduct}
  } catch (error) {
    console.log(error)
  }
}

// 4. Update product
const updateProduct = async (productId, updateDetails) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateDetails, {new:true})

    return {message:'Successfully updated product', updatedProduct}
  } catch (error) {
    console.log(error)
  }
}


// Export controller functions

module.exports = {
  fetchAllProducts,
  addProduct,
  deleteProduct,
  updateProduct
}