const config = require("../config/config");
const { Cart, Product } = require("../models/index");

const getCartByUser = async (user) => {
    let cart = await Cart.findOne({ email: user.email });
    if (!cart) {
        throw new Error("User does not have a cart");
    }
    return cart;
};

const addProductToCart = async (user, productId, quantity) => {
    let cart = await Cart.findOne({ email: user.email });

    if (!cart) {
        cart = await Cart.create({
            email: user.email,
            cartItems: [],
            paymentOption: config.default_payment_option
        });
    }

    let productIndex = -1;
    for (let i = 0; i < cart.cartItems.length; i++) {
        if (productId.toString() === cart.cartItems[i].product._id.toString()) {
            productIndex = i;
        }
    }

    if (productIndex === -1) {
        let product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product does not exist in database");
        }
        cart.cartItems.push({ product, quantity });
    } else {
        throw new Error("Product already in the cart");
    }

    await cart.save();
    return cart;
};

const updateProductInCart = async (user, productId, quantity) => {
    let cart = await Cart.findOne({ email: user.email });
    if (!cart) {
        throw new Error("User does not have a cart");
    }

    let product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product does not exist");
    }

    let productIndex = -1;
    for (let i = 0; i < cart.cartItems.length; i++) {
        if (productId.toString() === cart.cartItems[i].product._id.toString()) {
            productIndex = i;
        }
    }

    if (productIndex === -1) {
        throw new Error("Product not in cart");
    } else {
        cart.cartItems[productIndex].quantity = quantity;
    }

    await cart.save();
    return cart;
};

const deleteProductInCart = async (user, productId) => {
    let cart = await Cart.findOne({ email: user.email });
    if (!cart) {
        throw new Error("User does not have a cart");
    }

    let productIndex = -1;
    for (let i = 0; i < cart.cartItems.length; i++) {
        if (productId.toString() === cart.cartItems[i].product._id.toString()) {
            productIndex = i;
        }
    }

    if (productIndex === -1) {
        throw new Error("Product does not exist for this user");
    } else {
        cart.cartItems.splice(productIndex, 1);
    }

    await cart.save();
    return { message: "Product removed from cart successfully" };
};

const checkout = async (user) => {
    let cart = await Cart.findOne({ email: user.email });
    if (!cart) {
        throw new Error("User does not have a cart");
    }

    if (cart.cartItems.length === 0) {
        throw new Error("Cart is empty");
    }

    // if (user.address === config.default_address) {
    //     throw new Error("Address not set");
    // }

    let total = 0;
    for (let i = 0; i < cart.cartItems.length; i++) {
        total += cart.cartItems[i].product.cost * cart.cartItems[i].quantity;
    }

    if (total > user.walletMoney) {
        throw new Error("User has insufficient money to process");
    }

    user.walletMoney -= total;
    await user.save();

    cart.cartItems = [];
    await cart.save();

    return { message: "Checkout successful", remainingWallet: user.walletMoney };
};

module.exports = {
    getCartByUser,
    addProductToCart,
    updateProductInCart,
    deleteProductInCart,
    checkout
};
