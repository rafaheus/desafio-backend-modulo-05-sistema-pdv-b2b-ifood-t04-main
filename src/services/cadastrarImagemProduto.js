require('dotenv').config();

const s3 = require("../utils/s3")

const uploadImagemProduto = async  (file) => {
  
  try {
    const imagemProduto = await s3.upload({
      Bucket: process.env.BUCKET_S3,
      Key: `produtos/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.minetype
    }).promise()

    return {
      url: imagemProduto.Location,
      path: imagemProduto.Key
    }

  } catch (error) {
    return new Error(500)
  }
}

module.exports = uploadImagemProduto