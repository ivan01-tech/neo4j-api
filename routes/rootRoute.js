import express from "express"
const rootRoute = express.Router()

rootRoute.get("/", function (req, res) {
	res.end("Hello world")
})

export default rootRoute 