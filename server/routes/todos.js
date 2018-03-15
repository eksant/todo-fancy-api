const { readTodo, readTodoById, createTodo, updateTodo, updateStatusTodo, deleteTodo } = require('../controllers/todos')
const authorization = require('../middleware/authorization')
const express = require('express')
const router  = express.Router()

router.get('/', authorization, readTodo)
router.get('/:id', authorization, readTodoById)
router.post('/', authorization, createTodo)
router.put('/:id', authorization, updateTodo)
router.put('/changestatus/:id', updateStatusTodo)
router.delete('/:id', authorization, deleteTodo)

module.exports = router;
