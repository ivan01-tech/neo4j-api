import dbConnection from "../config/dbConnection.js"
const session = dbConnection.connectToDb()

export class ArticleModel {
	static async createArticle(session, { title, text, id, userId }) {
		return session.run(`create (article:ARTICLE {title:$title , text:$text , id:$id}) -[:WRITE_BY {createdAt:DateTime()}]-> (user:USER {userId:$userId}) return article, user.name`, { title, text, id, userId })
	}

}
