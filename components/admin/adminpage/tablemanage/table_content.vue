<template>
  <div>
    <Drawer
      :title="changetableFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changetableForm"
        :label-width="80"
        :rules="tableruleValidate"
        ref="tableValidate"
      >
        <FormItem label="ID">
          <Input
            v-model="changetableForm.id"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="桌位名" prop="name">
          <Input
            v-model="changetableForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="桌位人数" prop="people">
          <Input
            v-model="changetableForm.people"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="桌位状态" prop="condition">
          <Select v-model="changetableForm.condition">
            <Option value="可用">可用</Option>
            <Option value="封锁">封锁</Option>
            <Option
              disabled
              value="已满"
            >已满</Option>
          </Select>
        </FormItem>
        <Divider></Divider>
        <FormItem>
          <Button
            type="primary"
            @click="changetableSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Tabs>
      <TabPane label="查询桌位">
        <Input
          v-model="searchtableForm.name"
          search
          enter-button
          @on-search="searchTableSubmit"
          placeholder="输入您的查询桌位"
          style="margin:20px 0"
        />
        <Table
          border
          height="720"
          :columns="tableColumns"
          :data="tables"
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
              @click="changeForm(index)"
            >View</Button>
            <Button
              type="error"
              size="small"
              @click="remove(index)"
            >Delete</Button>
          </template>
        </Table>
        <Button
          :disabled="!ismore"
          long
          @click="loadMore"
        >———— 加载更多 ————
        </Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import rules from '../rules'
import axios from 'axios'
export default {
  mixins: [rules],
  props: {
    tables: Array,
    ismore: Boolean
  },
  data () {
    return {
      searchtableForm: {
        name: ''
      },
      tableColumns: [
        {
          title: '桌位名',
          key: 'name'
        },
        {
          title: '状态',
          key: 'condition'
        },
        {
          title: '人数',
          key: 'people'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      value2: false,
      changetableFormTitle: '',
      changetableForm: {
        name: '',
        people: null,
        condition: ''
      },
      pageSize: 15,
      page: 1
    }
  },
  methods: {
    loadMore () {
      this.$emit('getTableLists', { page: ++this.page, loadMore: true, word: this.searchtableForm.name });
    },
    searchTableSubmit () {
      this.page = 1
      this.$emit('getTableLists', { word: this.searchtableForm.name })
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.tables[index].id)
      let { status, data: { code, msg, removeID } } = await this.$axios.post(`/manager/table_manage/removeTable`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.tables.splice(index, 1);
        this.$Message.success('删除成功')
      }
    },
    changeForm (index) {
      this.value2 = true
      this.changetableFormTitle = `${this.tables[index].name}` + '的信息修改'
      this.changetableForm.id = this.tables[index].id
      this.changetableForm.name = this.tables[index].name
      this.changetableForm.condition = this.tables[index].condition
      this.changetableForm.people = this.tables[index].people
    },
    changetableSubmit: async function () {
      let formData = new FormData()
      formData.append('tableid', this.changetableForm.id)
      formData.append('tablename', this.changetableForm.name)
      formData.append('tablecondition', this.changetableForm.condition)
      formData.append('tablepeople', this.changetableForm.people)
      let { status, data: { code, msg, table } } = await this.$axios.post(`/manager/table_manage/changeTable`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        const i = this.tables.findIndex(x => x.id === table.id)
        if (i !== -1) {
          this.tables.splice(i, 1, table)
        }
        this.$Message.success('修改成功')
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>