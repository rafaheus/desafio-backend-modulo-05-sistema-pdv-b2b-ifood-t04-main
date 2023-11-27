const knex = require('../../connection')

const listagemClientes = () => {
    const clientes = knex('clientes').select('*')
    return clientes
}

module.exports = listagemClientes