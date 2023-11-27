const buscarClientePorId = require('../../database/query/clientes/buscarClientePorId')
const verificarCpfCliente = require('../../database/query/clientes/verificarCpfCliente')
const msg = require('../../utils/msg')

const verificarCpfUnico = async (req, res, next) => {
  const { cpf: cpfCliente } = req.body
  const { id: idCliente } = req.params

  const cpfDB = await verificarCpfCliente(cpfCliente)

  if (idCliente !== undefined) {
    const { cpf: cpfClienteId } = await buscarClientePorId(idCliente)

    if (cpfCliente !== cpfClienteId) {
      if (cpfDB) {
        return res.status(400).json(msg('Cpf já cadastrado'))
      }
    }
  } else if (cpfDB) {
    return res.status(400).json(msg('CPF já cadastrado'))
  }

  return next()
}

module.exports = verificarCpfUnico
