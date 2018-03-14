const { readTodo, readTodoById, createTodo, updateTodo, updateStatusTodo, deleteTodo } = require('../controllers/todos')
const express = require('express')
const router  = express.Router()

router.get('/', readTodo)
router.get('/:id', readTodoById)
router.post('/', createTodo)
router.put('/:id', updateTodo)
router.put('/changestatus/:id', updateStatusTodo)
router.delete('/:id', deleteTodo)

module.exports = router;
