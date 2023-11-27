const msg = require("../../utils/msg")

const validarValor = async (req, res, next) => {
  const { valor } = req.body

  if (valor <= 0 || isNaN(valor) == true) {
    return res.status(400).json(msg('Por favor insira um valor válido.'))
  }

  next()
}

module.exports = validarValor