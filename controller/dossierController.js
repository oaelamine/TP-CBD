const db = require("./../db");
const con = db.dbConnection;

exports.createDossierMedical = (req, res) => {
	const { ID_dossier , DateCreation , InfoMedicales , NoteMedcin , dateMAJ,  ID_patient } = req.body;
	const query = `INSERT INTO DossierMedical (ID_dossier , DateCreation , InfoMedicales , NoteMedcin , dateMAJ,  ID_patient) VALUES (?, ?, ?, ?, ?, ?)`;

	con.run(
		query,
		[ID_dossier , DateCreation , InfoMedicales , NoteMedcin , dateMAJ,  ID_patient],
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

exports.getAllDossierMedical = (req, res) => {
	const query = `SELECT * FROM DossierMedical`;

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

exports.updateDossierMedical = (req, res) => {
	const ID_dossier = req.params.id;
	const { DateCreation , InfoMedicales , NoteMedcin , dateMAJ,  ID_patient } = req.body;

	const query = `UPDATE DossierMedical SET DateCreation = ? , InfoMedicales = ? , NoteMedcin = ? , dateMAJ = ?,  ID_patient = ? WHERE ID_dossier = ?`;
	con.run(
		query,
		[DateCreation , InfoMedicales , NoteMedcin , dateMAJ,  ID_patient, ID_dossier],
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

exports.deleteDossierMedical = (req, res) => {
	const ID_dossier = req.params.id;
	const query = `DELETE FROM DossierMedical WHERE ID_dossier = ?`;
	con.run(query, [ID_dossier], (err, rows) => {
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
