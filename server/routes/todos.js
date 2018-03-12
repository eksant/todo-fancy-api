const { readTodo, readTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todos')
const express = require('express')
const router  = express.Router()

router.get('/', readTodo)
router.get('/:id', readTodoById)
router.post('/', createTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

module.exports = router;
