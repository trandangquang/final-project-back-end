const ProductService = require('../services/ProductService')

const createProduct = async(req, res) => {
try {
  const {name, image, type, price, countInStock, description} = req.body
  if (!name || !image || !type || !price || !countInStock) {
    return res.status(200).json({
      status: 'ERROR',
      message: 'The input is required'
    })
  }
  const response = await ProductService.createProduct(req.body)
  return res.status(200).json(response)
} catch (e) {
  return res.status(404).json({
    message: e
  })
}
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const data = req.body
    if(!productId){
      return res.status(200).json({
        status: 'ERROR',
        message: 'The productId is required'
      })
    }
    const response = await ProductService.updateProduct(productId,data)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
}

const getDetailsProduct = async(req, res) => {
  try {
    const productId = req.params.id
    if(!productId) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The productId is required'
      })
    }
    const response = await ProductService.getDetailsProduct(productId)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      message: e
    })
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
};