const msg = require('../../utils/msg')
const criptografarSenha = require('../../utils/criptografarSenha')
const encontrarEmailUsuario = require('../../database/query/usuario/procurandoEmail')
const cadastrandoUsuario = require('../../database/query/usuario/cadastrandoUsuario')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res.status(400).json(msg('Por favor, preencha todos os campos.'))
  }

  try {
    const emailJaCadastrado = await encontrarEmailUsuario(email)

    if (emailJaCadastrado.length > 0) {
      return res
        .status(400)
        .json(msg('Já existe usuário cadastrado com o e-mail informado.'))
    }
    const senhaCriptografada = await criptografarSenha(senha)

    const novosDados = { nome, email, senhaCriptografada }

    const cadastrosFeito = await cadastrandoUsuario(novosDados)

    const cadastroFeito = cadastrosFeito[0]
    delete cadastroFeito.senha

    return res.status(201).json(cadastroFeito)
  } catch (error) {
    return res.status(500).json(msg('Erro interno do servidor.'))
  }
}
module.exports = cadastrarUsuario
