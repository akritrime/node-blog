const { Model } = require("objection")
const knexConf = require("./knexfile")
const Knex = require("knex")

module.exports = async() => {
    Model.knex(Knex(knexConf.test))
}