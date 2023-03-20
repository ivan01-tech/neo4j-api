import express from "express"
import userController from "../controllers/userController.js"
const userRoute = express.Router()

userRoute
	.get("/", userController.getAllusers)
	.get("/:id", userController.getUserById)
	.get("/:id/articles", userController.getAllUserArticles)
	.post("/", userController.createUser)
	.patch("/:id", userController.updateUserName)

export default userRoute 