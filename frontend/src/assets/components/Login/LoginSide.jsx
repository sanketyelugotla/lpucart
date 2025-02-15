import React, { useContext } from 'react'
import FadeDiv from '../../Hooks/FadeDiv/FadeDiv'
import { useState } from "react";
import styleInput from "./login.module.css"
import Input from '../../Hooks/Input/Input';
import { loginContext, urlContext } from '../../Hooks/ContextProvider/ContextProvider';
import { useNavigate } from 'react-router-dom';

export default function LoginSide({ loginSide, changeSide }) {

    const [isWrong, setIsWrong] = useState(false);
    const { toggleLogin } = useContext(loginContext)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    function handleFormChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const naviagte = useNavigate();
    const {backendUrl} = useContext(urlContext);


    async function handleSubmit(event) {
        event.preventDefault();
        const { email, password } = formData;
        try {
            const response = await fetch(`${backendUrl}/verse/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const res = await response.json();
            const token = res.tokens.access.token
            const _id = res.user._id;
            console.log(_id, token)
            localStorage.setItem("_id", _id)
            localStorage.setItem("token", token)
            if (response.ok) {
                naviagte("/home");
                toggleLogin();
                // localStorage.setItem("auth")
                console.log("logged")
            } else {
                setIsWrong("Invalid credentials");
                console.error("Login failed:", res.message);
            }
        } catch (error) {
            setIsWrong("Invalid credentials");
            console.log(error)
        }
    }

    return (
        <FadeDiv fade_in={loginSide} fade_out={!loginSide} onChange={changeSide}>
            {({ handleChange }) => (
                <div className={styleInput.login_div}>
                    <Input.Div variant="white">
                        <Input.Header>Login</Input.Header>
                        <Input.Form action="" method="post" >
                            <Input type="email" label="Email" name="email" onChange={handleFormChange} />
                            <Input type="password" label="Password" name="password" onChange={handleFormChange} />

                            <Input.Danger on={isWrong}>Incorrect VoterId or Password</Input.Danger>
                            <Input.Submit variant="formbtn" onClick={handleSubmit}>Login</Input.Submit>
                        </Input.Form>
                    </ Input.Div>
                    <p className="createAccount">
                        Create an account? <span onClick={changeSide}>Sign Up</span>
                    </p>
                </div>
            )}
        </FadeDiv>
    )
}
