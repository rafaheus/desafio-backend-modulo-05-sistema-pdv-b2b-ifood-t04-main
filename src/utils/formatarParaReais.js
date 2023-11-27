const brl = (valueCents) => {
  const valueBRL = (valueCents / 100).toFixed(2).replace('.', ',')
  return `R$ ${valueBRL}`
}

module.exports = brl
