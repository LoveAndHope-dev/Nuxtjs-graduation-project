<template>
  <div>
    <Drawer
      :title="changeDrinkFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changeDrinkForm"
        :label-width="80"
      >
        <FormItem label="ID">
          <Input
            v-model="changeDrinkForm.id"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="茶品名">
          <Input
            v-model="changeDrinkForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="茶品价格">
          <Input
            v-model="changeDrinkForm.price"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="茶品类别">
          <Select v-model="changeDrinkForm.type">
            <Option value="红茶">红茶</Option>
            <Option value="绿茶">绿茶</Option>
            <Option value="白茶">白茶</Option>
            <Option value="花茶">花茶</Option>
            <Option value="果茶">果茶</Option>
            <Option value="奶茶">奶茶</Option>
          </Select>
        </FormItem>
        <FormItem label="茶品产地">
          <Input
            v-model="changeDrinkForm.position"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem label="茶品描述">
          <Input
            type="textarea"
            :autosize="{minRows: 4,maxRows: 4}"
            v-model="changeDrinkForm.description"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem label="照骗">
          <Upload
            :before-upload="before"
            v-model="changeDrinkForm.photo"
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
            @click="changeDrinkSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Card class="manage_card">
      <Tabs>
        <TabPane label="查询茶品">
          <Form
            :model="searchTeaForm"
            :label-width="80"
          >
            <Row>
              <Col span="12">
              <FormItem label="茶品名">
                <Input
                  v-model="searchTeaForm.name"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col
                offset="2"
                span="10"
              >
              <FormItem>
                <Button type="primary" @click="searchDrinkSubmit()">查询</Button>
              </FormItem>
              </col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
      <Table
        border
        height="500"
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
          >View</Button>
          <Button
            type="error"
            size="small"
            @click="remove(index)"
          >Delete</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import expandRow from './teaexpand'
import { mapState } from 'vuex'
export default {
  components: {
  },
  props: {
    teadata: Array
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

      },
      value2: false,
      changeDrinkFormTitle: '',
      changeDrinkForm: {},
      file: null,
      fileSrc: null
    }
  },
  computed: {
    ...mapState({ drinks: state => state.drinkmanage.drink.drink })
  },
  methods: {
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.drinks[index].id)
      await this.$store.dispatch('drinkmanage/removeDrinkSubmit', formData)
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
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
    },
    changeDrinkSubmit: async function () {
      let formData = new FormData()
      formData.append('drinkid', this.changeDrinkForm.id)
      formData.append('drinkname', this.changeDrinkForm.name)
      formData.append('drinkprice', this.changeDrinkForm.price)
      formData.append('drinktype', this.changeDrinkForm.type)
      formData.append('drinkposition', this.changeDrinkForm.position)
      formData.append('drinkdescription', this.changeDrinkForm.description)
      formData.append('drinkphoto', this.fileSrc)
      await this.$store.dispatch('drinkmanage/changeDrinkSubmit', formData)
    },
    searchDrinkSubmit: async function () {
      let self = this
      let formData = new FormData()
      formData.append('drinkname', self.searchTeaForm.name)
      await this.$store.dispatch('drinkmanage/searchDrinkSubmit', formData)
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>