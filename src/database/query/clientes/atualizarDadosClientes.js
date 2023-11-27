const knex = require('../../connection')

const atualizarDadosCliente = async (id, dadosCliente) => {
  try {
    const cliente = await knex('clientes').returning('*').where('id', id).update(dadosCliente)


    const idCliente = cliente

    return idCliente[0]
  } catch (error) {
    return false
  }
}
module.exports = atualizarDadosCliente