const router = require('express').Router();

//prefijo de api
router.use('/api', require('./userRouters'));

module.exports = router; 