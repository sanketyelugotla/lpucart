const { cartService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const getCart = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.getCartByUser(req.user);
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch cart", error: error.message });
    }
});

const addProductToCart = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.addProductToCart(req.user, req.body.productId, req.body.quantity);
        res.status(201).send(cart)
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

const updateProductInCart = catchAsync(async (req, res) => {
    try {
        if (req.body.quantity === 0) {
            await cartService.deleteProductInCart(req.user, req.body.productId);
            return res.status(200).json({ success: true, message: "Product removed from cart" });
        }
        const cart = await cartService.updateProductInCart(req.user, req.body.productId, req.body.quantity);
        return res.status(200).send(cart)
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

const checkout = catchAsync(async (req, res) => {
    try {
        await cartService.checkout(req.user);
        res.status(200).json({ success: true, message: "Checkout successful" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = {
    getCart,
    addProductToCart,
    updateProductInCart,
    checkout
}