const express = require('express')
const autenticador = require('../middleware/autenticador')
const cadastrarProduto = require('../controllers/produtos/cadastrarProduto')
const cadastrarCliente = require('../controllers/clientes/cadastrarClientes')
const listarProduto = require('../controllers/produtos/listarProdutos')
const exculirProdutoDeUsuarioLogado = require('../controllers/produtos/excluirProduto')
const listarCategoria = require('../controllers/usuario/listarCategoria')
const cadastrarUsuario = require('../controllers/usuario/cadastrarUsuario')
const logarUsuario = require('../controllers/usuario/logarUsuario')
const editarUsuario = require('../controllers/usuario/editarUsuario')
const detalharUsuario = require('../controllers/usuario/detalharUsuario')
const listarClientes = require('../controllers/clientes/listarClientes')
const verificarCamposClientes = require('../middleware/clientes/verificarCamposObrigatorios')
const verificarEmail = require('../middleware/clientes/verificarEmailCliente')
const verificarCpfUnico = require('../middleware/clientes/verificarCpfCliente')
const atualizarCliente = require('../controllers/clientes/atualizarCliente')

const detalharCliente = require('../controllers/clientes/detalharCliente')
const detalharProduto = require('../controllers/produtos/detalharProduto')
const editarProduto = require('../controllers/produtos/editarProduto')
const verificarIdCliente = require('../middleware/clientes/verificarIdClienteExiste')
const validarQuantidadeEstoque = require('../middleware/produtos/validarQuantidade')
const validarValor = require('../middleware/produtos/validarValor')
const validarCategoria = require('../middleware/produtos/validarCategoria')
const validarDadosProduto = require('../middleware/produtos/validarDadosProduto')
const validarIdProduto = require('../middleware/produtos/validarIdProduto')
const multer = require('../middleware/multer')
const cadastrarPedido = require('../controllers/pedidos/cadastrarPedido')
const verificacaoPedido = require('../middleware/pedidos/verificacaoDeVetores')
const buscandoIdCliente = require('../middleware/pedidos/verificarIdCliente')
const validarCamposPedido = require('../middleware/pedidos/validarCamposPedido')
const listarPedidos = require('../controllers/pedidos/listarPedidos')

const router = express.Router()

router.get('/', (req, res) => {
  return res.send({ res: 'ok' })
})

router.get('/categoria', listarCategoria)
router.post('/usuario', cadastrarUsuario)
router.post('/login', logarUsuario)

router.use(autenticador)

router.put('/usuario', editarUsuario)
router.get('/usuario', detalharUsuario)

router.get('/cliente', listarClientes)
router.post(
  '/cliente',
  verificarCamposClientes,
  verificarEmail,
  verificarCpfUnico,
  cadastrarCliente
)
router.put(
  '/cliente/:id',
  verificarCamposClientes,
  verificarIdCliente,
  verificarEmail,
  verificarCpfUnico,
  atualizarCliente
)
router.get('/cliente/:id', verificarIdCliente, detalharCliente)

router.get('/produto', listarProduto)
router.get('/produto/:id', detalharProduto)
router.post(
  '/produto',
  multer.single('produto_imagem'),
  validarDadosProduto,
  validarQuantidadeEstoque,
  validarValor,
  validarCategoria,
  cadastrarProduto
)
router.put(
  '/produto/:id',
  multer.single('produto_imagem'),
  validarDadosProduto,
  validarIdProduto,
  validarQuantidadeEstoque,
  validarValor,
  validarCategoria,
  editarProduto
)
router.post(
  '/pedido',
  validarCamposPedido,
  verificacaoPedido,
  buscandoIdCliente,
  cadastrarPedido
)

router.get('/pedido', listarPedidos)

router.delete('/produto/:id', exculirProdutoDeUsuarioLogado)

module.exports = router
