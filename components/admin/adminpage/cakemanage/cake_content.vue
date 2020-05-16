<template>
  <div>
    <Drawer
      :title="changecakeFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changecakeForm"
        :label-width="80"
      >
        <FormItem label="ID">
          <Input
            v-model="changecakeForm.id"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="茶点名">
          <Input
            v-model="changecakeForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="茶点价格">
          <Input
            v-model="changecakeForm.price"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="茶点类型">
          <Select v-model="changecakeForm.type">
            <Option value="糕点">糕点</Option>
            <Option value="糖果">糖果</Option>
            <Option value="西点">西点</Option>
            <Option value="中式">中式</Option>
            <Option value="干果">干果</Option>
            <Option value="鲜果">鲜果</Option>
          </Select>
        </FormItem>
        <FormItem label="口味">
          <Select v-model="changecakeForm.taste">
            <Option value="酸">酸</Option>
            <Option value="甜">甜</Option>
            <Option value="苦">苦</Option>
            <Option value="辣">辣</Option>
            <Option value="咸">咸</Option>
          </Select>
        </FormItem>
        <FormItem label="茶点描述">
          <Input
            type="textarea"
            :autosize="{minRows: 4,maxRows: 4}"
            v-model="changecakeForm.description"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem label="照骗">
          <Upload
            :before-upload="before"
            v-model="changecakeForm.photo"
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
            @click="changecakeSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Card class="manage_card">
      <Tabs>
        <TabPane label="查询茶点">
          <Input
            v-model="searchcakeForm.name"
            search
            enter-button
            @on-search="searchcakeSubmit()"
            placeholder="你要查询什么茶品"
            style="margin:20px 0"
          />
          <Table
            border
            height="700"
            :columns="cakeColumns"
            :data="cakes"
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
              >修改</Button>
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
      </Tabs>
    </Card>
  </div>
</template>

<script>
import axios from 'axios'
import expandRow from './cakeexpand'
export default {
  components: {
  },
  props: {
    cakes: Array,
    ismore: Boolean
  },
  data () {
    return {
      cakeColumns: [{
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
        title: '茶点名',
        key: 'name'
      },
      {
        title: '价格',
        key: 'price'
      },
      {
        title: '类型',
        key: 'type'
      },
      {
        title: '产地',
        key: 'taste'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 150,
        align: 'center'
      }
      ],
      searchcakeForm: {
        name: ''
      },
      value2: false,
      changecakeFormTitle: '',
      changecakeForm: {},
      file: null,
      fileSrc: null,
      pageSize: 15,
      page: 1
    }
  },
  methods: {
    loadMore () {
      this.$emit('getCakeLists', { page: ++this.page, loadMore: true, word: this.searchcakeForm.name });
    },
    searchcakeSubmit () {
      this.page = 1
      this.$emit('getCakeLists', { word: this.searchcakeForm.name })
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.cakes[index].id)
      let { status, data: { code, msg, removeID } } = await axios.post(`/manager/cake_manage/removeCake`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.page = 1
        this.$emit('getCakeLists', { word: this.searchcakeForm.name })
        this.$Message.success('删除成功')
      }
    },
    changeForm (index) {
      this.value2 = true
      this.changecakeFormTitle = `${this.cakes[index].name}` + '的信息修改'
      this.changecakeForm.id = this.cakes[index].id
      this.changecakeForm.name = this.cakes[index].name
      this.changecakeForm.price = this.cakes[index].price
      this.changecakeForm.type = this.cakes[index].type
      this.changecakeForm.taste = this.cakes[index].taste
      this.changecakeForm.description = this.cakes[index].description
      this.fileSrc = this.cakes[index].photo
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
          this.changecakeForm.photo = code
          this.fileSrc = code
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
      this.photo = null
    },
    changecakeSubmit: async function () {
      let formData = new FormData()
      formData.append('cakeid', this.changecakeForm.id)
      formData.append('cakename', this.changecakeForm.name)
      formData.append('cakeprice', this.changecakeForm.price)
      formData.append('caketype', this.changecakeForm.type)
      formData.append('caketaste', this.changecakeForm.taste)
      formData.append('cakedescription', this.changecakeForm.description)
      formData.append('cakephoto', this.fileSrc)
      let { status, data: { code, msg, cake } } = await axios.post(`/manager/cake_manage/changeCake`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        const i = this.cakes.findIndex(x => x.id === cake.id)
        if (i !== -1) {
          this.cakes.splice(i, 1, cake)
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