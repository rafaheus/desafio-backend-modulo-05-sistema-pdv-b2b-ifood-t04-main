const knex = require('../../connection')

const buscarClientePorCpf = async (cpf) => {
  const cliente = await knex('clientes')
    .select()
    .where('cpf', 'like', `%${cpf}%`)

  if (!cliente.length) {
    return false
  }

  return cliente[0]
}

module.exports = buscarClientePorCpf