const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Name
  userName: {
    type: String,
    required: true,
  },

  // First Name
  firstName: {
    type: String,
    required: true,
  },

  // Last Name
  lastName: {
    type: String,
    required: true,
  },

  // Email
  email: {
    type: String,
    required: true,
  },

  // Password
  password: {
    type: String,
    required: true,
  },

  // Address
  address: [
    {
      addressType: String,
      addressInfo: String,
    },
  ],

  // mobile number
  mobileNumber: {
    type: Number,
    required: true,
  },

  // Wishlist
  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  // Cart
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// Export

module.exports = User;
