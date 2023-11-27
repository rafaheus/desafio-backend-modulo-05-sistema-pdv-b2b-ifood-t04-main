const knex = require('../../connection')

const cadastrandoUsuario = (novosDados) => {
  const { nome, email, senhaCriptografada } = novosDados

  const queryCadastroDoUsuario = knex('usuarios')
    .insert({
      nome,
      email,
      senha: senhaCriptografada,
    })
    .returning('*')

  return queryCadastroDoUsuario
}
module.exports = cadastrandoUsuario
