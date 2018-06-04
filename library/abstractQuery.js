import dbConfig from "./../dbConfig"
export default class abstractQuery {
	queryEscape(Query, Params, callback) {
		dbConfig.query(Query, Params, function (err, results) {
			if (!err) {
				callback(results)
			}
		})
	}
}


