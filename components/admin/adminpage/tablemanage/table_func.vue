<template>
  <Tabs>
    <TabPane label="添加桌位">
      <Form
        :model="tableForm"
        :label-width="80"
      >
        <FormItem label="桌位名称">
          <Input
            v-model="tableForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="桌位人数">
          <Input
            v-model="tableForm.people"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <Divider></Divider>
        <FormItem>
          <Button
            type="primary"
            @click="addtable()"
          >创建</Button>
        </FormItem>
      </Form>
    </TabPane>
    <TabPane label="查询桌位">
      <Input
        v-model="searchtableForm.name"
        search
        enter-button
        @on-search="searchTableSubmit"
        placeholder="输入您的查询桌位"
        style="margin:20px 0"
      />
    </TabPane>
  </Tabs>
</template>
<script>
export default {
  data () {
    return {
      searchtableForm: {
        name: ''
      },
      tableForm: {
        id: ''
      }
    }
  },
  methods: {
    async addtable () {
      let formData = new FormData()
      formData.append('tablename', this.tableForm.name)
      formData.append('tablepeople', this.tableForm.people)
      formData.append('tablecondition', '可用')
      this.$emit('addTableSubmit', formData)
    },
    searchTableSubmit: async function () {
      let self = this
      let formData = new FormData()
      formData.append('tablename', self.searchtableForm.name)
      this.$emit('searchTableSubmit', formData)
    }
  }
}
</script>

<style scoped>
</style>