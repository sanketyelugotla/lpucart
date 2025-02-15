import React, { useContext } from "react";
import styles from "./Products.module.css";
import Button from "../../Hooks/Button/Button";
import { urlContext } from "../../Hooks/ContextProvider/ContextProvider";

const ProductCard = ({ product }) => {
    const token = localStorage.getItem("token");
    const { backendUrl } = useContext(urlContext);

    const handleAddToCart = async () => {
        if (!token) {
            alert("Please login to add items to your cart.");
            return;
        }
        try {
            console.log(product._id);
            const response = await fetch(`${backendUrl}/verse/cart`, {
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

            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || "Failed to add product to cart");
            }

            alert("Product added to cart successfully!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert(error.message);
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
