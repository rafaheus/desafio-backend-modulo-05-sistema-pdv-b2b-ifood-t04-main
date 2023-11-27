const msg = require("../../utils/msg")

const validarQuantidadeEstoque = async (req, res, next) => {
  const { quantidade_estoque } = req.body

  if (quantidade_estoque <= 0 || isNaN(quantidade_estoque) == true) {
    return res.status(400).json(msg('Quantidade em estoque inválida.'))
  }

  next()
}

module.exports = validarQuantidadeEstoque