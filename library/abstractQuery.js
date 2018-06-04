// import abstractBengkelKita from "../library/abstractBengkelKita"
import dbConfig from "./../dbConfig"

export default class abstractQuery {
	queryEscape(Query, Params, callback) {
		dbConfig.query(Query, Params, function (err, results) {
			if (!err) {
				callback(results)
			}
		})



		// poolingQuery.getConnection(function (err, connection) {
		// 	if (err) {
		// 		console.log(err)
		// 		throw err
		// 	}
		// 	connection.query(Query, Params, function (err, results) {
		// 		connection.release()
		// 		if (!err) {
		// 			callback(results)
		// 		}
		// 	})
		// 	connection.on("error", function (err) {
		// 		new abstractBengkelKita().sendTelegram("Error Db"+err)
		// 	})
		// 	connection.on("enqueue", function () {
		// 		new abstractBengkelKita().sendTelegram("Waiting for available connection slot")
		// 	})
		// 	connection.on("release", function (connection) {
		// 		new abstractBengkelKita().sendTelegram("Connection released"+connection.threadId)
		// 	})
		// })
	}
}


