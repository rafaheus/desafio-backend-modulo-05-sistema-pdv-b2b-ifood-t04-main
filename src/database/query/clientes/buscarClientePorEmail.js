const knex = require('../../connection')

const buscarClientePorEmail = async (email) => {
  const cliente = await knex('clientes').select('email').where('email', email)
  const emailClienteExiste = !cliente.length ? false : true

  return emailClienteExiste
}
module.exports = buscarClientePorEmail