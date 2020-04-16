<template>
  <div>
    <card>
      <Table
        border
        height="500"
        :columns="articleColumns"
        :data="article"
      >
        <template
          slot-scope="{ row }"
          slot="id"
        >
          <strong>{{ row.id }}</strong>
        </template>
        <template
          slot-scope="{ row, index }"
          slot="action"
        >
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="show(index)"
          >View</Button>
          <Button
            type="error"
            size="small"
            @click="remove(index)"
          >Delete</Button>
        </template>
      </Table>
    </card>
  </div>
</template>

<script>
export default {

  data () {
    return {
      articleColumns: [
        {
          title: '文章名称',
          slot: 'name'
        },
        {
          title: '文章日期',
          key: 'date'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      content: ' ',
      article: [
        
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '文章详情',
        content: `Name：${this.persons[index].name}<br>Age：${this.persons[index].age}<br>Address：${this.persons[index].address}`
      })
    },
    remove (index) {
      this.staff.splice(index, 1);
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>