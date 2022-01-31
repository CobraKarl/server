import UserController from "../controllers/User.controller.js";

const routes =(app) => {
    app.post ("/user", UserController.creatUser)
}

export default {
    routes
}