module.exports = {
	success : function (message,data,callback){
		var result = {
			status           : 200,
			message          : "success",
			display_message  : message,
			data             : data,
		}
		callback(result)
	},

	update : function (message,callback){
		var result = {
			status              : 200,
			status_message      : "success",
			display_message     : message
		}
		callback(result)
	},

	error : function (message,data,callback){
		var result = {
			status              : 400,
			message             : "error",
			display_message     : message,
			data                : data,
		}
		callback(result)
	},
	notFound : function (message,callback){
		var result = {
			status              : 204,
			message             : "not found",
			display_message     : message,
			data                : {},
		}
		callback(result)
	},
	errorAuth : function(data,callback){
		var result = {
			status              : 401,
			message             : "error",
			display_message     : "Error Autentification",
			data                : data,
		}
		callback(result)
	},
	errorsql : function (data,callback){
		var result = {
			status              : 500,
			message             : "error",
			display_message     : "error sql",
			data                : "Please make sure your input is true",
		}
		callback(result)
	},

    
	failed : function(display_message,data,callback){
		var result = {
			status              : 500,
			message             : "error",
			display_message     : display_message,
			data                : data
		}
		callback(result)
	},
	isExist : function(display_message,data,callback){
		var result = {
			status              : 409,
			message             : "error",
			display_message     : display_message,
			data                : data
		}
		callback(result)
	}
}
