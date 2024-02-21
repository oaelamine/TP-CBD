const express = require("express");

const db = require("./db");
const userRouter = require("./routes/usersRoute");
const rdvRoute = require("./routes/rdvRoute");

const app = express();

//BODY PARCER
app.use(express.json());

//CREATE TABLES

const tables = {
	utilisateurTable: `CREATE TABLE IF NOT EXISTS Utilisateurs (
		ID_utilisateur VARCHAR(10) PRIMARY KEY NOT NULL,
		nomUser VARCHAR(50),
		MDP VARCHAR(100),
		Role VARCHAR(50)
	);`,

	patientsTable: `CREATE TABLE IF NOT EXISTS Patients (
		ID_patient VARCHAR(10) PRIMARY KEY NOT NULL,
		nom VARCHAR(50) NOT NULL,
		prenom VARCHAR(50) NOT NULL,
		DDN DATE,
		Sexe VARCHAR(10),
		Adresse VARCHAR(100),
		telephone VARCHAR(10) NOT NULL,
		email VARCHAR(100),
		isBlackListed CHAR(1)
	);`,

	dossiermedicalTable: `CREATE TABLE IF NOT EXISTS DossierMedical (
		ID_dossier VARCHAR(10) PRIMARY KEY NOT NULL,
		DateCreation DATE,
		InfoMedicales VARCHAR(500),
		NoteMedcin VARCHAR(500),
		dateMAJ DATE,
		ID_patient VARCHAR(10),
		FOREIGN KEY (ID_patient) REFERENCES Patients(ID_patient)
	);`,

	rdvTable: `CREATE TABLE IF NOT EXISTS RDV (
		ID_RDV VARCHAR(10) PRIMARY KEY NOT NULL,
		dateRDV DATE,
		Motif VARCHAR(100),
		statut VARCHAR(50),
		ID_patient VARCHAR(10),
		FOREIGN KEY (ID_patient) REFERENCES Patients(ID_patient)
	);`,
};

const con = db.dbConnection;
Object.values(tables).forEach((el) => {
	db.createTable(con, el);
});

//ROUTERS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rdv", rdvRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
