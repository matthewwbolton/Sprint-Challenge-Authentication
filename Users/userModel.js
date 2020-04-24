const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  addUser,
};

function find() {
  return db.select("username", "password").from("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(user_id) {
  return db("users").where("id", user_id).first();
}

async function addUser(newUser) {
  const [id] = await db("users").insert(newUser, "id");

  return findById(id);
}
