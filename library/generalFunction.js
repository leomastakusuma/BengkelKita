import config from "config"
let conf_core_sys = config.get("CoreSys")

export default class generalFunction {
	getBranch (token, callback){
		jwt.verify(token,conf_core_sys.etc.jwtPayload,function(err,decode){
			delete decode["iat"]
			delete decode["exp"]
			callback(decode)
		})
	}
	sendTelegram  (params){
		import telegramLogger from 'telegram-logger'
		const logger = telegramLogger({
			token: "518528266:AAFc9e2jhvPkaAsd1QbasV7NsLONTesoyhk",
			chat_id: "-207890427",
		})
		logger(params)
	}
}

module.exports =  generalFunction
