const router = require('koa-router')()
const {productList,createNewProduct,getProduct,upateProduct} = require('../controller/products')

router.prefix('/api/products')

router.get('/list/:target',productList)

router.get('/:target/:id',getProduct)

router.post('/create/:target',createNewProduct)

router.patch('/:target/:id',upateProduct)




module.exports = router
