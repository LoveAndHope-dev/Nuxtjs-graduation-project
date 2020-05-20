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
            :fixedNumber="[5, 5]"
            :autoCrop="true"
            :centerBox="true"
          >
          </cropper>
        </no-ssr>
      </div>
    </Modal>
    <Tabs>
      <TabPane label="添加茶点">
        <Form
          :model="cakeForm"
          :label-width="80"
        >
          <Row>
            <Col span="16">
            <Row>
              <Col span="12">
              <FormItem label="茶点名称">
                <Input
                  v-model="cakeForm.name"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="茶点价格">
                <Input
                  v-model="cakeForm.price"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              </Col>
              <Col span="12">
              <FormItem label="茶点类型">
                <Select v-model="cakeForm.type">
                  <Option value="糕点">糕点</Option>
                  <Option value="糖果">糖果</Option>
                  <Option value="西点">西点</Option>
                  <Option value="中式">中式</Option>
                  <Option value="干果">干果</Option>
                  <Option value="鲜果">鲜果</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="口味">
                <Select v-model="cakeForm.taste">
                  <Option value="酸">酸</Option>
                  <Option value="甜">甜</Option>
                  <Option value="苦">苦</Option>
                  <Option value="辣">辣</Option>
                  <Option value="咸">咸</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem label="描述">
                <Input
                  v-model="cakeForm.description"
                  type="textarea"
                  :autosize="{minRows: 4,maxRows: 4}"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
            <Col
              span="6"
              offset="2"
            >
            <Upload
              :before-upload="before"
              v-model="cakeForm.photo"
              action=""
            >
              <Avatar
                shape="square"
                style="width: 200px; height: 200px"
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
              @click="addcake()"
            >创建</Button>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
export default {
  data () {
    return {
      cakeForm: {
        id: ''
      },
      file: null,
      fileSrc: null,
      modal1: false
    }
  },
  methods: {
    cancel () {
      this.cakeForm.photo = null
      this.fileSrc = null
      this.modal1 = false
    },
    ok () {
      this.$refs.cropper.getCropData((data) => {
        this.fileSrc = data
        this.cakeForm.photo = data
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
          this.cakeForm.photo = code
          this.fileSrc = code
          this.modal1 = true
        }
      }
      return false
    },
    deletepic () {
      this.cakeForm.fileSrc = null
      this.photo = null
    },
    async addcake () {
      let formData = new FormData()
      formData.append('cakename', this.cakeForm.name)
      formData.append('cakeprice', this.cakeForm.price)
      formData.append('caketype', this.cakeForm.type)
      formData.append('caketaste', this.cakeForm.taste)
      formData.append('cakedescription', this.cakeForm.description)
      formData.append('cakephoto', this.cakeForm.photo)
      this.$emit('addCakeSubmit', formData)
    }
  }
}
</script>

<style scoped>
</style>