const knex = require('../../database/connection')
const msg = require('../../utils/msg')

const listarCategoria = async (req, res) => {
  try {
    const categorias = await knex('categorias')
    return res.json(categorias)
  } catch (error) {
    return res.json(msg('Erro de credenciais.'))
  }
}
module.exports = listarCategoria
