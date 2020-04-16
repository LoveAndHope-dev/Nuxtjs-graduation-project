<template>
  <div>
    <Drawer
      :title="changeWorkerFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changeWorkerForm"
        :label-width="80"
      >
        <FormItem label="ID">
          <Input
            v-model="changeWorkerForm.id = connectID"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="姓名">
          <Input
            v-model="changeWorkerForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="邮箱账号">
          <Input
            v-model="changeWorkerForm.email"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="手机号码">
          <Input
            v-model="changeWorkerForm.phonenumber"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="密码">
          <Input
            v-model="changeWorkerForm.password"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <Upload
          v-model="changeWorkerForm.photo"
          multiple
          type="drag"
          action=""
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>上传照骗</p>
          </div>
        </Upload>
        <Divider></Divider>
        <FormItem>
          <Button type="primary">题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Card class="manage_card">
      <Table
        border
        height="700"
        :columns="peopleColumns"
        :data="person"
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
            @click="changeWorker(index)"
          >修改信息</Button>
          <Button
            type="error"
            size="small"
            @click="remove(index)"
          >删除</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import expandRow from './managerexpand';
export default {
  components: {
    expandRow
  },
  props: {
    person: Array
  },
  data () {
    return {
      changeWorkerForm: {

      },
      people: this.person,
      peopleColumns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: 'Id',
          slot: 'id'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '工作日期',
          key: 'workdate'
        },
        {
          title: '工资',
          key: 'wages'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 250,
          align: 'center'
        }
      ],
      value2: false,
      changeWorkerFormTitle: '',
      connectID: ''
    }
  },
  methods: {
    remove (index) {
      this.person.splice(index, 1);
    },
    changeWorker (index) {
      this.value2 = true
      this.changeWorkerFormTitle = `${this.person[index].name}` + '的信息修改'
      this.connectID = this.person[index].id
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>