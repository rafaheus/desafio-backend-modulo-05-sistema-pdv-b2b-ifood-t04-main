const buscarProduto = require('../../database/query/produtos/procurarProduto')
const msg = require('../../utils/msg')

const verificacaoPedido = async (req, res, next) => {
  const { pedido_produtos } = req.body

  for (const pedido of pedido_produtos) {
    const camposPreenchidos = pedido_produtos.every(
      (pedido) =>
        pedido.produto_id &&
        (pedido.quantidade_produto || pedido.quantidade_produto === 0)
    )

    if (!camposPreenchidos) {
      return res
        .status(400)
        .json(msg('Por favor, preencha todos os campos do pedido.'))
    }

    let produtoEncontrado = await buscarProduto(pedido.produto_id)

    let quantidade = pedido.quantidade_produto

    if (quantidade < 1) {
      return res.status(400).json(msg('Quantidade inválida'))
    }

    if (produtoEncontrado === false) {
      return res
        .status(404)
        .json(msg('Algum dos produtos informados não foram encontrados'))
    }

    if (quantidade > produtoEncontrado.quantidade_estoque) {
      return res.status(400).json(msg('Quantidade em estoque insuficiente'))
    }
  }

  return next()
}

module.exports = verificacaoPedido
