import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser"
import middelwares from "./src/middlewares/Middlewares.js"
import Configuration from "./configuration/Configuration.js"



dotenv.config()
const app = express()
app.use(bodyParser.urlencoded( { extended : true}))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan("common"))

app.get("/recipe", (req, res) => {
    res.send("Pancakes!")
})

app.use(middelwares.notFound)
app.use(middelwares.errorHandler)

Configuration.connectToDatabsase ()
Configuration.connectToPort (app)
