const cadastrandoProduto = require('../../database/query/produtos/cadastrandoProduto')
const uploadImagemProduto = require('../../services/cadastrarImagemProduto')

const msg = require('../../utils/msg')

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id} = req.body
  const { file } = req
  
  try {
    const dadosProduto = { descricao, quantidade_estoque, valor, categoria_id }

    if (file) {
       const uploadImagem = await uploadImagemProduto(file)
      
       dadosProduto.produto_imagem = uploadImagem.url
    } 

    const cadastroProduto = await cadastrandoProduto(dadosProduto)

    return res.status(201).json(cadastroProduto[0])
  } catch (error) {
    console.log(error)
    return res.status(500).json(msg('Erro interno do servidor.'))
  }
}

module.exports = cadastrarProduto
