const atualizarDadosCliente = require('../../database/query/clientes/atualizarDadosClientes')

const atualizarCliente = async (req, res) => {
  const { id } = req.params

  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body

  const cadastro = {
    nome,
    email,
    cpf,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
  }

  const cliente = await atualizarDadosCliente(id, cadastro)

  return res.json(cliente)
}

module.exports = atualizarCliente
