const msg = require('../../utils/msg')
const editandoProduto = require('../../database/query/produtos/editandoProduto')
const uploadImagemProduto = require('../../services/cadastrarImagemProduto')

const editarProduto = async (req, res) => {
  const { id } = req.params
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body
  const { file } = req
  try {
    const dadosProduto = {
      id,
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    }
    if (file) {
      const uploadImagem = await uploadImagemProduto(file)
  
      dadosProduto.produto_imagem = uploadImagem.url
    }
    const produtoEditado = await editandoProduto(dadosProduto)

    if (!produtoEditado) {
      return res.status(404).json(msg('Falha ao tentar editar produto.'))
    }

    return res.status(200).json(produtoEditado)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = editarProduto
