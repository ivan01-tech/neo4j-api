import UserModel from "../models/userModel.js"
import dbConnection from "../config/dbConnection.js"
import { ArticleModel } from "../models/articleModel.js"
import { nanoid } from "nanoid"

class ArticleController {
	static async createNewArticle(req, res) {
		const session = dbConnection.connectToDb()

		try {

			const { title, text, userId } = req.body

			const areTrueValue = Boolean(text) && Boolean(title) && Boolean(userId)
			if (!areTrueValue) return res.status(400).json({ message: "wrong crudentials" })

			const user = await UserModel.getUserById(session, userId)
			if (!user.records.length) return res.status(404).json({ message: "user not found !" })

			const article = await ArticleModel.createArticle(session, { title, text, id: nanoid(), userId })
			console.log(article)
			return res.status(201).json({ message: "Article created" })

		} catch (err) {
			console.log("err : ", err)
		} finally {
			await session.close()
		}

	}

}

export default ArticleController