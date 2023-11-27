const msg = require('../../utils/msg')
const {
  buscarPedidosPorClienteId,
  buscarPedidos,
} = require('../../database/query/pedidos/buscarPedidos')
const buscarClientePorId = require('../../database/query/clientes/buscarClientePorId')

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query
  let pedidos

  try {
    if (cliente_id) {
      const clienteEncontrado = await buscarClientePorId(cliente_id)
      if (!clienteEncontrado) {
        return res.status(404).json(msg('Cliente não encontrado.'))
      }
      pedidos = await buscarPedidosPorClienteId(cliente_id)
      return res.status(200).json(pedidos)
    }

    pedidos = await buscarPedidos()

    return res.status(200).json(pedidos)
  } catch (error) {
    return res.status(500).json(msg('Erro interno do servidor.'))
  }
}

module.exports = listarPedidos
