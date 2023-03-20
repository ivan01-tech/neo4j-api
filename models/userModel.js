import dbConnection from "../config/dbConnection.js";
const session = dbConnection.connectToDb()

class UserModel {
	/**
	 * to get the list of all users
	 * @param {*} session 
	 * @returns 
	 */
	static async getAllUsers(session) {
		return session.run(`match (users:USER) return users`)
	}
	/**
 * to get a users with  a specific id
 * @param {*} session 
 * @returns 
 */
	static async getUserById(session, id) {
		return session.run(`match (user:USER {userId:$id}) return user`, { id })
	}
	/**
	 * to create a new user
	 * @param {*} name 
	 * @param {*} email 
	 * @param {*} password 
	 */
	static createUser(session, { name, email, password, userId }) {
		return session.run(`create (user:USER {name:$name, userId:$userId ,  email:$email,password:$password}) return user`, { name, email, password, userId },)
	}

	/**
	 * update the user name
	 * @param {*} session 
	 * @param {*} param1 
	 * @returns 
	 */
	static updateUserName(session, { id, name }) {
		return session.run(`MATCH (user:USER {userId:$id}) SET user.name = $name return user`, { id, name })
	}
}

export default UserModel