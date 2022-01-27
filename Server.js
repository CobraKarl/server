
import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import mongoose  from "mongoose"
import middelwares from "./src/middlewares/Middlewares.js"



dotenv.config()
const app = express()
const port = process.env.PORT

app.use(helmet())
app.use(morgan("common"))

app.get("/recipe", (req, res) => {
    res.send("Pancakes!")
})

app.use(middelwares.notFound)
app.use(middelwares.errorHandler)

mongoose.connect ("mongodb://localhost/testdatabase", {useNewUrlParser: true, useUnifiedTopology: true})
.then (() => console.log ("Successfully connected to the database"))
.catch((error) => {
    console.log ("ERROR TRYING TO CONNECT", error)
    process.exit()    

})

app.listen(port, () => {
    console.log("Servern är igång på port ${port}")
} )