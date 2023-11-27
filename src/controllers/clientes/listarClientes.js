const listagemClientes = require("../../database/query/clientes/listagemClientes");
const msg = require("../../utils/msg");

const listarClientes = async (req, res) => {
    try {
        const clientes = await listagemClientes()
        return res.status(200).json(clientes)

    } catch (error) {
        return res.status(500).json(msg('Erro interno no servidor'))
    }
};

module.exports = listarClientes