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
            :fixedNumber="[5, 7]"
            :autoCrop="true"
            :centerBox="true"
          >
          </cropper>
        </no-ssr>
      </div>
    </Modal>
    <Drawer
      :title="changeDrinkFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changeDrinkForm"
        :label-width="80"
        :rules="ruleValidate"
        ref="teaValidate"
      >
        <FormItem label="ID">
          <Input
            v-model="changeDrinkForm.id"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="茶品名"
          prop="name"
        >
          <Input
            v-model="changeDrinkForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="茶品价格"
          prop="price"
        >
          <Input
            v-model="changeDrinkForm.price"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="茶品类别"
          prop="type"
        >
          <Select v-model="changeDrinkForm.type">
            <Option value="红茶">红茶</Option>
            <Option value="绿茶">绿茶</Option>
            <Option value="白茶">白茶</Option>
            <Option value="花茶">花茶</Option>
            <Option value="果茶">果茶</Option>
            <Option value="奶茶">奶茶</Option>
          </Select>
        </FormItem>
        <FormItem
          label="茶品产地"
          prop="position"
        >
          <Input
            v-model="changeDrinkForm.position"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem
          label="茶品描述"
          prop="description"
        >
          <Input
            type="textarea"
            :autosize="{minRows: 4,maxRows: 4}"
            v-model="changeDrinkForm.description"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem
          label="照骗"
          prop="photo"
        >
          <Upload
            :before-upload="before"
            v-model="changeDrinkForm.photo"
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
            @click="changeDrinkSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Card class="manage_card">
      <Tabs>
        <TabPane label="查询茶品">
          <Input
            v-model="searchTeaForm.name"
            search
            enter-button
            @on-search="searchDrinkSubmit()"
            placeholder="你要查询什么茶品"
            style="margin:20px 0"
          />
          <Table
            border
            height="700"
            :columns="teaColumns"
            :data="drinks"
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
import expandRow from './teaexpand'
export default {
  components: {
  },
  props: {
    drinks: Array,
    ismore: Boolean
  },
  data () {
    return {
      teaColumns: [{
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
        title: '茶品名',
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
        key: 'position'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 150,
        align: 'center'
      }
      ],
      searchTeaForm: {
        name: ''
      },
      value2: false,
      changeDrinkFormTitle: '',
      changeDrinkForm: {
        name: '',
        price: null,
        type: '',
        position: '',
        description: '',
        photo: ''
      },
      file: null,
      fileSrc: null,
      pageSize: 15,
      page: 1,
      modal1: false,
      ruleValidate: {
        name: [
          { required: true, message: '茶品名不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 2,
            max: 25,
            message: '商品名称在2-25字之间',
            trigger: 'blur'
          }
        ],
        price: [
          { required: true, message: '茶品价格不能为空' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ],
        type: [
          { required: true, message: '茶品类型不能为空', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '茶品口味不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '茶品描述不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 20,
            message: '20字以上',
            trigger: 'blur'
          }
        ],
        photo: [
          { required: true, message: '图片非空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel () {
      this.photo = null
      this.fileSrc = null
      this.modal1 = false
    },
    ok () {
      this.$refs.cropper.getCropData((data) => {
        this.fileSrc = data
        this.changeDrinkForm.photo = data
      })
    },
    loadMore () {
      this.$emit('getTeaLists', { page: ++this.page, loadMore: true, word: this.searchTeaForm.name });
    },
    searchDrinkSubmit () {
      this.page = 1
      this.$emit('getTeaLists', { word: this.searchTeaForm.name })
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.drinks[index].id)
      let { status, data: { code, msg, removeID } } = await axios.post(`/manager/tea_manage/removeDrink`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.page = 1
        this.$emit('getTeaLists', { word: this.searchTeaForm.name })
        this.$Message.success('删除成功')
      }
    },
    changeForm (index) {
      this.value2 = true
      this.changeDrinkFormTitle = `${this.drinks[index].name}` + '的信息修改'
      this.changeDrinkForm.id = this.drinks[index].id
      this.changeDrinkForm.name = this.drinks[index].name
      this.changeDrinkForm.price = this.drinks[index].price
      this.changeDrinkForm.type = this.drinks[index].type
      this.changeDrinkForm.position = this.drinks[index].position
      this.changeDrinkForm.description = this.drinks[index].description
      this.changeDrinkForm.photo = this.drinks[index].photo
      this.fileSrc = this.drinks[index].photo
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
          this.changeDrinkForm.photo = code
          this.fileSrc = code
          this.modal1 = true
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
      this.changeDrinkForm.photo = null
    },
    changeDrinkSubmit: async function () {
      this.$refs.teaValidate.validate(async valid => {
        if (!valid) {
          this.$Message.error('请仔细检查茶品详情')
        } else {
          let formData = new FormData()
          formData.append('drinkid', this.changeDrinkForm.id)
          formData.append('drinkname', this.changeDrinkForm.name)
          formData.append('drinkprice', this.changeDrinkForm.price)
          formData.append('drinktype', this.changeDrinkForm.type)
          formData.append('drinkposition', this.changeDrinkForm.position)
          formData.append('drinkdescription', this.changeDrinkForm.description)
          formData.append('drinkphoto', this.changeDrinkForm.photo)
          let { status, data: { code, msg, drink } } = await axios.post(`/manager/tea_manage/changeDrink`, formData, {
            headers: { 'content-type': 'multipart/form-data' }
          })
          if (status === 200 & code === 0) {
            const i = this.drinks.findIndex(x => x.id === drink.id)
            if (i !== -1) {
              this.drinks.splice(i, 1, drink)
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