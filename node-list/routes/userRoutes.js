const express = require('express');
const { listUsers } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, listUsers);

module.exports = router;
