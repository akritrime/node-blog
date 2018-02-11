const { Model } = require("objection")
const knexConf = require("./knexfile")
const Knex = require("knex")

module.exports = async() => {
    Model.knex().migrate.rollback().then(() => {
        Model.knex().destroy()
    })
}