<template>
  <Card>
    <Row>
      <Col span="4">
      <List
        border
        size="large"
      >
        <ListItem>姓名</ListItem>
        <ListItem>ID号</ListItem>
        <ListItem>邮箱</ListItem>
        <ListItem>手机</ListItem>
        <ListItem>性别</ListItem>
      </List>
      </Col>
      <Col
        span="11"
        offset="1"
      >
      <List
        border
        size="large"
      >
        <ListItem>姓名</ListItem>
        <ListItem>ID号</ListItem>
        <ListItem>邮箱</ListItem>
        <ListItem>手机</ListItem>
        <ListItem>性别</ListItem>
      </List>
      </Col>
      <Col
        span="3"
        offset="2"
      >
      <img
        :src="path"
        alt=""
        style="width:100%"
      >
      </Col>
    </Row>
    <Divider />
    <Button type="primary">修改</Button>
  </Card>
</template>

<script>
export default {
  data () {
    return {
      path: '/workerimg/worker1.jpg'
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>