import mysql from "mysql"
import config from "config"
import abstractBengkelKita from "../library/abstractBengkelKita"
export default class abstractQuery {
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
			let Log = connection.query(Query, Params, function (err, results) {
				connection.release()
				if (!err) {
					new abstractBengkelKita().sendTelegram(Log.sql)
					callback(results)
				}
			})
			connection.on("error", function (err) {
				throw err
			})
			connection.on("acquire", function (connection) {
				new abstractBengkelKita().sendTelegram("Connection %d acquired", connection.threadId)
			})
			connection.on("enqueue", function () {
				new abstractBengkelKita().sendTelegram("Waiting for available connection slot")
			})
			connection.on("release", function (connection) {
				new abstractBengkelKita().sendTelegram("Connection %d released", connection.threadId)
			})
		})
	}
}


