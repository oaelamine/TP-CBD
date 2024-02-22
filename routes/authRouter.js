const express = require("express");

const authController = require("./../controller/authController");

const Route = express.Router();

Route.post("/logIn", authController.logIn);
Route.get("/", authController.protect);
//Route.put("/:id", authController.updateUser);
//Route.delete("/:id", authController.deleteUser);

module.exports = Route;