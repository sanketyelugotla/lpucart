import React, { useEffect, useState, useContext } from "react";
import { urlContext } from "../../Hooks/ContextProvider/ContextProvider";
import styles from "./Cart.module.css"; // Import the CSS module

const Cart = () => {
    const { backendUrl } = useContext(urlContext);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const token = localStorage.getItem("token");

    const fetchCart = async () => {
        try {
            const response = await fetch(`${backendUrl}/verse/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch cart data");

            let data = await response.json();
            console.log(data.cartItems);

            setCart(data.cartItems);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCart([]);
        }
    };


    // Fetch Cart Data
    useEffect(() => {
        fetchCart();
    }, [backendUrl, token]);

    // Calculate total price
    useEffect(() => {
        if (Array.isArray(cart) && cart.length > 0) {
            const totalCost = cart.reduce((acc, item) => acc + item.product.cost * item.quantity, 0);
            setTotal(totalCost);
        } else {
            setTotal(0);
        }
    }, [cart]);

    // Update Quantity
    const updateQuantity = async (productId, newQuantity) => {
        console.log(productId)
        try {
            const response = await fetch(`${backendUrl}/verse/cart`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, quantity: newQuantity }),
            });

            if (response.ok) {
                await fetchCart();
            }
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    // Checkout
    const handleCheckout = async () => {
        try {
            const response = await fetch(`${backendUrl}/verse/cart/checkout`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });
            const res = await response.json();
            if (response.ok) {
                alert("Checkout successful!");
                setCart([]);
            } else {
                console.log(res)
                alert(res.message);
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <h2>Your Cart</h2>
                {Array.isArray(cart) && cart.length > 0 ? (
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item._id}>
                                        <td className={styles.product_name}>{item.product.name}</td>
                                        <td>
                                            <img src={item.product.image} alt={item.product.name} className={styles.productImage} />
                                        </td>
                                        <td>${item.product.cost}</td>
                                        <td>
                                            <div className={styles.quantityContainer}>
                                                <button className={styles.quantityButton} onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                                <span className={styles.quantityText}>{item.quantity}</span>
                                                <button className={styles.quantityButton} onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                            </div>
                                        </td>
                                        <td>${item.product.cost * item.quantity}</td>
                                        <td>
                                            <center>
                                                <button className={styles.removeButton} onClick={() => updateQuantity(item.product._id, 0)}>Remove</button>
                                            </center>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Total: ${total}</h3>
                        <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
