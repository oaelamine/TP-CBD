const db = require("./../db");
const con = db.dbConnection;

exports.createPatients = (req, res) => {
	const { ID_patient , nom , prenom , DDN , Sexe,  Adresse , telephone , email ,isBlackListed } = req.body;
	const query = `INSERT INTO Patients (ID_patient, nom, prenom, DDN, Sexe,  Adresse, telephone, email, isBlackListed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

	con.run(
		query,
		[ID_patient , nom , prenom , DDN , Sexe,  Adresse , telephone , email ,isBlackListed],
		(err, rows) => {
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
		}
	);
};

exports.getAllPatients = (req, res) => {
	const query = `SELECT * FROM Patients`;

	con.all(query, (err, rows) => {
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

exports.updatePatients = (req, res) => {
	const ID_patient = req.params.id;
	const { nom , prenom , DDN , Sexe,  Adresse , telephone , email ,isBlackListed } = req.body;

	const query = `UPDATE Patients SET nom = ? , prenom = ? , DDN = ? , Sexe = ?,  Adresse = ? , telephone = ? , email = ? ,isBlackListed = ? WHERE ID_patient = ?`;
	con.run(
		query,
		[nom , prenom , DDN , Sexe,  Adresse , telephone , email ,isBlackListed, ID_patient],
		(err, rows) => {
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
		}
	);
};

exports.deletePatients = (req, res) => {
	const ID_patient = req.params.id;
	const query = `DELETE FROM Patients WHERE ID_patient = ?`;
	con.run(query, [ID_patient], (err, rows) => {
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
