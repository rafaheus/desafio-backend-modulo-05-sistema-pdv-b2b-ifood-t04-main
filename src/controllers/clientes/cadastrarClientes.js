const buscarClientePorId = require('../../database/query/clientes/buscarClientePorId')
const cadastrarClienteValidado = require('../../database/query/clientes/cadastrarCliente')

const msg = require('../../utils/msg')

const cadastrarCliente = async (req, res) => {
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

  const cadastrarNovoCliente = await cadastrarClienteValidado(cadastro)

  if (!cadastrarNovoCliente) {
    return res.status(500).json(msg('Error interno do Servidor'))
  }

  const cliente = await buscarClientePorId(cadastrarNovoCliente)

  if (!cliente) {
    return res.status(500).json(msg('Error interno do Servidor'))
  }

  return res.status(201).json(cliente)
}

module.exports = cadastrarCliente
