const knex = require('../../connection')

const buscarCategoria = (id) => {
  const categoria = knex('categorias').where('id', id).first()
  if (!categoria) {
    return null
  }
  return categoria
}
module.exports = buscarCategoria
