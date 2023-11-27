const knex = require('../../connection')

const cadastrandoProduto = (dadosProduto) => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = dadosProduto

  const queryCadastroProduto = knex('produtos')
    .insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem
    })
    .returning('*')

  return queryCadastroProduto
}
module.exports = cadastrandoProduto
