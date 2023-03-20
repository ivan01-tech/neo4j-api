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

	static getAllUserArticles(session, userId) {
		return session.run(`match (article:ARTICLE) -[rel:WRITE_BY]-> (user:USER { userId : $userId }) return article, rel`, { userId })
	}

	/**
	 * a function to create the IS_FRIENDS_WITH relationship between to user
	 * this is a one way relationship , make sure to do it on the order way
	 * @param {*} _s 
	 * @param {*} userId 
	 * @param {*} freindId 
	 * @returns 
	 */
	static isAfreindWith(_s, userId, freindId) {
		return session.run(`match (user:USER { userId : $userId }) match (freind:USER { userId : $freindId }) MERGE (user)-[r:IS_FRIENDS_WITH]->(freind) return r , freind , user
		`, { userId, freindId })
	}
}

export default UserModel