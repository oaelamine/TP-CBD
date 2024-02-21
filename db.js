const sqlite3 = require("sqlite3").verbose();

exports.dbConnection = new sqlite3.Database("./database.db", (err) => {
	if (err) console.log(err);
	console.log("DATABASE IS CONNECTED");
});

exports.createTable = function (db, sql) {
	db.run(sql, (err) => {
		if (err) console.log(err);
		// console.log("table created or alredy exists");
	});
};
