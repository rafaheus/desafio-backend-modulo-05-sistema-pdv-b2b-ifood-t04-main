const knex = require('../../connection')

const buscarClientePorId = async (id) => {
  const cliente = await knex('clientes').select().where('id', id)

  if (!cliente.length) {
    return false
  }

  return cliente[0]
}
module.exports = buscarClientePorId
