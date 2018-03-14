const Todos = require('../models/todos')

module.exports = {
  readTodo: (req, res) => {
    Todos.find()
    .populate(['UserId'])
    .then(data => {
      res.status(200).json(data) 
    })
    .catch(err => console.error(err))
  },

  readTodoById: (req, res) => {
    Todos.findById(req.params.id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(403).json({ message: 'data not found' })
      }
    })
    .catch(err => console.error(err))
  },

  createTodo: (req, res) => {
    Todos.create({
      UserId  : req.body.UserId,
      content : req.body.content,
      status  : req.body.status
    })
    .then(data => {
      res.status(200).json({
        message : 'success insert record',
        data
      })
    })
    // .catch(err => console.error(err))
    .catch(err => {
      res.status(400).json(err.message)
    })
  },

  updateTodo: (req, res) => {
    Todos.findByIdAndUpdate(req.params.id, {
      content : req.body.content,
      status  : req.body.status
    }, { new: true })
    .then(data => {
      res.status(200).json({
        message : 'success update record',
        data
      })
    })
    .catch(err => console.error(err.message))
  },

  updateStatusTodo: (req, res) => {
    Todos.findById({ '_id': req.params.id })
    .then(todo => {
      let updateStatus = todo.status == 0 ? 1 : 0
      // console.log('updateStatus : ', updateStatus)
      Todos.findByIdAndUpdate({ '_id': req.params.id }, {$set: {
        status  : updateStatus
      }})
      .then(data => {
        res.status(200).json({
          message : 'success update record',
          data
        })
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  },

  deleteTodo: (req, res) => {
    Todos.findByIdAndRemove(req.params.id)
    .then(data => {
      res.status(200).json({
        message: 'success delete record'
      })
    })
    .catch(err => console.error(err))
  }
}