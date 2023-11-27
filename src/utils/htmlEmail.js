const fs = require('fs/promises')
const handlebars = require('handlebars')
const Mailjet = require('node-mailjet')

const htmlEmail = async (dadosMailjet) => {
  const { clienteId, dadosHtml } = dadosMailjet

  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {},
    }
  )

  const arquivo = await fs.readFile('./src/templates/email.html')

  const compilador = handlebars.compile(arquivo.toString())

  const html = compilador({
    cliente: clienteId.nome,
    dadosHtml,
  })

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'anonymousedevs@gmail.com',
          Name: 'Ratos',
        },
        To: [
          {
            Email: `${clienteId.email}`,
            Name: `${clienteId.nome}`,
          },
        ],
        Subject: 'Pedido Registrado!',
        TextPart: 'Seu pedido foi registrado com sucesso.',
        HTMLPart: html,
      },
    ],
  })

  await request
}

module.exports = { htmlEmail }
