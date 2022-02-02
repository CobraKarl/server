import { response } from "express";
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

const getUserWithUsernameQuery = async (req, res) => {
    try {
        const respons = await UserModel.find({username: req.query.username})
        respons.length !== 0 
            ? res.status(200).send(respons) 
            : res.status(404).send({ message: "Could not find user with username: " + req.query.username })

    } catch (error) {
        res.status(500).send ({
            message: "Error occured while trying to retrive user with username: " + req.query.puserId,
            error: error.message
        })

    }
}

const updateUser = async (req, res) => {
    try {
        if (!req.body) {return res.status(400).send({ message: "cannot update empy values" }) }
        const respons = await UserModel.findByIdAndUpdate(req.params.userId, {
            username: req.body.username,
            password: req.body.password
        }, { new: true})
        res.status(200).send(respons)
    } catch (error) {
        res.status(500).send({
            message: "Error occures while trying to update values of the user with ID: " + req.params.userId,
            error: error.message
        })

    }
}

const deleteUser = async (req, res) => {
    try {
        const respons = await UserModel.findByIdAndDelete(req.params.userId)
        res.status(200).send ({
            message: `Sucessfully deleted the USER with username: ${respons.username} and ID: ${req.params.userId}`
        })
    } catch (error){
        res.status(500).send ({
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
