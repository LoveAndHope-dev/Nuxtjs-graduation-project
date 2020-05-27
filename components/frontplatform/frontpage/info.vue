<template>
  <Card>
    <Drawer
      title="信息修改"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changeinfoForm"
        :label-width="80"
      >
        <FormItem label="姓名">
          <Input
            v-model="changeinfoForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="邮箱账号">
          <Input
            v-model="changeinfoForm.email"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="手机号码">
          <Input
            v-model="changeinfoForm.phonenumber"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="密码">
          <Input
            type="password"
            v-model="changeinfoForm.password"
            placeholder="不填默认密码：123456789"
          ></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="changeinfoForm.radio">
            <Radio label="1">男</Radio>
            <Radio label="0">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="照骗">
          <Upload
            :before-upload="before"
            v-model="changeinfoForm.photo"
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
            @click="changeInfoSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Row>
      <Col
        span="1"
        offset="1"
      >
      <h1>个<br>人<br>信<br>息<br></h1>

      </Col>
      <Col
        span="11"
        offset="2"
      >

      <List
        border
        size="large"
      >
        <ListItem>姓名：{{infos[0].name}}</ListItem>
        <ListItem>性别：{{infos[0].sex ? '男' : '女'}}</ListItem>
        <ListItem>邮箱地址：{{infos[0].email}}</ListItem>
        <ListItem>开始工作日期：{{infos[0].workdate}}</ListItem>
        <ListItem>手机号码：{{infos[0].phonenumber}}</ListItem>
        <ListItem>现薪资：{{infos[0].wages}}</ListItem>
        <ListItem>
          <Button
            type="primary"
            style="margin:0 20px"
            @click="changeForm()"
          >修改个人信息
          </Button>
        </ListItem>
      </List>
      </Col>
      <Col
        span="6"
        offset="2"
      >
      <img
        style="width: 100%"
        v-lazy="infos[0].photo"
      >
      </img>
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col
        span="2"
        offset="1"
      >
      <h1>员<br>工<br>遵<br>守<br>准<br>则</h1>
      </Col>
      <Col span="20">
      <div style="color: rgb(158, 167, 180);">
        <h3>工作人员遵守准则</h3><br>
        一、所以工作人员必须穿戴整齐的工作服，工作服要求干净、整齐；必须配带好工号牌，自觉接受监督。<br>
        二、工作人员必须外表端庄大方，注意个人卫生，男不留长发，女不披头散发，不得留长指甲，不得穿拖鞋；工作人员必须言行举止文明，不得高声喧哗，打闹嬉戏。禁止谣言秽语，提倡使用普通话。<br>
        三、卫生区域划分责任明确到人，要求每天清洗、清理，各个区域要认真做好卫生保洁工作。做到一尘不染。<br>
        四、生产间、售餐厅严禁吸烟、偷吃食品，开小灶、打熟人餐。<br>
        五、生产间生产人员加工的产品一律上架，严格要求生、熟食品分类存放，原材料要勤清理，要求先进先出，不能加工变质的原料，经加工的产品不得有异味。<br>
        六、粗加工间工作人员要求勤清理原料 ，要分类堆放，加工清理后的原料不得有虫、苍蝇等残杂物。不得加工使用腐烂、变质的原材料。<br>
        七、工作人员打餐过程中不能出言顶撞师生，要求礼貌、热情、耐心、周列、细致，同时动作快捷、准确，举止文明。<br>
        八、餐具清洗消毒人员要求每天对餐具按正规消毒的方法进行消毒，经消毒后的餐具不得有油垢、残留物。餐具必须按要求分类放置，保洁柜要求保持整齐、清洁。<br>
        九、所以员工必须遵守现金制度，不得私自藏现金。贪占小便宜，如发现有此现象者，必须严肃处理。<br><br>
      </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
import CryptoJS from 'crypto-js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      changeinfoForm: {

      },
      value2: false,
      file: null,
      fileSrc: null
    }
  },
  computed: {
    ...mapState({ infos: state => state.usermodal.user.user })
  },
  methods: {
    changeForm (index) {
      this.value2 = true
      this.changeinfoForm.name = this.infos[0].name
      this.changeinfoForm.email = this.infos[0].email
      this.changeinfoForm.phonenumber = this.infos[0].phonenumber
      this.changeinfoForm.radio = this.infos[0].sex ? '1' : '0'
      this.fileSrc = this.infos[0].photo
      this.changeinfoForm.photo = this.infos[0].photo
    },
    before (file) {
      this.file = file
      const FileExt = this.file.name.replace(/.+\./, '');//取得文件的后缀名
      if (file.size > 100000) {
        this.$Message.error(file.name + '大小超过1M!')
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
          this.changeinfoForm.photo = code
          this.fileSrc = code
        }
      }
      return false
    },
    deletepic () {
      this.fileSrc = null
      this.changeinfoForm.photo = null
    },
    changeInfoSubmit: async function () {
      let formData = new FormData()
      let changePassword = ''
      if (!this.changeinfoForm.password) {
        changePassword = '123456789'
      } else {
        changePassword = this.changeinfoForm.password
      }
      formData.append('staffid', this.infos[0].id)
      formData.append('staffname', this.changeinfoForm.name)
      formData.append('staffsex', this.changeinfoForm.radio)
      formData.append('staffemail', this.changeinfoForm.email)
      formData.append('staffphonenumber', this.changeinfoForm.phonenumber)
      formData.append('staffpassword', CryptoJS.MD5(changePassword).toString())
      formData.append('staffphoto', this.changeinfoForm.photo)
      this.$emit('changeInfoSubmit', formData)
    }
  }
}
</script>

<style scoped>
</style>