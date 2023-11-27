const msg = require('../../utils/msg')
const criptografarSenha = require('../../utils/criptografarSenha')
const encontrarEmailUsuario = require('../../database/query/usuario/procurandoEmail')
const atualizarUsuario = require('../../database/query/usuario/atualizandoUsuario')

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res.status(400).json(msg('Por favor, preencha todos os campos.'))
  }
  const idUsuario = req.usuario.id

  try {
    const emailJaCadastrado = await encontrarEmailUsuario(email)

    if (emailJaCadastrado.length > 0 && idUsuario != emailJaCadastrado[0].id) {
      return res.status(400).json(msg('este e-mail já está sendo utilizado'))
    }

    const senhaCriptografada = await criptografarSenha(senha)

    const novosDados = { nome, email, senhaCriptografada, idUsuario }

    await atualizarUsuario(novosDados)

    return res.status(201).send()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
  }
}

module.exports = editarUsuario
