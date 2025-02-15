const { userService, tokenService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const token = await tokenService.generateAuthToken(user);
        res.status(201).json({ success: true, message: "User registered successfully", user, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Registration failed", error: error.message });
    }
});

const login = catchAsync(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const token = await tokenService.generateAuthToken(user);
        res.status(200).json({ success: true, message: "Login successful", user, token });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid email or password", error: error.message });
    }
});

module.exports = {
    register,
    login
};
