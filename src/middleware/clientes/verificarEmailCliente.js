const buscarClientePorEmail = require('../../database/query/clientes/buscarClientePorEmail')
const buscarClientePorId = require('../../database/query/clientes/buscarClientePorId')
const msg = require('../../utils/msg')

const verificarEmail = async (req, res, next) => {
  const { email: emailCliente } = req.body
  const { id: idCliente } = req.params
  const emailDB = await buscarClientePorEmail(emailCliente)

  if (idCliente !== undefined) {
    const { email: emailClienteId } = await buscarClientePorId(idCliente)
    
    if (emailCliente !== emailClienteId) {
      if (emailDB) {
        return res.status(400).json(msg('E-mail já cadastrado'))
      }
    }
  } else if (emailDB) {
    return res.status(400).json(msg('E-mail já cadastrado'))
  }

  return next()
}

module.exports = verificarEmail
