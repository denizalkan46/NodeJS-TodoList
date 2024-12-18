const express = require('express');
const { addTodo, getTodos, updateTodoStatus, deleteTodo } = require('../controllers/todoController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addTodo);
router.get('/', authMiddleware, getTodos);
router.put('/:id', authMiddleware, updateTodoStatus); // Güncelleme rotası
router.delete('/:id', authMiddleware, deleteTodo); // Silme rotası

module.exports = router;
