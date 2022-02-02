import { response } from "express";
import UserModel from "../moduls/User.model.js";
import StatusCode from "../../configuration/StatusCode.js";

const creatUser = async (req, res) => {
    const user = new UserModel ({
       username: req.body.username,
       password: req.body.password
    })

    try {
    const respons = await user.save()
    res.status(StatusCode.CREATED).send(respons)

    } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message})
    }

}
const getAllUsers = async (req, res) => {
    try {
        const respons = await UserModel.find()
        res.status (StatusCode.OK).send(respons)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send ({ message: error.message })
    }

}

const getUserWithId = async (req, res) => {
    try {
        const respons = await UserModel.findById(req.params.userId)
        res.status(StatusCode.OK).send(respons)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Error occured while trying to retrive user with ID:" + req.params.userId,
            error: error.message
        })
    }
}

const getUserWithUsernameQuery = async (req, res) => {
    try {
        const respons = await UserModel.find({username: req.query.username})
        respons.length !== 0 
            ? res.status(StatusCode.OK).send(respons) 
            : res.status(StatusCode.NOT_FOUND).send({ message: "Could not find user with username: " + req.query.username })

    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send ({
            message: "Error occured while trying to retrive user with username: " + req.query.puserId,
            error: error.message
        })

    }
}

const updateUser = async (req, res) => {
    try {
        if (!req.body) {return res.status(StatusCode.BAD_REQUEST).send({ message: "cannot update empy values" }) }
        const respons = await UserModel.findByIdAndUpdate(req.params.userId, {
            username: req.body.username,
            password: req.body.password
        }, { new: true})
        res.status(StatusCode.OK).send(respons)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Error occures while trying to update values of the user with ID: " + req.params.userId,
            error: error.message
        })

    }
}

const deleteUser = async (req, res) => {
    try {
        const respons = await UserModel.findByIdAndDelete(req.params.userId)
        res.status(StatusCode.OK).send ({
            message: `Sucessfully deleted the USER with username: ${respons.username} and ID: ${req.params.userId}`
        })
    } catch (error){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send ({
            message: "Error occured while trying to delete user with ID: " + req.params.userId,
            error: error.message
        })

    }
}

export default {
    creatUser,
    getAllUsers,
    getUserWithId,
    getUserWithUsernameQuery,
    updateUser,
    deleteUser
}
