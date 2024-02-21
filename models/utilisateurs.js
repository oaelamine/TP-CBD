const db = require("./../db");

//CREATE THE "UTILISATEURS" TABLE

const sql = `
  CREATE TABLE Patients (
    ID_patient VARCHAR(10) PRIMARY KEY NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    DDN DATE,
    Sexe VARCHAR(10),
    Adresse VARCHAR(100),
    telephone VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    isBlackListed CHAR(1)
  );

`;

db.run(sql);
