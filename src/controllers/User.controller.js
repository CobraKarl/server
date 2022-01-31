import UserModel from "../moduls/User.model.js";

const creatUser = async (req, res) => {
    const user = new UserModel ({
       username: req.body.username,
       password: req.body.password
    })

    try {
    const respons = await user.save()
    res.status(201).send(respons)

    } catch (error) {
    res.status(500).send({ message: error.message})
    }

}
const getAllUsers = async (req, res) => {
    try {
        const respons = await UserModel.find()
        res.status (200).send(respons)
    } catch (error) {
        res.status(500).send ({ message: error.message })
    }

}

const getUserWithId = async (req, res) => {
    try {
        const respons = await UserModel.findById(req.params.userId)
        res.status(200).send(respons)
    } catch (error) {
        res.status(500).send({
            message: "Error occured while trying to retrive user with ID:" + req.params.userId,
            error: error.message
        })
    }
}

export default {
    creatUser,
    getAllUsers,
    getUserWithId
}
