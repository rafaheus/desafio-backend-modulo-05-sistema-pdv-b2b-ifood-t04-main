const knex = require('../../connection')

const atualizarUsuario = (novosDados) => {
  const { nome, email, senhaCriptografada, idUsuario } = novosDados

  const queryAtualizarUsuario = knex('usuarios')
    .update({ nome, email, senha: senhaCriptografada })
    .where({ id: idUsuario })

  return queryAtualizarUsuario
}
module.exports = atualizarUsuario
