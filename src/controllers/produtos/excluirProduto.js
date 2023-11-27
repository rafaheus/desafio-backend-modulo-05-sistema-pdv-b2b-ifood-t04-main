const buscarProdutoNoPedido = require('../../database/query/produtos/buscarProdutoNoPedido')
const deletandoProduto = require('../../database/query/produtos/deletandoProduto')
const excluirImagemProduto = require('../../services/excluirImagemProduto')
const buscarProduto = require('../../database/query/produtos/procurarProduto')
const msg = require('../../utils/msg')

const exculirProdutoDeUsuarioLogado = async (req, res) => {
  const { id } = req.params

  try {
    const produtoEncontrado = await buscarProduto(id)
    if (!produtoEncontrado) {
      return res.status(404).json(msg('Produto não encontrado nos registros'))
    }

    const produtoEncontradoNoPedido = await buscarProdutoNoPedido(id)
    if (produtoEncontradoNoPedido){
      return res.status(403).json(msg('Não é possível apagar um produto registrado em um pedido.'))
    }

    const path = produtoEncontrado.produto_imagem.split(".com")[1]
    await deletandoProduto(id)
    await excluirImagemProduto(path)

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json(msg('Erro interno do servidor'))
  }
}

module.exports = exculirProdutoDeUsuarioLogado
