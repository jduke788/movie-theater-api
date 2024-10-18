
const express = require("express")
const sequelize = require("../db/connection")
const app = express()
const usersRouter = require("../routes/user")
const showsRouter = require("../routes/show")

app.use(express.json())

app.use("/shows", showsRouter)
app.use("/users", usersRouter)

module.exports = app