<template>
  <div>
    <div class="wrapper wrapper-content  animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox">
            <div class="ibox-content">
              <h3 :id="labelTodo">{{labelTodo}}</h3>
              <p class="small">Welcome, {{name}},<br/> Please fill your description about your todo..</p>
              <div class="input-group">
                <input v-model="content" placeholder="Add new todo.." class="input input-sm form-control" type="text">
                <span class="input-group-btn">
                  <button @click="createTodo" v-if="!isEdit" type="button" class="btn btn-sm btn-white"><i class="fa fa-plus"></i> Add todo</button>
                  <button @click="updateTodo(todoId)" v-if="isEdit" type="button" class="btn btn-sm btn-white"><i class="fa fa-edit"></i> Edit todo</button>
                  <button @click="getTodo()" type="button" class="btn btn-sm btn-white"><i class="fa fa-recycle"></i> Refresh</button>
                </span>
              </div>
              <div class="small">Click on the content todo or label status for change status..</div>
              <ul class="sortable-list connectList agile-list ui-sortable">
                <li :class="(todo.status == 0 ? 'info' : 'warning')+'-element'" v-for="(todo,id) of todos" :key="id">
                  <span @click="changeStatus(todo._id)">{{todo.content}}</span>
                  <div class="agile-detail">
                    <button @click="deleteTodo(todo._id)" type="button" class="pull-right btn btn-xs btn-danger"><i class="fa fa-trash"></i> Delete</button>
                    <button @click="getEditTodo(todo._id)" type="button" class="pull-right btn btn-xs btn-success"><i class="fa fa-edit"></i> Edit</button>
                    <i class="fa fa-clock-o"></i> {{moment(todo.createdAt).format('dddd, DD MMM YYYY')}}
                    <span v-if="todo.status == 0" @click="changeStatus(todo._id)"><i class="fa fa-star-half"></i> Status <strong class="text-success">Open</strong></span>
                    <span v-if="todo.status == 1" @click="changeStatus(todo._id)"><i class="fa fa-star"></i> Status <strong class="text-danger">Closed</strong></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert'
let url = 'http://seorangeksa.com:3000/api'
var LOCAL_DOMAINS = ['localhost', '127.0.0.1']
if (LOCAL_DOMAINS.includes(window.location.hostname)) {
  url = 'http://localhost:3000/api'
}

export default {
  name: 'Todo',
  data () {
    return {
      name: localStorage.getItem('name') || null,
      moment: moment,
      isEdit: false,
      labelTodo: 'Add Your Todo',
      todoId: '',
      content: '',
      todos: []
    }
  },
  created () {
    this.getTodo()
  },
  methods: {
    getTodo () {
      this.isEdit = false
      this.labelTodo = 'Add Your Todo'
      this.todoId = ''
      this.content = ''
      axios.get(`${url}/todos`, {
        headers: {
          apptoken: localStorage.getItem('token')
        }
      }).then(response => {
        // console.log(response.data)
        this.todos = response.data
      }).catch(e => {
        console.error(e)
      })
    },
    getEditTodo (id) {
      axios.get(`${url}/todos/${id}`, {
        headers: {
          apptoken: localStorage.getItem('token')
        }
      }).then(response => {
        this.isEdit = true
        this.labelTodo = 'Edit Your Todo'
        this.todoId = response.data._id
        this.content = response.data.content
      }).catch(e => {
        console.error(e)
      })
    },
    createTodo () {
      axios.post(`${url}/todos`, {
        content: this.content,
        status: 0
      }, {
        headers: {
          apptoken: localStorage.getItem('token')
        }
      }).then(response => {
        this.getTodo()
      }).catch(e => {
        console.error(e)
      })
    },
    updateTodo (id) {
      axios.put(`${url}/todos/${id}`, {
        content: this.content,
        status: 0
      }, {
        headers: {
          apptoken: localStorage.getItem('token')
        }
      }).then(response => {
        swal('Yooi, Your todo has been updated !', { icon: 'success' })
        this.getTodo()
      }).catch(e => {
        console.error(e)
      })
    },
    changeStatus (id) {
      axios.put(`${url}/todos/changestatus/${id}`, {
        headers: {
          apptoken: localStorage.getItem('token')
        }
      }).then(response => {
        swal('Yooi, Your todo has been change status !', { icon: 'success' })
        this.getTodo()
        // console.log('process')
      }).catch(e => {
        console.log(e)
      })
    },
    deleteTodo (id) {
      swal({
        title: 'Confirmation',
        text: 'Are you sure to delete todo ?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(action => {
        if (action) {
          axios.delete(`${url}/todos/${id}`, {
            headers: {
              apptoken: localStorage.getItem('token')
            }
          }).then(response => {
            swal('Yooi, Your todo has been deleted !', { icon: 'success' })
            this.getTodo()
          }).catch(e => {
            console.log(e)
          })
        }
      })
    }
  }
}
</script>
