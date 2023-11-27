const buscarClientePorId = require('../../database/query/clientes/buscarClientePorId')
const cadastrandoPedido = require('../../database/query/pedidos/cadastrarPedido')
const {
  cadastrandoPedidoProdutos,
  atualizandoValorFinal,
} = require('../../database/query/pedidos/cadastrarPedidoProduto')
const buscarProduto = require('../../database/query/produtos/procurarProduto')
const brl = require('../../utils/formatarParaReais')
const { htmlEmail } = require('../../utils/htmlEmail')
const msg = require('../../utils/msg')

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body

  let valorFinal = 0

  try {
    const dadosPedidos = { cliente_id, observacao, valorFinal }

    const pedidoFeito = await cadastrandoPedido(dadosPedidos)

    const pedidoId = pedidoFeito[0].id

    const dadosHtml = {
      produtos_pedido: [],
    }


    for (const pedido of pedido_produtos) {
      let produtoEncontrado = await buscarProduto(pedido.produto_id)
      let quantidade = pedido.quantidade_produto
      let valorProduto = produtoEncontrado.valor
      let calculoValor = valorProduto * quantidade
      valorFinal += calculoValor

      dadosHtml.produtos_pedido.push({
        produto_imagem: produtoEncontrado.produto_imagem,
        produto: produtoEncontrado.descricao,
        quantidade,
        valor_produto: brl(valorProduto),
      })
      await cadastrandoPedidoProdutos(
        pedidoId,
        pedido.produto_id,
        quantidade,
        valorProduto
      )
    }

    await atualizandoValorFinal(pedidoId, valorFinal)

    dadosHtml.valor_pedido = brl(valorFinal)

    const clienteId = await buscarClientePorId(cliente_id)

    const dadosMailjet = { clienteId, dadosHtml }

    await htmlEmail(dadosMailjet)

    pedidoFeito[0].valor_total = valorFinal

    return res.status(200).json(pedidoFeito[0])
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(msg('Erro interno do servidor.'))
  }
}

module.exports = cadastrarPedido
