const express = require("express");
const app = express.Router();

const userModel = require("../models/user");
const { StatusCodes } = require("http-status-codes");

app.get("/", (req, res, next) => {
	userModel
		.getList()
		.then((users) => {
			res.status(StatusCodes.OK).send({
				success: true,
				errors: [],
				data: users,
			});
		})
		.catch(next);
})
	.get("/handle/:handle", (req, res, next) => {
		userModel
			.getByHandle(req.params.handle)
			.then((user) => {
				res.status(StatusCodes.OK).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.get("/search/:search", (req, res, next) => {
		userModel
			.searchUsers(req.params.search)
			.then((user) => {
				res.status(StatusCodes.OK).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.get("/:id", (req, res, next) => {
		userModel
			.get(req.params.id)
			.then((user) => {
				res.status(StatusCodes.OK).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.post("/", (req, res, next) => {
		userModel
			.create(req.body)
			.then((user) => {
				res.status(StatusCodes.CREATED).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.delete("/:id", (req, res, next) => {
		userModel
			.remove(req.params.id)
			.then((user) => {
				res.status(StatusCodes.OK).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.patch("/:id", (req, res, next) => {
		userModel
			.update(req.params.id, req.body)
			.then((user) => {
				res.status(StatusCodes.OK).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.post("/login", (req, res, next) => {
		userModel
			.login(req.body.email, req.body.password)
			.then((user) => {
				res.status(StatusCodes.OK).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.get(`/login/:token`, (req, res, next) => {
		userModel
			.getByToken(req.params.token)
			.then((user) => {
				res.status(StatusCodes.OK).send({
					success: true,
					errors: [],
					data: user,
				});
			})
			.catch(next);
	})
	.post("/seed", (req, res, next) => {
		userModel
			.seed()
			.then((user) => {
				res.status(StatusCodes.OK).send({
					succes: true,
					erros: [],
					data: user.insertedIds,
				});
			})
			.catch(next);
	});

module.exports = app;