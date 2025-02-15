import "./Header.css";
import Button from "../../Hooks/Button/Button";
import { useContext, useEffect, useState } from "react";
import LoginPage from "../Login/LoginPage";
import { loginContext, userContext } from "../../Hooks/ContextProvider/ContextProvider";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function NavBar({ onLoginClick }) {
    const { isLoginOpen, toggleLogin } = useContext(loginContext);
    const { user, setUser } = useContext(userContext);

    const [liElements, setLiElements] = useState({
        home: true,
        cart: false,
        products: false,
        contact: false,
    });

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("_id");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <header className="header">
            <span className="logo">LPU CART</span>
            <ul className="nav-list">
                <NavLink to="/home">
                    <li id="home">
                        Home
                    </li>
                </NavLink>
                <NavLink to="/cart">
                    <li id="cart">
                        Cart
                    </li>
                </NavLink>
                <NavLink to="/products">
                    <li id="products">
                        Products
                    </li>
                </NavLink>
            </ul>
            <div className="profile">
                {user ? (
                    <div>
                        <CgProfile className="icon" />
                        <p>{user.name}</p>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button variant="light" onClick={toggleLogin}>
                        Login
                    </Button>
                )}
            </div>
            {isLoginOpen && <LoginPage />}
        </header>
    );
}
