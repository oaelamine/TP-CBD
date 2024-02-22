const express = require("express");

const patientsController = require("./../controller/patientsController");

const Route = express.Router();

Route.post("/", patientsController.createPatients);
Route.get("/", patientsController.getAllPatients);
Route.put("/:id", patientsController.updatePatients);
Route.delete("/:id", patientsController.deletePatients);

module.exports = Route;
