const msg = require('../../utils/msg')

const validarCamposPedido = (req, res, next) => {
  const { cliente_id, pedido_produtos } = req.body

  if (!cliente_id || !pedido_produtos) {
    return res.status(400).json(msg('Por favor, preencha todos os campos.'))
  }

  return next()
}

module.exports = validarCamposPedido
