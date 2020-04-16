<template>
  <div>
    <Card>
      <Tabs>
        <TabPane label="添加工作人员">
          <Form
            :model="addWorkerForm"
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
                    v-model="addWorkerForm.inputdate"
                  ></DatePicker>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="姓名">
                  <Input
                    v-model="addWorkerForm.inputname"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="邮箱账号">
                  <Input
                    v-model="addWorkerForm.inputemail"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="手机号码">
                  <Input
                    v-model="addWorkerForm.inputphonenumber"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="密码">
                  <Input
                    v-model="addWorkerForm.inputpassword"
                    placeholder="Enter something..."
                    type="password"
                  ></Input>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="性别">
                  <RadioGroup v-model="addWorkerForm.radio">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
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
                v-model="addWorkerForm.photo"
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
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      file: null,
      fileSrc: null,
      addWorkerForm: {

      }
    }
  },
  methods: {
    addWorkerSubmit: async function () {
      let self = this;
      let formData = new FormData()
      formData.append('staffworkdate', moment(self.addWorkerForm.inputdate).format('LL'))
      formData.append('staffname', self.addWorkerForm.inputname)
      formData.append('staffemail', self.addWorkerForm.inputemail)
      formData.append('staffphonenumber', window.encodeURIComponent(self.addWorkerForm.inputphonenumber))
      formData.append('staffsex', self.addWorkerForm.radio)
      formData.append('staffphoto', self.addWorkerForm.photo)
      formData.append('staffpassword', CryptoJS.MD5(self.addWorkerForm.inputpassword).toString())
      await this.$store.dispatch('workermanage/addWorkerSubmit', formData)
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
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
    }
  }
}
</script>

<style scoped>
</style>