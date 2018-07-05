import mysql from "mysql"
import config from "config"

export default class abstractQuery {
	queryEscape(Query, Params, callback) {
		let conf_core_sys = config.get("CoreSys")
		let Connection = mysql.createPool({
			connectionLimit: 10,
			host: conf_core_sys.dbConfig.host,
			user: conf_core_sys.dbConfig.user,
			dateStrings: true,
			password: conf_core_sys.dbConfig.pass,
			database: conf_core_sys.dbConfig.dbName,
			port:conf_core_sys.dbConfig.port,
			debug: false
		})

		let Log = Connection.query(Query, Params, function (err, results) {
			if(conf_core_sys.etc.log){
				console.log(Log.sql)
			}
			if (!err) {
				callback(results)
			}
		})
	}
}


