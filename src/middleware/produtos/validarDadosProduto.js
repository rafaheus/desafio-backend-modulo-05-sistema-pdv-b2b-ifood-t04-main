const msg = require("../../utils/msg")

const validarDadosProduto = async (req, res, next) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(400).json(msg('Por favor, preencha todos os campos.'))
  }

  next()
}

module.exports = validarDadosProduto