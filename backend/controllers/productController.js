import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @ desc Fetch All Products
//@route GET /api/product
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)
});


// @ desc Fetch A Product
//@route GET /api/product/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource Not Found');
    }
});

export { getProducts, getProductById };