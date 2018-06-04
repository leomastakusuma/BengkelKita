import mysql from "mysql"
import config from "config"
let conf_core_sys = config.get("CoreSys")

module.exports = mysql.createPool({
	connectionLimit: 10,
	host: conf_core_sys.dbConfig.host,
	user: conf_core_sys.dbConfig.user,
	dateStrings: true,
	password: conf_core_sys.dbConfig.pass,
	database: conf_core_sys.dbConfig.dbName,
	port:conf_core_sys.dbConfig.port,
	debug: false
})
