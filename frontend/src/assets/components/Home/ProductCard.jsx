import React from "react";
import styles from "./Products.module.css";
import Button from "../../Hooks/Button/Button";

const ProductCard = ({ product }) => {
    const token = localStorage.getItem("token");

    const handleAddToCart = async () => {
        if (!token) {
            alert("Please login to add items to your cart.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/verse/cart", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                }),
            });
            const res = response.json()
            if (!res.ok) {
                throw new Error(`Failed to add product to cart`);
            }

            alert("Product added to cart successfully!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Product is already present in cart");
        }
    };

    return (
        <div className={styles.card}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.cost}</p>
            <p>⭐ {product.rating}</p>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
    );
};

export default ProductCard;
