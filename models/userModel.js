// import dbConnection from "../config/dbConnection.js";
// const session = dbConnection.connectToDb()

class UserModel {

	static async getAllUser() {
		try {

			const result = await session.run()
			console.log(result)
		} catch (err) {
			console.log(err)
		}

	}
	/**
	 * to create a new user
	 * @param {*} nameValue 
	 * @param {*} emailValue 
	 * @param {*} passwordValue 
	 */
	static createUser(session, { nameValue, emailValue, passwordValue }) {
		return session.run(`create (user:USER {name:{nameValue}, email:{emailValue},password:{passwordValue}})`, { nameValue, emailValue, passwordValue })
	}
}

export default UserModel