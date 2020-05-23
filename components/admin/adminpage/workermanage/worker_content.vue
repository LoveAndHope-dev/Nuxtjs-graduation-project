<template>
  <div>
    <Modal
      v-model="modal1"
      style="width:800px"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div style="width:100%;height:400px">
        <no-ssr>
          <cropper
            ref="cropper"
            :img="fileSrc"
            :canMoveBox="true"
            :outputSize="1"
            :fixed="true"
            :canScale="true"
            :fixedNumber="[5, 5]"
            :autoCrop="true"
            :centerBox="true"
          >
          </cropper>
        </no-ssr>
      </div>
    </Modal>
    <Drawer
      :title="changeWorkerFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changeWorkerForm"
        :label-width="80"
        :rules="ruleValidate"
        ref="workerValidate"
      >
        <FormItem label="ID">
          <Input
            v-model="changeWorkerForm.id"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="姓名"
          prop="name"
        >
          <Input
            v-model="changeWorkerForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="邮箱账号"
          prop="email"
        >
          <Input
            v-model="changeWorkerForm.email"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="手机号码"
          prop="phonenumber"
        >
          <Input
            v-model="changeWorkerForm.phonenumber"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="工资"
          prop="wages"
        >
          <Input
            v-model="changeWorkerForm.wages"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="性别"
          prop="radio"
        >
          <RadioGroup v-model="changeWorkerForm.radio">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="密码"
          prop="password"
        >
          <Input
            v-model="changeWorkerForm.password"
            placeholder="不填默认密码：123456789"
          ></Input>
        </FormItem>
        <FormItem
          label="照骗"
          prop="photo"
        >
          <Upload
            :before-upload="before"
            v-model="changeWorkerForm.photo"
            action=""
          >
            <Avatar
              shape="square"
              style="width: 180px; height: 180px"
              :src="fileSrc"
            >
              <Icon
                type="ios-cloud-upload"
                size="100"
                style="color: #fff; padding: 20px 0"
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
            @click="changeWorkerSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Card class="manage_card">
      <Tabs>
        <TabPane label="查询工作人员">
          <Input
            v-model="searchWorkerForm.inputphonenumber"
            search
            enter-button
            @on-search="searchWorkerSubmit"
            placeholder="基于手机号查询哦"
            style="margin:20px 0"
          />
          <Table
            border
            height="700"
            :columns="peopleColumns"
            :data="staffs"
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
          <Button
            :disabled="!ismore"
            long
            @click="loadMore"
          >———— 加载更多 ————
          </Button>
        </TabPane>
      </tabs>
    </Card>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import axios from 'axios'
import expandRow from './workerexpand';
export default {
  components: {
    expandRow
  },
  props: {
    staffs: Array,
    ismore: Boolean
  },
  data () {
    return {
      changeWorkerForm: {
        name: '',
        wages: null,
        email: '',
        phonenumber: '',
        radio: '',
        photo: ''
      },
      searchWorkerForm: {
        inputphonenumber: ''
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
          title: 'Action',
          slot: 'action',
          width: 250,
          align: 'center'
        }
      ],
      value2: false,
      changeWorkerFormTitle: '',
      file: null,
      fileSrc: null,
      pageSize: 15,
      page: 1,
      modal1: false,
      ruleValidate: {
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '禁止为空', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱形式不对',
            trigger: 'blur'
          }
        ],
        phonenumber: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        wages: [
          { required: true, message: '禁止为空' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ],
        radio: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        photo: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel () {
      this.changeWorkerForm.photo = null
      this.fileSrc = null
      this.modal1 = false
    },
    ok () {
      this.$refs.cropper.getCropData((data) => {
        this.fileSrc = data
        this.changeWorkerForm.photo = data
      })
    },
    loadMore () {
      this.$emit('getWorkerLists', { page: ++this.page, loadMore: true, word: this.searchWorkerForm.name });
    },
    searchWorkerSubmit () {
      this.page = 1
      this.$emit('getWorkerLists', { word: this.searchWorkerForm.inputphonenumber })
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.staffs[index].id)
      let { status, data: { code, msg, removeID } } = await axios.post(`/manager/worker_manage/removeStaff`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.page = 1
        this.$emit('getWorkerLists', { word: this.searchWorkerForm.name })
        this.$Message.success('删除成功')
      }
    },
    changeForm (index) {
      this.value2 = true
      this.changeWorkerFormTitle = `${this.staffs[index].name}` + '的信息修改'
      this.changeWorkerForm.id = this.staffs[index].id
      this.changeWorkerForm.name = this.staffs[index].name
      this.changeWorkerForm.phonenumber = this.staffs[index].phonenumber
      this.changeWorkerForm.email = this.staffs[index].email
      this.changeWorkerForm.wages = this.staffs[index].wages
      this.changeWorkerForm.radio = this.staffs[index].sex
      this.changeWorkerForm.photo = this.staffs[index].photo
      this.fileSrc = this.staffs[index].photo
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
          this.changeWorkerForm.photo = code
          this.fileSrc = code
          this.modal1 = true
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
      this.changeWorkerForm.photo = null
    },
    changeWorkerSubmit: async function () {
      this.$refs.workerValidate.validate(async valid => {
        if (!valid) {
          this.$Message.error('请仔细检查茶点详情')
        } else {
          let formData = new FormData()
          let changePassword = ''
          if (!this.changeWorkerForm.password) {
            changePassword = '123456789'
          } else {
            changePassword = this.changeWorkerForm.password
          }
          formData.append('staffid', this.changeWorkerForm.id)
          formData.append('staffname', this.changeWorkerForm.name)
          formData.append('staffemail', this.changeWorkerForm.email)
          formData.append('staffphonenumber', this.changeWorkerForm.phonenumber)
          formData.append('staffpassword', CryptoJS.MD5(changePassword).toString())
          formData.append('staffwages', parseInt(this.changeWorkerForm.wages))
          formData.append('staffsex', this.changeWorkerForm.radio)
          formData.append('staffphoto', this.changeWorkerForm.photo)
          let { status, data: { code, msg, staff } } = await axios.post(`/manager/worker_manage/changeStaff`, formData, {
            headers: { 'content-type': 'multipart/form-data' }
          })
          if (status === 200 & code === 0) {
            const i = this.staffs.findIndex(x => x.id === staff.id)
            if (i !== -1) {
              this.staffs.splice(i, 1, staff)
            }
            this.$Message.success('修改成功')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>