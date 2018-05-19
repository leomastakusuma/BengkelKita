module.exports = {
	queryesacape : function (Query,escape, callback){
		db.query(Query,escape, function(error, results){
			if (error){
				callback({})                
			}else{
				callback(results)
			}
		})
	},
	query : function (Query, callback){
		db.query(Query, function(error, results){
			if (error){
				callback({})                
			}else{
				callback(results)
			}
		})
	},

	insert : function(params, callback){
		var arr = Object.keys(params.field).map(function (key) { 
			return key 
		})
        
		var arr2 = Object.keys(params.field).map(function (key) { 
			return "'"+params.field[key]+"'" 
		})
        
		var query = "INSERT INTO "+params.table+" ("+arr+") VALUES ("+arr2+")"
		db.query(query, function(error, results){
			if (error){
				callback({})
			}else{
				callback(results)
			}
		})
	},


	update : function(params, callback){
		var arr = Object.keys(params.field).map(function (key) { 
			return key+"='"+params.field[key]+"'" 
		})

		var query = "UPDATE "+params.table+" SET "+arr
		db.query(query, function(error, results){
			if (error){
				callback({})                
			}else{
				callback(results)
			}
		})
	},

	select : function(params, callback){
		let query = ""
		var arr = ""
		if(typeof params.where != "undefined"){
			arr = Object.keys(params.where).map(function (key) { 
				return key+"='"+params.where[key]+"'" 
			})
			query = "SELECT "+params.field+" FROM "+params.table + " WHERE " + arr
		}else{
			query = "SELECT "+params.field+" FROM "+params.table
		}

		if(typeof params.orderby !="undefined"){
			arr = Object.keys(params.orderby).map(function (key) { 
				return key+" "+params.orderby[key] 
			})
		}

		db.query(query, function(error, results){
			if (error){
				callback({})                
			}else{
				callback(results)
			}
		})
	}  
}


