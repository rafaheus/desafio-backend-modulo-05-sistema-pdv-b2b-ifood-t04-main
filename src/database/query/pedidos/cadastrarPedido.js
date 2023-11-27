const knex = require('../../connection')

const cadastrandoPedido = async (dadosPedido) => {
  const { cliente_id, observacao, valorFinal } = dadosPedido

  const queryCadastroPedido = await knex('pedidos')
    .insert({
      cliente_id,
      observacao,
      valor_total: valorFinal,
    })
    .returning('*')

  return queryCadastroPedido
}

module.exports = cadastrandoPedido
