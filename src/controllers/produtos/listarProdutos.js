const {
  listandoTodosProdutos,
} = require('../../database/query/produtos/listandoProdutos')
const msg = require('../../utils/msg')

const listarProduto = async (req, res) => {
  try {
    
    let produtos = await listandoTodosProdutos()

    return res.status(200).json(produtos)
  } catch (error) {
    return res.status(500).json(msg('Erro interno do servidor.'))
  }
}

module.exports = listarProduto
