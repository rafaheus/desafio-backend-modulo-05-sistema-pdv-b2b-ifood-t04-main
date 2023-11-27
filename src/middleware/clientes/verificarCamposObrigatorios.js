const msg = require('../../utils/msg')

const verificarCamposClientes = (req, res, next) => {
  const { nome, email, cpf } = req.body

  if (!nome || !email || !cpf) {
    return res
      .status(400)
      .json(
        msg(`Campos obrigatórios 'nome', 'email' e/ou 'cpf' não preenchidos`)
      )
  }

  return next()
}

module.exports = verificarCamposClientes
