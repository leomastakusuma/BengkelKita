import express from "express"
import bodyParser from "body-parser"
import expressValidator from "express-validator"
import helmet from "helmet"


let app = express()
let apiRouter = express.Router()

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
	let Response = {
		"status": "204",
		"message": "error",
		"display_message": "Opps something wrong with your input",
		"data": {}

	}
	res.json(Response)
	next()
}
app.use(errorHandler)

/**
 * @description list controller
 */
import Location from "./module/Location/v1/controllers/Locationcontrollers"
app.use("/v1", apiRouter)
new Location(apiRouter)


//Handling Not Found Url
app.use(function (req, res,next) {
	res.status(404)
	let Response = {
		"status": "204",
		"message": "Not Found",
		"display_message": "Opps Please check url",
		"data": {}

	}
	res.json(Response)
	next()
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