const detalharUsuario = async (req, res) => {
  const usuario = req.usuario

  delete usuario.senha

  return res.status(201).json(usuario)
}

module.exports = detalharUsuario
