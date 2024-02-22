const db = require("./../db");

const con = db.dbConnection;

exports.getAllUsers = (req, res) => {
	const query = `SELECT * FROM Utilisateurs`;
	//const query = `SELECT * FROM Utilisateurs WHERE nomUser = "orlDrSari" AND MDP = "orlDrSari"`;
	con.all(query, (err, rows) => {
		if (err) {
			res.status(400).json({
				status: "fail",
				message: err.message,
				err,
			});
		}
		console.log(rows)
		res.status(200).json({
			status: "success",
			data: rows,
		});
	});
};

exports.createUser = (req, res, next) => {
	const { ID_utilisateur, nomUser, MDP, Role } = req.body;

	const query = `INSERT INTO Utilisateurs (ID_utilisateur, nomUser, MDP, Role) VALUES (?, ?, ?, ?) `;
	con.run(query, [ID_utilisateur, nomUser, MDP, Role], (err, rows) => {
		if (err) {
			res.status(400).json({
				status: "fail",
				message: err.message,
				err,
			});
		}
		res.status(201).json({
			status: "success",
			data: rows,
		});
	});
};

exports.updateUser = (req, res) => {
	const ID_utilisateur = req.params.id;
	const { nomUser, MDP, Role } = req.body;

	const query = `UPDATE Utilisateurs SET nomUser = ?, MDP = ?, Role = ? WHERE ID_utilisateur = ?`;
	con.run(query, [nomUser, MDP, Role, ID_utilisateur], (err, rows) => {
		if (err) {
			res.status(400).json({
				status: "fail",
				message: err.message,
				err,
			});
		}
		res.status(200).json({
			status: "success",
			data: rows,
		});
	});
};

exports.deleteUser = (req, res) => {
	const ID_utilisateur = req.params.id;
	const query = `DELETE FROM Utilisateurs WHERE ID_utilisateur = ?`;
	con.run(query, [ID_utilisateur], (err, rows) => {
		if (err) {
			res.status(400).json({
				status: "fail",
				message: err.message,
				err,
			});
		}
		res.status(204).json({
			status: "success",
			data: rows,
		});
	});
};
