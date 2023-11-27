const buscarClientePorId = require("../../database/query/clientes/buscarClientePorId")
const msg = require("../../utils/msg")

const verificarIdCliente = async (req, res, next) => {
  const { id } = req.params
  const clienteEncontrado = await buscarClientePorId(id)

  if (!clienteEncontrado) {
    return res.status(404).json(msg('Cliente não encontrado.'))
  }

  return next()
}

module.exports = verificarIdCliente