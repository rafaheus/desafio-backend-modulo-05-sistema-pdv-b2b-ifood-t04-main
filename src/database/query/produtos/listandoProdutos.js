const knex = require('../../connection')

const listandoProdutosPorCategoria = (categoriaId) => {
  const produtos = knex('produtos')
    .where('categoria_id', categoriaId)
    .select('*')
  return produtos
}
const listandoTodosProdutos = () => {
  const produtos = knex('produtos').select('*')
  return produtos
}
module.exports = {
  listandoProdutosPorCategoria,
  listandoTodosProdutos
}
