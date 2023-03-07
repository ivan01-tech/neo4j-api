import express from "express"
import userController from "../controllers/userController.js"
const userRoute = express.Router()

userRoute
	.get("/", function (req, res) {
		res.end("Hello world from users list")
	})
	.post("/", userController.createUser)

export default userRoute 