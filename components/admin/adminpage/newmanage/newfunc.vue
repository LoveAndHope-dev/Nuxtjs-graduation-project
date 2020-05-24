<template>
  <Card>
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
            :fixedNumber="[10, 3]"
            :autoCrop="true"
            :centerBox="true"
          >
          </cropper>
        </no-ssr>
      </div>
    </Modal>
    <Tabs>
      <TabPane label="添加图片">
        <div style="width: 700px; margin: 0 auto">
          <Form
            :rules="newruleValidate"
            ref="newValidate"
            :model="newitem"
          >
            <FormItem prop="photo">
              <Upload
                :before-upload="before"
                v-model="newitem.photo"
                action=""
              >
                <Avatar
                  shape="square"
                  style="width: 700px; height: 210px"
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
                type="primary"
                :disabled="full"
                @click="addPhoto()"
              >添加</Button>
              <Button
                icon="ios-close"
                @click="deletepic()"
              >删除</Button>
            </FormItem>
          </Form>
        </div>
      </TabPane>
    </Tabs>
    <Divider dash></Divider>
    <div style="color: rgb(158, 167, 180);width: 500px;margin: 0 auto">
      tips: 当图片放入变形时，图片将会出现显示不全的错误，请调整大小谢谢合作<br />
      图片仅显示所有图片中的前五个图片，请将其余的图片尽快删除
    </div>
  </Card>
</template>

<script>
import rules from '../rules'
import NoSSR from 'vue-no-ssr'
export default {
  components: {
    'no-ssr': NoSSR
  },
  mixins: [rules],
  props: {
    full: null
  },
  data () {
    return {
      newitem: {
        photo: null
      },
      fileSrc: null,
      modal1: false
    }
  },
  methods: {
    cancel () {
      this.newitem.photo = null
      this.fileSrc = null
      this.modal1 = false
    },
    ok () {
      this.$refs.cropper.getCropData((data) => {
        this.fileSrc = data
        this.newitem.photo = data
      })
    },
    before (file) {
      this.file = file
      const FileExt = this.file.name.replace(/.+\./, '');//取得文件的后缀名
      if (file.size > 8388608) {
        this.$Message.error(file.name + '大小超过8M!')
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
          this.newitem.photo = code
          this.fileSrc = code
          this.modal1 = true
        }
      }
      return false
    },
    deletepic () {
      this.newitem.photo = null
      this.fileSrc = null
    },
    addPhoto () {
      this.$refs.newValidate.validate(async valid => {
        if (!valid) {
          this.$Message.error('未上传图片')
        } else {
          console.log('ok')
          let formData = new FormData()
          formData.append('photo', this.newitem.photo)
          this.$emit('addPhotoSubmit', formData)
        }
      })
    }
  }
}
</script>
<style scoped>
</style>