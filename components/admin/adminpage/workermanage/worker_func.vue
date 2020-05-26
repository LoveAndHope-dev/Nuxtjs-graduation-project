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
            :can-move-box="true"
            :output-size="1"
            :fixed="true"
            :can-scale="true"
            :fixed-number="[5, 5]"
            :auto-crop="true"
            :center-box="true"
          >
          </cropper>
        </no-ssr>
      </div>
    </Modal>
    <Card>
      <Tabs>
        <TabPane label="添加工作人员">
          <Form
            :model="addWorkerForm"
            :label-width="100"
            :rules="workerruleValidate"
            ref="workerValidate"
          >
            <Row>
              <Col span="16">
              <Row>
                <Col span="12">
                <FormItem
                  label="入职日期"
                  prop="date"
                >
                  <DatePicker
                    type="date"
                    placeholder="Select date"
                    v-model="addWorkerForm.date"
                  ></DatePicker>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="姓名"
                  prop="name"
                >
                  <Input
                    v-model="addWorkerForm.name"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="邮箱账号"
                  prop="email"
                >
                  <Input
                    v-model="addWorkerForm.email"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="手机号码"
                  prop="phonenumber"
                >
                  <Input
                    v-model="addWorkerForm.phonenumber"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="密码"
                  prop="password"
                >
                  <Input
                    v-model="addWorkerForm.password"
                    placeholder="Enter something..."
                    type="password"
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem
                  label="工资"
                  prop="wages"
                >
                  <Input
                    v-model="addWorkerForm.wages"
                    placeholder="Enter something..."
                    type="password"
                  ></Input>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem
                  label="性别"
                  prop="radio"
                >
                  <RadioGroup v-model="addWorkerForm.radio">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                  </RadioGroup>
                </FormItem>
                </Col>
              </Row>
              </Col>
              <Col
                span="5"
                offset="1"
              >
              <FormItem
                label="照片"
                prop="photo"
              >
                <Upload
                  :before-upload="before"
                  v-model="addWorkerForm.photo"
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
              </Col>
            </Row>
            <Divider></Divider>
            <FormItem>
              <Button
                type="primary"
                @click="addWorkerSubmit()"
              >创建</Button>
            </FormItem>
          </Form>
        </TabPane>

      </Tabs>
    </Card>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import rules from '../rules'
import CryptoJS from 'crypto-js'
export default {
  mixins: [rules],
  data () {
    return {
      file: null,
      fileSrc: null,
      addWorkerForm: {
        date: '',
        radio: ''
      },
      modal1: false
    }
  },
  methods: {
    cancel () {
      this.addWorkerForm.photo = null
      this.fileSrc = null
      this.modal1 = false
    },
    ok () {
      this.$refs.cropper.getCropData((data) => {
        this.fileSrc = data
        this.addWorkerForm.photo = data
      })
    },
    addWorkerSubmit: async function () {
      this.$refs.workerValidate.validate(async valid => {
        if (!valid) {
          this.$Message.error('请仔细检查茶点详情')
        } else {
          let self = this;
          let formData = new FormData()
          formData.append('staffworkdate', moment(self.addWorkerForm.date).format('L'))
          formData.append('staffname', self.addWorkerForm.name)
          formData.append('staffemail', self.addWorkerForm.email)
          formData.append('staffphonenumber', window.encodeURIComponent(self.addWorkerForm.phonenumber))
          formData.append('staffsex', self.addWorkerForm.radio)
          formData.append('staffphoto', self.addWorkerForm.photo)
          formData.append('staffpassword', CryptoJS.MD5(self.addWorkerForm.password).toString())
          formData.append('staffwages', parseInt(self.addWorkerForm.wages))
          this.$emit('addWorkerSubmit', formData)
        }
      })
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
          this.addWorkerForm.photo = code
          this.fileSrc = code
          this.modal1 = true
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
      this.addWorkerForm.photo = null
    }
  }
}
</script>

<style scoped>
</style>