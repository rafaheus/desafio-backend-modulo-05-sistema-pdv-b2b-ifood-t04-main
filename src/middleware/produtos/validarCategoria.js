const buscarCategoria = require("../../database/query/usuario/procurarCategoria")
const msg = require("../../utils/msg")

const validarCategoria = async (req, res, next) => {
  const { categoria_id } = req.body

  try {
    const categoriaEncontrada = await buscarCategoria(categoria_id)

    if (!categoriaEncontrada) {
      return res.status(404).json(msg('A Categoria informada não existe'))
    }

    next()
  } catch (error) {
    return next(error)
  }
}

module.exports = validarCategoria