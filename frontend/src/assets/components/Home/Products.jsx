import React, { useEffect, useState, useContext } from "react";
import { urlContext } from "../../Hooks/ContextProvider/ContextProvider";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css"; // Single CSS file

const Products = () => {
    const { backendUrl } = useContext(urlContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${backendUrl}/verse/products`);
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [backendUrl]);

    if (loading) return <h2>Loading products...</h2>;
    if (error) return <h2 className={styles.error}>{error}</h2>;

    return (
        <div>
            <div className={styles.container}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
