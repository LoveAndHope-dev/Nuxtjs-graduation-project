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
    <Card>
      <Tabs>
        <TabPane label="添加管理员">
          <Form
            :model="addadminForm"
            :label-width="80"
          >
            <Row>
              <Col span="16">
              <Row>
                <Col span="12">
                <FormItem label="入职日期">
                  <DatePicker
                    type="date"
                    placeholder="Select date"
                    v-model="addadminForm.inputdate"
                  ></DatePicker>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="姓名">
                  <Input
                    v-model="addadminForm.inputname"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="邮箱账号">
                  <Input
                    v-model="addadminForm.inputemail"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="手机号码">
                  <Input
                    v-model="addadminForm.inputphonenumber"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="密码">
                  <Input
                    v-model="addadminForm.inputpassword"
                    placeholder="Enter something..."
                    type="password"
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="工资">
                  <Input
                    v-model="addadminForm.inputwages"
                    placeholder="Enter something..."
                    type="password"
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="性别">
                  <RadioGroup v-model="addadminForm.radio">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                  </RadioGroup>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="管理层级">
                  <RadioGroup v-model="addadminForm.type">
                    <Radio label="0">普通管理员</Radio>
                    <Radio label="1">超管</Radio>
                  </RadioGroup>
                </FormItem>
                </Col>
              </Row>
              </Col>
              <Col
                span="4"
                offset="2"
              >
              <Upload
                :before-upload="before"
                v-model="addadminForm.photo"
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
              </Col>
            </Row>
            <Divider></Divider>
            <FormItem>
              <Button
                type="primary"
                @click="addadminSubmit()"
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
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      file: null,
      fileSrc: null,
      addadminForm: {

      },
      modal1: false
    }
  },
  methods: {
    cancel () {
      this.addadminForm.photo = null
      this.fileSrc = null
      this.modal1 = false
    },
    ok () {
      this.$refs.cropper.getCropData((data) => {
        this.fileSrc = data
        this.addadminForm.photo = data
      })
    },
    addadminSubmit: async function () {
      let self = this;
      let formData = new FormData()
      formData.append('adminworkdate', moment(self.addadminForm.inputdate).format('LL'))
      formData.append('adminname', self.addadminForm.inputname)
      formData.append('adminemail', self.addadminForm.inputemail)
      formData.append('adminphonenumber', window.encodeURIComponent(self.addadminForm.inputphonenumber))
      formData.append('adminsex', self.addadminForm.radio)
      formData.append('admintype', self.addadminForm.type)
      formData.append('adminphoto', self.addadminForm.photo)
      formData.append('adminpassword', CryptoJS.MD5(self.addadminForm.inputpassword).toString())
      formData.append('adminwages', parseInt(self.addadminForm.inputwages))
      this.$emit('addAdminSubmit', formData)
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
          this.addadminForm.photo = code
          this.fileSrc = code
          this.modal1 = true
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
      this.addadminForm.photo = null
    }
  }
}
</script>

<style scoped>
</style>