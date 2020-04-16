<template>
  <Card>
    <Tabs>
      <TabPane label="添加管理员">
        <Form
          :model="addManagerFrom"
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
                  v-model="addManagerFrom.inputdate"
                ></DatePicker>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="姓名">
                <Input
                  v-model="addManagerFrom.inputname"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="邮箱账号">
                <Input
                  v-model="addManagerFrom.inputemail"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="手机号码">
                <Input
                  v-model="addManagerFrom.inputphonenumber"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="密码">
                <Input
                  v-model="addManagerFrom.inputpassword"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="工资">
                <Input
                  v-model="addManagerFrom.inputwages"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem label="性别">
                <RadioGroup v-model="addManagerFrom.radio">
                  <Radio label="male">Male</Radio>
                  <Radio label="female">Female</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem label="管理级别">
                <RadioGroup v-model="addManagerFrom.manage">
                  <Radio label="fullmanage">总管理</Radio>
                  <Radio label="normal">正常管理员</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            </Col>
            <Col
              span="7"
              offset="1"
            >
            <Upload
              v-model="addManagerFrom.photo"
              multiple
              type="drag"
              action=""
            >
              <div style="padding: 20px 0">
                <Icon
                  type="ios-cloud-upload"
                  size="52"
                  style="color: #3399ff"
                ></Icon>
                <p>上传照骗</p>
              </div>
            </Upload>
            </Col>
          </Row>
          <Divider></Divider>
          <FormItem>
            <Button type="primary">创建</Button>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="查询管理员">
        <Form
          :model="searchWorkerForm"
          :label-width="80"
        >
          <Row>
            <Col span="12">
            <FormItem label="工号">
              <Input
                v-model="searchWorkerForm.inputid"
                placeholder="Enter something..."
              ></Input>
            </FormItem>
            <FormItem label="姓名">
              <Input
                v-model="searchWorkerForm.inputname"
                placeholder="Enter something..."
              ></Input>
            </FormItem>
            <FormItem label="邮箱账号">
              <Input
                v-model="searchWorkerForm.inputemail"
                placeholder="Enter something..."
              ></Input>
            </FormItem>
            </Col>
          </Row>
          <Divider></Divider>
          <FormItem>
            <Button type="primary">查询</Button>
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
      addManagerFrom: {
        id: ''
      },
      searchWorkerForm: {

      }
    }
  }
}
</script>

<style scoped>
</style>