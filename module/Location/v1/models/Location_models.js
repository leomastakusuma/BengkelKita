import abstractQuery from "../../../../library/abstractQuery"
export  class Location_models extends abstractQuery {
	constructor(){
		super()
		this.sql = ""
		this.escape = ""
	}
	getLocationByID(uid,callback){
		this.sql = "SELECT * from tbl_location where uid =?"
		this.escape = [uid]
		this.queryFastEscapa(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
	getAllLocation (callback){
		this.sql = "SELECT * from tbl_location"		
		this.queryFastEscapa(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
	saveLocation(params,callback){
		this.sql = "INSERT INTO tbl_location SET name = ?, latitude = ?,longitude=?,address=?"
		this.escape = [params.name,params.latitude,params.longitude,params.address]
		this.queryFastEscapa(this.sql,this.escape,(resultInsert)=>{
			callback(resultInsert)
		})
	}
	updateLocation(params,callback){
		this.sql = "UPDATE tbl_location SET name = ?, latitude = ?,longitude=?,address=? WHERE uid = ? "
		this.escape = []
		this.queryFastEscapa(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
	deleteLocation(uid,callback){
		this.sql = "DELETE *  FROM tbl_location WHERE uid = ? "
		this.escape = [uid]
		this.queryFastEscapa(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
}


