
import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
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


app.listen(port, () => {
    console.log("Servern är igång på port ${port}")
} )