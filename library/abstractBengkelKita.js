import telegramLogger from "telegram-logger"
import {
	abstractResponse
} from "./abstractResponse"
import mysql from "mysql"
import config from "config"

export default class abstractBengkelKita extends abstractResponse {
	sendTelegram(params) {
		const logger = telegramLogger({
			token: "518528266:AAFc9e2jhvPkaAsd1QbasV7NsLONTesoyhk",
			chat_id: "-207890427",
		})
		logger(params)
	}
	queryEscape(Query, Params, callback) {
		let conf_core_sys = config.get("CoreSys")
		let poolingQuery = mysql.createPool({
			connectionLimit: 10,
			host: conf_core_sys.dbMaster.host,
			user: conf_core_sys.dbMaster.user,
			dateStrings: true,
			password: conf_core_sys.dbMaster.pass,
			database: conf_core_sys.dbMaster.dbName,
			port: conf_core_sys.dbMaster.port,
			debug: false
		})
		poolingQuery.getConnection(function (err, connection) {
			if (err) {
				connection.release()
				throw err
			}
			connection.query(Query, Params, function (err, results) {
				connection.release()
				if (!err) {
					callback(results)
				}
			})
			connection.on("error", function (err) {
				throw err
			})
		})
	}


}