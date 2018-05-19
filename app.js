import express from "express"

import bodyParser from "body-parser"
import expressValidator from "express-validator";

import jsonwebtoken from "jsonwebtoken"
import db from "./library/database"
import helmet from "helmet"



let app = express()

app.use(bodyParser.urlencoded({
	limit: "50mb",
	extended: true
}))

app.use(bodyParser.json())

app.use(expressValidator())
app.use(function (req, res, next) {
	for (var item in req.query) {
		req.sanitize(item).escape()
	}
	for (var items in req.param) {
		req.sanitize(items).escape()
	}
	for (var itemsx in req.body) {
		req.sanitize(itemsx).escape()
	}
	next()
})
app.use(helmet())
function errorHandler(err, req, res, next) {
	res.status(400)
	response.error("error", "Opps something wrong with your input", function (cb) {
		res.json(cb)
	})
}
app.use(errorHandler)


import erc from 'express-route-controller'
erc(app, {
	controllers: __dirname + "/controllers/v1",
	routes: {}
})

// // catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404)
	response.error("Not Found", "Please check url", function (response) {
		res.json(response)
	})
	return
})


var port = 8081
try {
	app.listen(port, "0.0.0.0", function () {
		console.log("listening on *:8081")
	})
	var env = app.get("env")
	console.log(env)
	console.log("API Start On PORT  " + port)
} catch (e) {
	console.log("Error :\n" + e)
	var port2 = port + 1
	app.listen(port2)
	console.log("API Start On PORT  " + port2)
}