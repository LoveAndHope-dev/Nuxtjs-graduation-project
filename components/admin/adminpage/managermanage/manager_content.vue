<template>
  <div>
    <Drawer
      :title="changeadminFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changeadminForm"
        :label-width="80"
      >
        <FormItem label="ID">
          <Input
            v-model="changeadminForm.id"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="姓名">
          <Input
            v-model="changeadminForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="邮箱账号">
          <Input
            v-model="changeadminForm.email"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="手机号码">
          <Input
            v-model="changeadminForm.phonenumber"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="工资">
          <Input
            v-model="changeadminForm.wages"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="密码">
          <Input
            v-model="changeadminForm.password"
            placeholder="不填默认密码：123456789"
          ></Input>
        </FormItem>
        <FormItem label="照骗">
          <Upload
            :before-upload="before"
            v-model="changeadminForm.photo"
            action=""
          >
            <Avatar
              shape="square"
              style="width: 180px; height: 252px"
              :src="fileSrc"
            >
              <Icon
                type="ios-cloud-upload"
                size="100"
                style="color: #fff; padding: 40px 0"
              ></Icon>
              <h3>点击此处上传图片</h3>
            </Avatar>
          </Upload>
          <Button
            icon="ios-close"
            @click="deletepic()"
          >删除</Button>
        </FormItem>
        <Divider></Divider>
        <FormItem>
          <Button
            type="primary"
            @click="changeadminSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Card class="manage_card">
      <Tabs>
        <TabPane label="查询管理员">
          <Form
            :model="searchadminForm"
            :label-width="80"
          >
            <Row>
              <Col span="12">
              <FormItem label="手机号">
                <Input
                  v-model="searchadminForm.inputphonenumber"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col
                offset="2"
                span="10"
              >
              <FormItem>
                <Button
                  type="primary"
                  @click="searchadminSubmit()"
                >查询</Button>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </tabs>
      <Table
        border
        height="700"
        :columns="peopleColumns"
        :data="persons"
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
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { mapState } from 'vuex'
import expandRow from './managerexpand';
export default {
  components: {
    expandRow
  },
  data () {
    return {
      changeadminForm: {

      },
      searchadminForm: {

      },
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
          title: 'id',
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
          title: '薪资',
          key: 'wages'
        },
        {
          title: '是否为超级管理员',
          key: 'type'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 250,
          align: 'center'
        }
      ],
      value2: false,
      changeadminFormTitle: '',
      file: null,
      fileSrc: null
    }
  },
  computed: {
    ...mapState({ persons: state => state.adminmanage.admin.admin })
  },
  methods: {
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.persons[index].id)
      await this.$store.dispatch('adminmanage/removeadminSubmit', formData)
    },
    searchadminSubmit: async function () {
      let self = this
      let formData = new FormData()
      formData.append('adminphonenumber', self.searchadminForm.inputphonenumber)
      await this.$store.dispatch('adminmanage/searchadminSubmit', formData)
    },
    changeForm (index) {
      this.value2 = true
      this.changeadminFormTitle = `${this.persons[index].name}` + '的信息修改'
      this.changeadminForm.id = this.persons[index].id
      this.changeadminForm.name = this.persons[index].name
      this.changeadminForm.phonenumber = this.persons[index].phonenumber
      this.changeadminForm.email = this.persons[index].email
      this.changeadminForm.wages = this.persons[index].wages
      this.fileSrc = this.persons[index].photo
    },
    before (file) {
      this.file = file
      const FileExt = this.file.name.replace(/.+\./, '');//取得文件的后缀名
      if (file.size > 2097152) {
        this.$Message.error(file.name + '大小超过2M!')
        this.file = null //超过大小将文件清空
      } else if (!/image\/\w+/.test(file.type)) { //判断文件
        this.$Message.error('请上传图片老铁');
        this.file = null
      } else {
        const reader = new FileReader() //读取文件的字符流
        reader.readAsDataURL(file)//将文件读取为 DataURL 以data:开头的字符串
        reader.onload = e => {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          const code = e.target.result;
          console.log(code)
          this.changeadminForm.photo = code
          this.fileSrc = code
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
    },
    changeadminSubmit: async function () {
      let formData = new FormData()
      let changePassword = ''
      if (!this.changeadminForm.password) {
        changePassword = '123456789'
      } else {
        changePassword = this.changeadminForm.password
      }
      formData.append('adminid', this.changeadminForm.id)
      formData.append('adminname', this.changeadminForm.name)
      formData.append('adminemail', this.changeadminForm.email)
      formData.append('adminphonenumber', this.changeadminForm.phonenumber)
      formData.append('admintype', this.changeadminForm.type)
      formData.append('adminpassword', CryptoJS.MD5(changePassword).toString())
      formData.append('adminwages', parseInt(this.changeadminForm.wages))
      formData.append('adminphoto', this.fileSrc)
      await this.$store.dispatch('adminmanage/changeadminSubmit', formData)
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>