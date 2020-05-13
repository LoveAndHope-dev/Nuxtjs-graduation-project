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
  </Tabs>
</template>
<script>
export default {
  data () {
    return {
      
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
    }
  }
}
</script>

<style scoped>
</style>