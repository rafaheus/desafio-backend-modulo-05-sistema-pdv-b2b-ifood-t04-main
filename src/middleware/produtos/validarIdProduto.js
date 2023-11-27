const buscarProduto = require("../../database/query/produtos/procurarProduto")
const msg = require("../../utils/msg")

const validarIdProduto = async (req, res, next) => {
  const id = req.params.id

  try {
    const produto = await buscarProduto(id)

    if (!produto) {
      return res.status(404).json(msg('Produto não encontrado.'))
    }

    next()
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = validarIdProduto
