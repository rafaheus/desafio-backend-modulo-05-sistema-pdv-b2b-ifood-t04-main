require('dotenv').config()
const jwt = require('jsonwebtoken')
const senhaJWT = process.env.JWT_PWD
const msg = require('../utils/msg')
const procuraUsuarioPorId = require('../database/query/usuario/procuraUsuarioPorId')

const autenticador = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res
      .status(401)
      .json(
        msg(
          'Para acessar este recurso um token de autenticação válido deve ser enviado.'
        )
      )
  }
  const token = authorization.split(' ')[1]
  try {
    const { id } = jwt.verify(token, senhaJWT)
    const usuario = await procuraUsuarioPorId(id)

    if (!usuario) {
      return res
        .status(401)
        .json(
          msg(
            'Para acessar este recurso um token de autenticação válido deve ser enviado.'
          )
        )
    }

    delete usuario[0].senha

    req.usuario = usuario[0]

    next()
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res
        .status(401)
        .json(
          msg(
            'Para acessar este recurso um token de autenticação válido deve ser enviado.'
          )
        )
    }
    return res.status(500).json(msg('Erro interno do servidor'))
  }
}

module.exports = autenticador
