const knex = require('../../connection')

const procuraUsuarioPorId = (id) => {
  const verificarEmail = knex('usuarios').select('*').where('id', id)

  return verificarEmail
}

module.exports = procuraUsuarioPorId
