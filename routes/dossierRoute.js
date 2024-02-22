const express = require("express");

const dossierController = require("./../controller/dossierController");

const Route = express.Router();

Route.post("/", dossierController.createDossierMedical);
Route.get("/", dossierController.getAllDossierMedical);
Route.put("/:id", dossierController.updateDossierMedical);
Route.delete("/:id", dossierController.deleteDossierMedical);

module.exports = Route;