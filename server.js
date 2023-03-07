import dotenv from "dotenv"
dotenv.config()
import express from "express"
import rootRoute from "./routes/rootRoute.js"
import userRoute from "./routes/userRoute.js"

const app = express()

const { PORT = 3500 } = process.env

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// root route
app.use("/", rootRoute)

// user route
app.use("/users", userRoute)

app.listen(PORT, function () {
	console.log("Server up and running on http://localhost:" + PORT)
})