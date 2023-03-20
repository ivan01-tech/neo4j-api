import express from "express"
import userController from "../controllers/userController.js"
const userRoute = express.Router()

userRoute
	.get("/", userController.getAllusers)
	.get("/:id", userController.getUserById)
	.post("/", userController.createUser)
	.patch("/:id", userController.updateUserName)

export default userRoute 