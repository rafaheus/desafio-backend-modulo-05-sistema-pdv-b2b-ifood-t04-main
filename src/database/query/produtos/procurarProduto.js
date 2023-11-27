const knex = require('../../connection')

const buscarProduto = async (id) => {
  const produto = await knex('produtos').where('id', id)
  if (!produto.length) {
    return false
  }
  return produto[0]
}
module.exports = buscarProduto
