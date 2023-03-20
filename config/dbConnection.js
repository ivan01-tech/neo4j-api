import dotenv from "dotenv"
import neo4j from "neo4j-driver"
dotenv.config()

const {
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_NAME,
	DATABASE_URL,
} = process.env


const connectToDb = function () {

	const driver = neo4j.driver(DATABASE_URL, neo4j.auth.basic(DATABASE_USERNAME, DATABASE_PASSWORD))

	return driver.session({ database: DATABASE_NAME })
}

const query =
	`
  MATCH (n)
  RETURN COUNT(n) AS count
  LIMIT $limit
  `;

const params = { "limit": "10" };
/* 
		result.records.forEach((record) => {
			console.log(record.get('count'));
		});
 */

export default { connectToDb }
