const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJWT = process.env.JWT_PWD
const msg = require('../../utils/msg')
const encontrarEmailUsuario = require('../../database/query/usuario/procurandoEmail')

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json(msg('Email é um campo obrigatório'))
  }
  try {
    const usuario = await encontrarEmailUsuario(email)

    if (!usuario.length) {
      return res.status(404).json(msg('Email ou senha invalida'))
    }

    const senhaValida = await bcrypt.compare(senha, usuario[0].senha)

    if (!senhaValida) {
      return res.status(400).json(msg('Email ou senha invalida'))
    }

    const token = jwt.sign({ id: usuario[0].id }, senhaJWT, {
      expiresIn: '8h',
    })

    delete usuario[0].senha

    return res.status(201).json({ usuario: usuario[0], token })
  } catch (error) {
    return res.status(500).json(msg('Erro interno do servidor'))
  }
}

module.exports = logarUsuario
