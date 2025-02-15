const bcrypt = require("bcrypt")
const { userService } = require(".")

const loginUserWithEmailAndPassword = async (email, password, res) => {
  const user = await userService.getUserByEmail(email);;
  if (!user || !(await user.isPasswordMatch(password))) {
    return res.status(404).send({message: "Invalid credentials"})
  }

  return user;
}

module.exports = {
  loginUserWithEmailAndPassword
}