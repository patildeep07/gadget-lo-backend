const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Name
    productName: {
      type: String,
      required: true,
      unique: true,
    },

    // Brand name
    brandName: {
      type: String,
      required: true,
    },

    // Description
    productDescription: {
      type: String,
      required: true,
    },

    // Image
    productImage: {
      type: String,
      default: "https://via.placeholder.com/400x300",
    },

    // Price
    price: {
      type: Number,
      required: true,
    },

    // Discount
    discountPrice: {
      type: Number,
      required: true,
    },

    // Category
    category: {
      type: String,
      enum: ["Mobile", "Laptop", "Television", "Accessories", "Other"],
      default: "Other",
    },

    // Features
    features: [
      {
        type: String,
      },
    ],

    // Reviews
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        userRating: {
          type: Number,
          min: 0,
          max: 5,
        },
      },
    ],

    // Average Rating
    averageRating: {
      type: mongoose.Types.Decimal128,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
