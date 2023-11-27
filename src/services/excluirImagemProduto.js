require('dotenv').config()
const s3 = require('../utils/s3')

const excluirImagemProduto = async (path) => {

    try {
        await s3.deleteObject({
            Bucket: process.env.BUCKET_S3,
            Key: path
        }).promise()
    } catch (error) {
        return new Error(500)
    }
    
  }

  module.exports = excluirImagemProduto