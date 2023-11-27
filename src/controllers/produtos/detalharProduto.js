const msg = require('../../utils/msg')
const buscarProduto = require('../../database/query/produtos/procurarProduto')

const detalharProduto = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json(msg("O produto não foi informado."))
    }

    try {
        const produtoEncontrado = await buscarProduto(id)

        if (!produtoEncontrado) {
            return res.status(404).json(msg("O Produto não foi encontrado"))
        }

        return res.status(200).json(produtoEncontrado)
    } catch (error) {
        return res.status(500).json(msg("Erro interno do servidor."))
    }
}

module.exports = detalharProduto