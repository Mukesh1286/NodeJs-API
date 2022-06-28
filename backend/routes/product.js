const express = require('express')
const router = express.Router();


const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    DeleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} =require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), DeleteProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'),  newProduct);


router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)


module.exports= router