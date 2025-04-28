const router = require('express').Router();

//grupo de endpoints de usuario
router.use('/usuarios', require('../controllers/userController'));

module.exports = router; 