const express = require("express");

const rdvController = require("./../controller/rdvController");

const Route = express.Router();

Route.post("/addRDV", rdvController.createRDV);
Route.get("/allRDV", rdvController.getAllRDV);
Route.put("/:id", rdvController.updateRDV);
Route.delete("/:id", rdvController.deleteRDV);

module.exports = Route;
