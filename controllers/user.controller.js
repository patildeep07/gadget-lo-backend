const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const User = require("../models/user.model");

// Defining functions

// 1. Create a new user
const addUser = async (newUserDetails) => {
  try {
    const {password} = newUserDetails
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User({...newUserDetails, password: hashedPassword});

    const newUser = await user.save();

    return { message: "User created!", newUser };
  } catch (error) {
    console.log(error);
  }
};

// 2. Login

const login = async (userDetails) => {
  try {
    const { email, password } = userDetails;

    const matchedUser = await User.findOne({ email }).populate(
      "wishlist.product cart.product",
      "_id productName brandName price discountPrice averageRating productImage",
    );

    if (matchedUser) {
      if (bcrypt.compare(password, matchedUser.password )) {
        return { message: "User logged in", user: matchedUser };
      } else {
        return { message: "Incorrect password" };
      }
    } else {
      return { message: "Email does not exist in the database" };
    }
  } catch (error) {
    console.log(error);
  }
};

// 3. Update user details

const updateUser = async (userId, newDetails) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newDetails, {
      new: true,
    }).populate(
      "wishlist.product",
      "_id productName brandName price discountPrice averageRating productImage",
    );

    return { message: "Updated user!", user: updatedUser };
  } catch (error) {
    console.log(error);
  }
};

// 4. Add product to wishlist

const addToWishlist = async (userId, productId) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      const index = foundUser.wishlist.findIndex(
        (item) => item.product == productId,
      );

      if (index === -1) {
        foundUser.wishlist = [...foundUser.wishlist, { product: productId }];

        await foundUser.save();

        const user = await foundUser.populate(
          "wishlist.product",
          "_id productName brandName price discountPrice averageRating productImage",
        );

        return { message: "Added to wishlist", user };
      } else {
        const user = await foundUser.populate(
          "wishlist.product",
          "_id productName brandName price discountPrice averageRating productImage",
        );

        return { message: "Product exists in wishlist!", user };
      }
    } else {
      return { message: "Failed to add product in wishlist" };
    }
  } catch (error) {
    console.log(error);
  }
};

// 5. Add to cart

const addToCart = async (userId, productId) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      const index = foundUser.cart.findIndex(
        (item) => item.product == productId,
      );

      if (index === -1) {
        foundUser.cart = [...foundUser.cart, { product: productId }];

        await foundUser.save();

        const user = await foundUser.populate(
          "cart.product",
          "_id productName brandName price discountPrice averageRating productImage",
        );

        return { message: "Added to cart", user };
      } else {
        foundUser.cart[index].quantity += 1;

        await foundUser.save();

        const user = await foundUser.populate(
          "cart.product",
          "_id productName brandName price discountPrice averageRating productImage",
        );

        return { message: "Product quantity updated!", user };
      }
    } else {
      return { message: "Failed to add product in cart" };
    }
  } catch (error) {
    console.log(error);
  }
};

// 6. Delete from wishlist

const deleteFromWishlist = async (userId, productId) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      foundUser.wishlist = foundUser.wishlist.filter(
        ({ product }) => product != productId,
      );

      await foundUser.save();

      const user = await foundUser.populate(
        "wishlist.product",
        "_id productName brandName price discountPrice averageRating productImage",
      );

      return { message: "Product removed from wishlist!", user };
    } else {
      return { message: "User not found" };
    }
  } catch (error) {
    console.log(error);
  }
};

// 7. Delete from cart

const deleteFromCart = async (userId, productId) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      foundUser.cart = foundUser.cart.filter(
        ({ product }) => product != productId,
      );

      await foundUser.save();

      const user = await foundUser.populate(
        "cart.product",
        "_id productName brandName price discountPrice averageRating productImage",
      );

      return { message: "Product removed from cart!", user };
    } else {
      return { message: "User not found" };
    }
  } catch (error) {
    console.log(error);
  }
};

// 8. Manage quantity of wishlist product

const modifyWishlistProductQuantity = async (
  userId,
  productId,
  givenQuantity,
) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      const index = foundUser.wishlist.findIndex(
        (item) => item.product == productId,
      );

      if (index !== -1) {
        foundUser.wishlist[index].quantity = givenQuantity;
        await foundUser.save();

        const user = await foundUser.populate(
          "wishlist.product",
          "_id productName brandName price discountPrice averageRating productImage",
        );

        return { message: "Product quantity updated!", user };
      } else {
        return { message: "Product not found" };
      }
    } else {
      return { message: "User not found!" };
    }
  } catch (error) {
    console.log(error);
  }
};

// 9. Manage quantity of cart product

const modifyCartProductQuantity = async (userId, productId, givenQuantity) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      const index = foundUser.cart.findIndex(
        (item) => item.product == productId,
      );

      if (index !== -1) {
        foundUser.cart[index].quantity = givenQuantity;
        await foundUser.save();

        const user = await foundUser.populate(
          "cart.product",
          "_id productName brandName price discountPrice averageRating productImage",
        );

        return { message: "Product quantity updated!", user };
      } else {
        return { message: "Product not found" };
      }
    } else {
      return { message: "User not found!" };
    }
  } catch (error) {
    console.log(error);
  }
};

// 10. Place your order (empty cart)

const emptyCart = async (userId) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      foundUser.cart = [];

      await foundUser.save();

      const user = await foundUser.populate(
        "cart.product",
        "_id productName brandName price discountPrice averageRating productImage",
      );

      return { message: "Order successfully placed", user };
    } else {
      return { message: "Failed to place order" };
    }
  } catch (error) {
    console.log(error);
  }
};

// Export controller functions

module.exports = {
  addUser,
  login,
  updateUser,
  addToWishlist,
  addToCart,
  deleteFromWishlist,
  deleteFromCart,
  modifyWishlistProductQuantity,
  modifyCartProductQuantity,
  emptyCart,
};
