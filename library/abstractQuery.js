import mysql from "mysql"
import config from "config"
let conf_core_sys = config.get("CoreSys")


let poolingQuery = mysql.createPool({
	connectionLimit : 10,
	host: conf_core_sys.dbMaster.host,
	user: conf_core_sys.dbMaster.user,
	dateStrings: true,
	password: conf_core_sys.dbMaster.pass,
	database: conf_core_sys.dbMaster.dbName,
	port: conf_core_sys.dbMaster.port,
	debug    :  false
})


class abstractQuery {
	queryEscape (Query,Params, callback){
		poolingQuery.getConnection(function(err,connection){
			if (err) {
				connection.release()
				throw err
			}
			connection.query(Query,Params,function(err,results){
				connection.release()
				if(!err) {
					callback(results)
				}
			})
			connection.on("error", function(err) {
				throw err
			})
		})
	}
}
module.exports = new abstractQuery()