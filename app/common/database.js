const sqlite3 = require("sqlite3").verbose();
const { app } = require("electron");
const { join } = require("path");
const knex = require("knex");

const database = knex({
  client: "sqlite3",
  connection: {
    filename: join(app.getPath("userData"), "vite-react-electron-db"),
  },
  useNullAsDefault: true,
});

database.schema.hasTable("goals").then((exists) => {
  if (!exists) {
    return database.schema.createTable("goals", (table) => {
      table.increments("id").primary();
      table.string("goal_title");
      table.integer("deleted");
    });
  }
});

const insertTitle = async (title) => {
  await database("goals").insert({ goal_title: title });
  return "Success!";
};

const fetchTable = async (table) => {
  return await database(table).select();
};

module.exports = {
  insertTitle: insertTitle,
  fetchTable: fetchTable,
};
