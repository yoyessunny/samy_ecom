const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productschema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_rating: {
        type: String,
        required: true
    },
    product_reviews: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("product", productschema);

module.exports = Product;