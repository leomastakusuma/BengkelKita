import abstractQuery from "../../../../library/abstractQuery"
export  class Location_models extends abstractQuery {
	constructor(){
		super()
		this.sql = ""
		this.escape = ""
	}
	/**
	 * @description get Location byID
	 * @param {integer} uid 
	 */
	getLocationByID(uid,callback){
		this.sql = "SELECT * from tbl_location where uid =? and is_delete != ?"
		this.escape = [uid,1]
		this.queryEscape(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
	getAllLocation (callback){
		this.sql = "SELECT * from tbl_location where is_delete != ? "
		this.escape = [1]		
		this.queryEscape(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
	saveLocation(params,callback){
		this.sql = "INSERT INTO tbl_location SET name = ?, latitude = ?,longitude=?,address=?"
		this.escape = [params.name,params.latitude,params.longitude,params.address]
		this.queryEscape(this.sql,this.escape,(resultInsert)=>{
			callback(resultInsert)
		})
	}
	updateLocation(params,callback){
		this.sql = "UPDATE tbl_location SET name = ?, latitude = ?,longitude=?,address=? WHERE uid = ? "
		this.escape = [params.name, params.latitude,params.longitude, params.address,params.uid]
		this.queryEscape(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
	deleteLocation(uid,callback){
		this.sql = "UPDATE tbl_location SET is_delete = ? WHERE uid = ? "
		this.escape = [1,uid]
		this.queryEscape(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
}


