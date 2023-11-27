const knex = require('../../connection')

const buscarPedidosPorClienteId = async (id) => {
    const produtos = await knex('pedidos').where('cliente_id', id)
    if (!produtos) {
        return false
    }
    return produtos
}
const buscarPedidos = async () => {
    const produtos = await knex('pedidos')
    if (!produtos) {
        return false
    }
    return produtos
}

module.exports = {
    buscarPedidosPorClienteId,
    buscarPedidos
}