import { useContext, useState } from "react";
import FadeDiv from "../../Hooks/FadeDiv/FadeDiv";
import Input from "../../Hooks/Input/Index";
import HoverDiv from "../../Hooks/HoverDiv/HoverDiv";
import styleInput from "./login.module.css"
import LoginSide from "./LoginSide";
import SignupSide from "./SignupSide";
import { loginContext } from "../../Hooks/ContextProvider/ContextProvider";

export default function LoginPage({ onClose }) {
    const [loginSide, setIsLoginside] = useState(true);
    const { toggleLogin } = useContext(loginContext)

    function changeSide() {
        setIsLoginside(!loginSide);
    }

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    function handleFormChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Submitted")
    }
    const [isWrong, setIsWrong] = useState(false);

    return (
        <HoverDiv variant="loginForm" onClose={onClose}>
            {({ handleClose }) => (
                <>
                    <LoginSide {...{ loginSide, changeSide }} />
                    <SignupSide {...{ loginSide, changeSide }} />
                </>
            )}
        </HoverDiv>
    );
}
