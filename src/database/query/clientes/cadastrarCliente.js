const knex = require('../../connection')

const cadastrarClienteValidado = async (dadosCliente) => {
  try {
    const novoCliente = await knex('clientes')
      .returning('id')
      .insert(dadosCliente)

    const idCliente = novoCliente[0].id

    return idCliente
  } catch (error) {
    return false
  }
}
module.exports = cadastrarClienteValidado
