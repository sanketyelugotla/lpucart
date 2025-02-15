const { User } = require("../models/")
const bcrypt = require("bcrypt")



const createUser = async (userBody, res) => {
    if (await User.isEmailTaken(userBody.email)) {
        return res.status(409).send({ message: "Email already Taken" })
    }
    const user = await User.create({ ...userBody })
    return user
}

const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

const getUserById = async (id) => {
    return User.findById(id)
}

const setAddress = async (user, newAddress) => {
    user.address = newAddress
    await user.save()
    return user.address
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    setAddress
}