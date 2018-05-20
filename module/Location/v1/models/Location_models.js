import abstractQuery from "../../../../library/abstractQuery"
class Location_models  {
	getDataLocation (params,callback){
		this.sql = "SELECT * from tbl_location where uid =?"
		this.escape = [1]
		abstractQuery.queryEscape(this.sql,this.escape,(resultData)=>{
			callback(resultData)
		})
	}
}

module.exports = new Location_models()
