const knex = require('../../connection')

const encontrarEmailUsuario = (email) => {
  const verificarEmail = knex('usuarios').select('*').where('email', email)

  return verificarEmail
}
module.exports = encontrarEmailUsuario
