import UserController from "../controllers/User.controller.js";

const routes =(app) => {
    app.post ("/user", UserController.creatUser)
    app.get ("/user", UserController.getAllUsers)
}

export default {
    routes
}