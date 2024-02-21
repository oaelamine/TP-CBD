const express = require("express");

const userController = require("./../controller/userController");

const Route = express.Router();

Route.post("/signIn", userController.createUser);
Route.get("/allUsers", userController.getAllUsers);
Route.put("/:id", userController.updateUser);
Route.delete("/:id", userController.deleteUser);

module.exports = Route;
