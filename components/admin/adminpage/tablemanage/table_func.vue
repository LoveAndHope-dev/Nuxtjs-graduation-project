<template>
  <Tabs>
    <TabPane label="添加桌位">
      <Form
        :model="tableForm"
        :label-width="80"
        :rules="ruleValidate"
        ref="tableValidate"
      >
        <FormItem
          label="桌位名称"
          prop="name"
        >
          <Input
            v-model="tableForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="桌位人数"
          prop="people"
        >
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
      },
      ruleValidate: {
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        people: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ]
      }
    }
  },
  methods: {
    async addtable () {
      this.$refs.tableValidate.validate(async valid => {
        if (!valid) {
          this.$Message.error('请仔细检查')
        } else {
          let formData = new FormData()
          formData.append('tablename', this.tableForm.name)
          formData.append('tablepeople', this.tableForm.people)
          formData.append('tablecondition', '可用')
          this.$emit('addTableSubmit', formData)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>