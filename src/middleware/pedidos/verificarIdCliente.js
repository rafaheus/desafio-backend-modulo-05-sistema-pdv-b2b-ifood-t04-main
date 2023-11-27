const buscarClientePorId = require('../../database/query/clientes/buscarClientePorId')
const msg = require('../../utils/msg')

const buscandoIdCliente = async (req, res, next) => {
  const { cliente_id } = req.body
  const clienteEncontrado = await buscarClientePorId(cliente_id)

  if (!clienteEncontrado) {
    return res.status(404).json(msg('Cliente não encontrado.'))
  }
  next()
}

module.exports = buscandoIdCliente
