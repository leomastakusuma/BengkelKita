import mysql from 'mysql'
import config from "config"

let conf_core_sys = config.get("CoreSys")
var pool = mysql.createPool({
	connectionLimit : 10,
	host: conf_core_sys.dbMaster.host,
	user: conf_core_sys.dbMaster.user,
	dateStrings: true,
	password: conf_core_sys.dbMaster.pass,
	database: conf_core_sys.dbMaster.dbName,
	port: conf_core_sys.dbMaster.port,
	debug    :  false
})

module.exports = pool


exports.executeQuery=function(query,callback){
	pool.getConnection(function(err,connection){
		if (err) {
			connection.release()
			throw err
		}
		connection.query(query,function(err,rows){
			connection.release()
			if(!err) {
				callback(null, {rows: rows})
			}
		})
		connection.on("error", function(err) {
			throw err
		})
	})
}

