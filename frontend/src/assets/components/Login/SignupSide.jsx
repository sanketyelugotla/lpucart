import React, { useContext } from 'react'
import FadeDiv from '../../Hooks/FadeDiv/FadeDiv'
import { useState } from "react";
import styleInput from "./login.module.css"
import Input from '../../Hooks/Input/Input';
import { loginContext, urlContext } from '../../Hooks/ContextProvider/ContextProvider';
import { useNavigate } from 'react-router-dom';

export default function SignupSide({ loginSide, changeSide }) {

    const { backendUrl } = useContext(urlContext);
    const [isWrong, setIsWrong] = useState(null);
    const { toggleLogin } = useContext(loginContext)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    function handleFormChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const { name, email, password } = formData;
        try {
            const response = await fetch(`${backendUrl}/verse/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            console.log(response)
            const res = await response.json();
            console.log(res)

            if (response.ok) {
                const token = res.tokens.access.token
                const _id = res.user._id;
                localStorage.setItem("_id", _id)
                localStorage.setItem("token", token)
                navigate("/home");
                toggleLogin();
            } else {
                setIsWrong(res.message);
                console.error("SignUp failed:", res.message);
            }
        } catch (error) {
            console.log(error)
            setIsWrong("Internal server error")
        }
    }

    return (
        <FadeDiv fade_in={!loginSide} fade_out={loginSide} onChange={changeSide}>
            {({ handleChange }) => (
                <div className={styleInput.login_div}>
                    <Input.Div variant="white">
                        <Input.Header>Sign Up</Input.Header>
                        <Input.Form action="" method="post" >
                            <Input type="text" label="Name" name="name" onChange={handleFormChange} />
                            <Input type="email" label="Email" name="email" onChange={handleFormChange} />
                            <Input type="password" label="Password" name="password" onChange={handleFormChange} />

                            <Input.Danger on={isWrong}>{isWrong}</Input.Danger>
                            <Input.Submit variant="formbtn" onClick={handleSubmit}>Sign Up</Input.Submit>
                        </Input.Form>
                    </ Input.Div>
                    <p className="createAccount">
                        Create an account? <span onClick={changeSide}>Login</span>
                    </p>
                </div>
            )}
        </FadeDiv>
    )
}
