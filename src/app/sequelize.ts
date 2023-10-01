import path from "path"
import { Sequelize } from "sequelize"
import sqlite3 from "sqlite3"

export const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: sqlite3,
  storage: path.join(__dirname, "../data/bombies.sqlite"),
})
