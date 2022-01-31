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

export default {
    creatUser
}
