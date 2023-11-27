const knex = require('../../connection')

const deletandoProduto = (id) => {
  const produtoExcluido = knex('produtos').del().where('id', id).returning('*')
  return produtoExcluido
}
module.exports = deletandoProduto
