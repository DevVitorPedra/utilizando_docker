require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getUserById, createUser, login } = require("./usercontroller");
const { testingEnvironment } = require("./usercontroller");
const PORT = process.env.PORT || 3333;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/docker", (req, res) => {
  res.status(200).send("Endpoint docker rodando bunitão!!");
});
app.get("/", (req, res) => {
  res.status(200).send("Rodando na maciota!!");
});
app.post("/login", login);
app.post("/create", createUser);
app.get("/user/:id", getUserById);
app.get("/secret", testingEnvironment);
app.listen(PORT, () => {
  console.log(`Rodando na porta: ${PORT}`);
});
