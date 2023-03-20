import express from "express";
import ArticleController from "../controllers/articleController.js";

const articleRoute = express.Router()

articleRoute.post("/", ArticleController.createNewArticle)

export default articleRoute