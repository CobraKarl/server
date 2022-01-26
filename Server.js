
import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"



dotenv.config()
const app = express()
app.use(helmet())
app.use(morgan("common"))
/*app.use(isAuthenticated)*/

const port = process.env.PORT

app.get("/recipe", (req, res) => {
    res.send("Pancakes!")
})

app.get("/user", isAuthenticated, (req, res) => {

})

app.use(notFound)
function isAuthenticated(req, res, next) {
    req.query.admin === "true"
    ? res.send ("You are admin")
    : res.send ("You are not admin, GO HOME")
    next()

}

function notFound(req, res, next) {
    const error = new Error(`Not Found: ${req.originalUrl}`)
    res.status(404)
    next(error)
}

app.listen(port, () => {
    console.log("Servern är igång på port ${port}")
} )