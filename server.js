import dotenv from "dotenv"
dotenv.config()
import express from "express"
import rootRoute from "./routes/rootRoute.js"
import userRoute from "./routes/userRoute.js"
import articleRoute from "./routes/articleRoute.js"

const app = express()

const { PORT = 3500 } = process.env

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// root route
app.use("/", rootRoute)

// user route
app.use("/users", userRoute)

// article route
app.use("/articles", articleRoute)

app.listen(PORT, function () {
	console.log("Server up and running on http://localhost:" + PORT)
})
