import mysql from "mysql"
import config from "config"
import abstractBengkelKita from "./library/abstractBengkelKita"
let conf_core_sys = config.get("CoreSys")

let pool = mysql.createPool({
	connectionLimit: 10,
	host: conf_core_sys.dbMaster.host,
	user: conf_core_sys.dbMaster.user,
	dateStrings: true,
	password: conf_core_sys.dbMaster.pass,
	database: conf_core_sys.dbMaster.dbName,
	port: conf_core_sys.dbMaster.port,
	debug: false
})

module.exports = pool


pool.on("error", function (err) {
	new abstractBengkelKita().sendTelegram(err)
})
pool.on("acquire", function (connection) {
	new abstractBengkelKita().sendTelegram("acquire"+connection.threadId)
})
pool.on("enqueue", function () {
	new abstractBengkelKita().sendTelegram("Waiting for available connection slot")
})
pool.on("release", function (connection) {
	new abstractBengkelKita().sendTelegram("Release"+connection.threadId)
})