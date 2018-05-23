export class abstractResponse {
	constructor(){
		this.result = ""
	}
	responseSuccess(message, data, callback) {
		this.result = {
			status: 200,
			message: "success",
			display_message: message,
			data: data,
		}
		callback(this.result)
	}
	responseUpdate(callback) {
		this.result = {
			status: 200,
			status_message: "update success",
			display_message: "Success update your data",
			data: {},
		}
		callback(this.result)
	}

	responseNotFound(callback) {
		this.result = {
			status: 204,
			message: "not found",
			display_message: "opps data not found",
			data: {},
		}
		callback(this.result)
	}
	responseerrorAuth(data, callback) {
		this.result = {
			status: 401,
			message: "error",
			display_message: "Error Autentification",
			data: {},
		}
		callback(this.result)
	}
	responseISExist(display_message, data, callback) {
		var result = {
			status: 409,
			message: "error",
			display_message: "field data is already exist",
			data: {}
		}
		callback(result)
	}
	responseFailed(display_message, data, callback) {
		var result = {
			status: 500,
			message: "error",
			display_message: "Opp someting wrong,please try again",
			data: data
		}
		callback(result)
	}
	responseValidation(display_message, callback) {
		var result = {
			status: 400,
			message: "validation errors",
			display_message: display_message,
			data: {}
		}
		callback(result)
	}
}