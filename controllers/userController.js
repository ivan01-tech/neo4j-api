import dbConnection from "../config/dbConnection.js"
import UserModel from "../models/userModel.js"
import transformResult from "../utils/transformResult.js"

import { nanoid } from "nanoid"

class userController {
	/**
	 * @desc to add new user in the db
	 * @route /users
	 * @param {*} req 
	 * @param {*} res 
	 */
	static async createUser(req, res) {

		const session = dbConnection.connectToDb()

		try {
			const { name, email, password } = req.body

			console.log("body : ", req.body)

			const result = await UserModel.createUser(session, { name, email, password, userId: nanoid() })

			const transformed = transformResult(result)

			res.json(transformed)
		} catch (err) {

			console.log("error : ", err)

		} finally {
			await session.close()
		}

	}
	/**
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 * @returns 
	 */
	static async getAllusers(req, res) {

		const session = dbConnection.connectToDb()

		try {

			const results = await UserModel.getAllUsers(session)
			if (!results) return res.status(501).json({ status: "error", message: "Something is going wrong ! " })

			const transformResults = transformResult(results)

			if (!transformResults.length) return res.status(401).json({ message: "Not found !" })

			return res.json(transformResults)

		} catch (err) {

			console.log(err)

		} finally {

			await session.close()

		}
	}

	/** 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
	static async getUserById(req, res) {

		const session = dbConnection.connectToDb()

		try {
			const id = req.params.id
			console.log("id : ", id)
			const results = await UserModel.getUserById(session, id)
			if (!results) return res.status(401).json({ status: "error", message: "User with the specified id is not found" })

			const transformed = transformResult(results)
			console.log("results : ", results)
			console.log("transformResults : ", transformed)

			return res.json(transformed)

		} catch (err) {

			console.log(err)

		} finally {

			await session.close()

		}
	}

	static async updateUserName(req, res) {
		const session = dbConnection.connectToDb()
		try {
			const { name } = req.body
			const { id } = req.params
			if (!id || !Boolean(name)) return res.status(500).json({ status: "error", message: "wrong crudentials" })

			const currentuser = await UserModel.getUserById(session, id)
			if (!currentuser.records.length) return res.status(404).json({ message: "user not found !" })

			const transformed = transformResult(currentuser)
			console.log(transformed)

			const updateUser = await UserModel.updateUserName(session, { id, name })

			return res.json({ user: transformResult(updateUser)[0][0] })

		} catch (err) {
			console.log("err: ", err)
		} finally {
			await session.close()
		}
	}

	/**
	 * get all user article's
	 * @param {*} req 
	 * @param {*} res 
	 * @returns 
	 */
	static async getAllUserArticles(req, res) {
		const session = dbConnection.connectToDb()

		try {
			const { id } = req.params

			const currentuser = await UserModel.getUserById(session, id)
			if (!currentuser.records.length) return res.status(404).json({ message: "user not found !" })

			console.log(currentuser)

			const result = await UserModel.getAllUserArticles(session, id)
			if (!result.records.length) return res.status(404).json({ message: "articles not found !" })

			const articles = transformResult(result)

			return res.json({ "articles": articles })

		} catch (err) {
			console.log("err : ", err)
		} finally {
			await session.close()
		}
	}

}

export default userController