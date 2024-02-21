const db = require("./../db");
const con = db.dbConnection;

exports.createRDV = (req, res) => {
	const { ID_RDV, dateRDV, Motif, statut, ID_patient } = req.body;
	const query = `INSERT INTO RDV  (ID_RDV, dateRDV, Motif, statut, ID_patient) VALUES (?, ?, ?, ?, ?)`;

	con.run(
		query,
		[ID_RDV, dateRDV, Motif, statut, ID_patient],
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

exports.getAllRDV = (req, res) => {
	const query = `SELECT * FROM RDV`;
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

exports.updateRDV = (req, res) => {
	const ID_RDV = req.params.id;
	const { dateRDV, Motif, statut, ID_patient } = req.body;

	const query = `UPDATE RDV SET dateRDV = ?, Motif = ?, statut = ? ,ID_patient = ? WHERE ID_RDV = ?`;
	con.run(
		query,
		[dateRDV, Motif, statut, ID_patient, ID_RDV],
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

exports.deleteRDV = (req, res) => {
	const ID_RDV = req.params.id;
	const query = `DELETE FROM RDV WHERE ID_RDV = ?`;
	con.run(query, [ID_RDV], (err, rows) => {
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
