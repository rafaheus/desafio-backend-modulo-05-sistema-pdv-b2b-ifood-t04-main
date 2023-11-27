const knex = require('../../connection')

const verificarCpfCliente = async (cpf) => {
  const clientes = await knex('clientes').select('cpf').where('cpf', cpf)

  const cpfCliente = !clientes.length

  if (!cpfCliente) {
    return true
  }
  return false
}
module.exports = verificarCpfCliente
