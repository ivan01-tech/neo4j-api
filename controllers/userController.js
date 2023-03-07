import dbConnection from "../config/dbConnection.js"
import UserModel from "../models/userModel.js"

class userController {
	/**
	 * @desc to add new user in the db
	 * @route /users
	 * @param {*} req 
	 * @param {*} res 
	 */
	static async createUser(req, res) {
		const session = dbConnection.connectToDb()
		console.log("session : ", session)
		try {
			const { name, email, password } = req.body

			console.log("body : ", req.body)

			const result = await UserModel.createUser(session, { nameValue: name, emailValue: email, passwordValue: password })

			console.log("result : ", result)

			res.end("hello")
		} catch (err) {

			console.log("error : ", err)

		} finally {
			await session.close()
		}

	}


}

export default userController