<template>
  <Card>
    <Tabs>
      <TabPane label="添加茶品">
        <Form
          :model="TeaForm"
          :label-width="80"
        >
          <Row>
            <Col span="16">
            <Row>
              <Col span="12">
              <FormItem label="茶品名称">
                <Input
                  v-model="TeaForm.name"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="茶品价格">
                <Input
                  v-model="TeaForm.price"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              </Col>
              <Col span="12">
              <FormItem label="茶品类型">
                <Select v-model="TeaForm.type">
                  <Option value="红茶">红茶</Option>
                  <Option value="绿茶">绿茶</Option>
                  <Option value="白茶">白茶</Option>
                  <Option value="花茶">花茶</Option>
                  <Option value="果茶">果茶</Option>
                  <Option value="奶茶">奶茶</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="产地">
                <Input
                  v-model="TeaForm.position"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem label="描述">
                <Input
                  v-model="TeaForm.description"
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
              v-model="TeaForm.photo"
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
              @click="addDrink()"
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
      TeaForm: {
        id: ''
      },
      file: null,
      fileSrc: null
    }
  },
  methods: {
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
          this.TeaForm.photo = code
          this.fileSrc = code
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
      this.photo = null
    },
    addDrink () {
      let formData = new FormData()
      formData.append('drinkname', this.TeaForm.name)
      formData.append('drinkprice', this.TeaForm.price)
      formData.append('drinktype', this.TeaForm.type)
      formData.append('drinkposition', this.TeaForm.position)
      formData.append('drinkdescription', this.TeaForm.description)
      formData.append('drinkphoto', this.TeaForm.photo)
      this.$emit('addDrinkSubmit', formData)
    }
  }
}
</script>

<style scoped>
</style>