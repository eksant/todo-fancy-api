<template>
  <q-page padding class="docs-input justify-center" style="padding-top: 5px;">
    <div class="row bg-grey-9" style="padding: 10px">
      <div class="col-9">
        <q-field faded icon="fas fa-tasks">
          <q-input v-model="form.content" float-label="Add Your Todo:" />
        </q-field>
      </div>
      <div class="col-3">
        <q-btn color="secondary" @click="submit" label="Save" />
      </div>
    </div>

    <q-table title="List Your Todo" color dense :data="tableData" :columns="columns" row-key="date" />
  </q-page>
</template>

<script>
import { required, content } from 'vuelidate/lib/validators'
let urlApi = 'http://localhost:3000/api/todos'

export default {
  name: 'PageTodo',
  data () {
    return {
      form: {
        content: ''
      },
      tableData: [],
      columns: [
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: 'createdAt',
          sortable: true
        },
        {
          name: 'content',
          required: true,
          label: 'Your Todo',
          align: 'left',
          field: 'content',
          sortable: true
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'status',
          sortable: true
        },
        {
          name: 'user',
          required: true,
          label: 'User',
          align: 'left',
          field: 'user',
          sortable: true
        },
        {
          name: 'action',
          required: false,
          label: 'Actions',
          align: 'left',
          field: 'action',
          sortable: false
        }
      ]
    }
  },
  created () {
    this.getTodo()
  },
  validations: {
    form: {
      content: { required, content }
    }
  },
  methods: {
    getTodo () {
      this.$axios.get(`${urlApi}`).then(data => {
        // console.log('data todo : ', data)
        this.tableData = data.data
      }).catch(err => {
        console.error(err)
      })
    },
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please review fields again.')
        // return
      }
    }
  }
}
</script>

<style>
</style>
