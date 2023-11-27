const buscarClientePorId = require('../../database/query/clientes/buscarClientePorId')
const msg = require('../../utils/msg')

const detalharCliente = async (req, res) => {
  const { id } = req.params
  try {
    const clienteEncontrado = await buscarClientePorId(id)

    return res.status(200).json(clienteEncontrado)
  } catch (error) {
    return res.status(500).json(msg('Erro interno do servidor.'))
  }
}

module.exports = detalharCliente
