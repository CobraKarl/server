
import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"


dotenv.config()
const app = express()
app.use(helmet())
const port = process.env.PORT

app.get("/recipe", (req, res) => {
    res.send("Pancakes!")
}


)

app.listen(port, () => {
    console.log("Servern är igång på port ${port}")
} )