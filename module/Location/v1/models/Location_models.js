import abstractQuery from "../../../../library/abstractQuery"
export class Location_models  {
	constructor(){
		this.sql = ""
		this.escape = ""
	}

	getDataLocation (params,callback){
		this.sql = "SELECT * from tbl_location where uid =?"
		this.escape = [1]
		abstractQuery.queryEscape(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
	saveLocation(params,callback){
		this.sql = "INSERT INTO tbl_location SET name = ?, latitude = ?,longitude=?,address=?"
		this.escape = [params.name,params.latitude,params.longitude,params.address]
		abstractQuery.queryEscape(this.sql,this.escape,(resultInsert)=>{
			callback(resultInsert)
		})
	}
}

module.exports = new Location_models()
