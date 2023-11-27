const knex = require('../../connection')

const buscarProdutoNoPedido = async (id) => {
  const produto = await knex('pedido_produtos').where('produto_id', id)
  if (!produto.length) {
    return false
  }
  return produto
}
module.exports = buscarProdutoNoPedido
