const knex = require('../../connection')

const editandoProduto = (dadosProduto) => {
  const {
    id,
    descricao,
    quantidade_estoque,
    valor,
    categoria_id,
    produto_imagem,
  } = dadosProduto
  const queryEditarProduto = knex('produtos')
    .where('id', id)
    .update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem,
    })
    .returning('*')

  return queryEditarProduto
}

module.exports = editandoProduto
