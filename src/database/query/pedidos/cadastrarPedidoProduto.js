const knex = require('../../connection')

const cadastrandoPedidoProdutos = async (
  pedidoId,
  produtoId,
  quantidadeProduto,
  valorProduto
) => {
  const queryCadastroPedidoProduto = await knex('pedido_produtos').insert({
    pedido_id: pedidoId,
    produto_id: produtoId,
    quantidade_produto: quantidadeProduto,
    valor_produto: valorProduto,
  })
  return queryCadastroPedidoProduto
}

const atualizandoValorFinal = async (pedidoId, valorFinal) => {
  const atualizacao = await knex('pedidos')
    .where('id', pedidoId)
    .update({ valor_total: valorFinal })
  return atualizacao
}

module.exports = { cadastrandoPedidoProdutos, atualizandoValorFinal }
