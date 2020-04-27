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
        <FormItem label="性别">
          <RadioGroup v-model="changeinfoForm.radio">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
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
        offset="1"
      >

      <List
        border
        size="large"
      >
        <ListItem>姓名：{{infos[0].name}}</ListItem>
        <ListItem>性别：{{infos[0].sex}}</ListItem>
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
          <Button
            style="margin:0 20px"
            type="error"
            @click="exit()"
          >退出登录
          </Button>
        </ListItem>
      </List>
      </Col>
      <Col
        span="3"
        offset="2"
      >
      <Avatar
        shape="square"
        style="width: 280px; height: 392px"
        :src="infos[0].photo"
      >
      </Avatar>
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
        <h3>管理人员准则</h3><br>
        一、为加强考勤管理，维护工作秩序，提高工作效率，特制定本制度。<br>
        二、公司员工必须自觉遵守劳动纪律，遵守公司行政管理制度，按时上下班，不迟到，不早退，工作时间不得擅自离开工作岗位，外出办理业务前，须经本部门负责人同意。<br>
        三、周一至周六为工作日，周日为休息日。公司机关周日和夜间值班由办公室统一安排，市场营销部、项目技术部、投资发展部、会议中心周日值班由各部门自行安排，报分管领导批准后执行。因工作需要周日或夜间加班的，由各部门负责人填写加班审批表，报分管领导批准后执行。节日值班由公司统一安排。<br>
        四、严格请、销假制度。员工因私事请假1天以内的（含1天），由部门负责人批准；3天以内的（含3天），由副总经理批准；3天以上的，报总经理批准。副总经理和部门负责人请假，一律由总经理批准。请假员工事毕向批准人销假。未经批准而擅离工作岗位的按旷工处理。<br>
        五、上班时间开始后5分钟至30分钟内到班者，按迟到论处；超过30分钟以上者，按旷工半天论处。提前30分钟以内下班者，按早退论处；超过30分钟者，按旷工半天论处。<br>
        六、1个月内迟到、早退累计达3次者，扣发5天的基本工资；累计达3次以上5次以下者，扣发10天的基本工资；累计达5次以上10次以下者，扣发当月15天的基本工资；累计达10次以上者，扣发当月的基本工资。<br>
        七、旷工半天者，扣发当天的基本工资、效益工资和奖金；每月累计旷工1天者，扣发5天的基本工资、效益工资和奖金，并给予一次警告处分；每月累计旷工2天者，扣发10天的基本工资、效益工资和奖金，并给予记过1次处分；每月累计旷工3天者，扣发当月基本工资、效益工资和奖金，并给予记大过1次处分；每月累计旷工3天以上，6天以下者，扣发当月基本工资、效益工资和奖金，第二个月起留用察看，发放基本工资；每月累计旷工6天以上者（含6天），予以辞退。<br>
        八、工作时间禁止打牌、下棋、串岗聊天等做与工作无关的事情。如有违反者当天按旷工1天处理；当月累计2次的，按旷工2天处理；当月累计3次的，按旷工3天处理。<br>
        九、参加公司组织的会议、培训、学习、考试或其他团队活动，如有事请假的，必须提前向组织者或带队者请假。在规定时间内未到或早退的，按照本制度第五条、第六条、第七条规定处理；未经批准擅自不参加的，视为旷工，按照本制度第七条规定处理。<br>
        十、员工按规定享受探亲假、婚假、产育假、结育手术假时，必须凭有关证明资料报总经理批准；未经批准者按旷工处理。员工病假期间只发给基本工资。<br>
        十一、经总经理或分管领导批准，决定假日加班工作或值班的每天补助20元；夜间加班或值班的，每个补助10元；节日值班每天补助40元。未经批准，值班人员不得空岗或迟到，如有空岗者，视为旷工，按照本制度第七条规定处理；如有迟到者，按本制度第五条、第六条规定处理。<br>
        十二、员工的考勤管理，由各部门负责人进行监督、检查，部门负责人对本部门的考勤要秉公办事，认真负责。如有弄虚作假、包痹袒护迟到、早退、旷工员工的，一经查实，按处罚员工的双倍予以处罚。凡是受到本制度第五条、第六条、第七条规定处理的员工，取消本年度先进个人的评比资格。<br>
      </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
import vuex from 'vuex'
export default {
  props: {
    infos: Array
  },
  data () {
    return {
      changeinfoForm: {

      },
      value2: false,
      file: null,
      fileSrc: null
    }
  },
  methods: {
    changeForm (index) {
      this.value2 = true
      this.changeinfoForm.name = this.infos[0].name
      this.changeinfoForm.email = this.infos[0].email
      this.changeinfoForm.phonenumber = this.infos[0].phonenumber
      this.changeinfoForm.radio = this.infos[0].sex
      this.fileSrc = this.infos[0].photo
    },
    changeInfoSubmit: async function () {
      let formData = new FormData()
      formData.append('adminid', this.infos[0].id)
      formData.append('adminname', this.changeinfoForm.name)
      formData.append('adminemail', this.changeinfoForm.email)
      formData.append('adminphonenumber', this.changeinfoForm.phonenumber)
      formData.append('adminsex', this.changeinfoForm.radio)
      formData.append('adminphoto', this.fileSrc)
      this.$emit('changeInfoSubmit', formData)
    },
    async exit () {
      this.$Message.success('你已经退出，请重新登录')
      this.$router.push('/exit')
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
          this.changeinfoForm.photo = code
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
@import "@/assets/admin/adminmanage.css";
</style>