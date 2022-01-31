import UserController from "../controllers/User.controller.js";

const routes =(app) => {
    app.post ("/user", UserController.creatUser)
    app.get ("/user", UserController.getAllUsers)
    app.get ("/user/:userId", UserController.getUserWithId)
    app.get ("/searchuser", UserController.getUserWithUsernameQuery)
    app.put ("/user/:userId", UserController.updateUser)
}

export default {
    routes
}