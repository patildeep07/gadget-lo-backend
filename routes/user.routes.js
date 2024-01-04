const express = require('express')
const userRouter = express.Router()

const {
  addUser,
  login,
  updateUser,
  addToWishlist,
  addToCart,
  deleteFromWishlist,
  deleteFromCart,
  modifyWishlistProductQuantity,
  modifyCartProductQuantity
} = require('../controllers/user.controller')

// Routes

// 1. Create a new user

userRouter.post('/' , async (req,res) => {
  try {
    const {message, newUser} = await addUser(req.body)

    if (newUser) {
      res.json({message, newUser})
    }
    
  } catch (error) {
    res.status(400).json({error:"Failed to create new user"})
  }
})

// 2. Login user

userRouter.post('/login', async (req,res) => {
  try {
    const loggedInUser = await login(req.body)

    if (loggedInUser) {
      res.json(loggedInUser)
    }
    
  } catch (error) {
    console.log(error)
    res.status(400).json({error:"Failed to login user"})
  }
})

// 3. Update user

userRouter.post('/:userId/update-user', async (req,res) => {
  try {
    const updatedUser = await updateUser(req.params.userId, req.body)

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(400).json({error:'Failed to find the user'})
    }
    
  } catch (error) {
    res.status(400).json({error:"Failed to update user"})
  }
})

// 4. Add product to wishlist - Give productId in url

userRouter.post('/:userId/add-to-wishlist/:productId', async (req,res) => {
  try {
    const updatedUser = await addToWishlist(req.params.userId, req.params.productId)

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(400).json({error:"Failed to add product"})
    }
      
      
  } catch (error) {
    res.status(400).json({error:"Failed to add product"})
  }
})

// 5. Add product to cart - Give productId in url

userRouter.post('/:userId/add-to-cart/:productId', async (req,res) => {
  try {
    const updatedUser = await addToCart(req.params.userId, req.params.productId)

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(400).json({error:"Failed to add product in cart"})
    }


  } catch (error) {
    res.status(400).json({error:"Failed to add product in cart"})
  }
})

// 6. Remove from wishlist

userRouter.delete('/:userId/remove-from-wishlist/:productId', async (req,res) => {
  try {
    const updatedUser = await deleteFromWishlist(req.params.userId, req.params.productId)

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(400).json({error:"Failed to remove product from wishlist"})
    }
    
    
  } catch (error) {
    res.status(400).json({error:"Failed to remove product from wishlist"})
  }
})

// 7. Remove from cart

userRouter.delete('/:userId/remove-from-cart/:productId', async (req,res) => {
  try {
    const updatedUser = await deleteFromCart(req.params.userId, req.params.productId)

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(400).json({error:"Failed to remove product from cart"})
    }


  } catch (error) {
    res.status(400).json({error:"Failed to remove product from cart"})
  }
})

// 8. Manage quantity of wishlist product

userRouter.post('/:userId/wishlist-product-quantity/:productId', async (req,res) => {
  try {
    const {quantity} = req.body
    
    const updatedUser = await modifyWishlistProductQuantity(req.params.userId, req.params.productId, quantity)

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(400).json({error:"Failed to update product quantity"})
    }
    
  } catch (error) {
    res.status(400).json({error:"Failed to update product quantity"})
  }
})

// 9. Manage quantity of cart product

userRouter.post('/:userId/cart-product-quantity/:productId', async (req,res) => {
  try {
    const {quantity} = req.body

    const updatedUser = await modifyCartProductQuantity(req.params.userId, req.params.productId, quantity)

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(400).json({error:"Failed to update product quantity"})
    }

  } catch (error) {
    res.status(400).json({error:"Failed to update product quantity"})
  }
})

// Export

module.exports = userRouter