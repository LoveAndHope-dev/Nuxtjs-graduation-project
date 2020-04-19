<template>
  <div @click="modal1 = true">
    <Card class="shop_item_card">
      <Row>
        <Col span="7">
        <Avatar
          shape="square"
          style="width: 100px; height: 150px"
          :src="item.photo"
        >
        </Avatar>
        </Col>
        <Col
          span="16"
          offset="1"
        >
        <Row>
          <Col span="12">
          <h2>{{item.name}}</h2>
          </Col>
          <Col span="12">
          <h1>￥{{item.price}}</h1>
          </Col>
        </Row>
        <h4>类型：{{item.type}}</h4>
        <h4>产地：{{item.position}}</h4>
        <h4>描述：{{item.description | ellipsis}}</h4>
        </Col>
      </Row>
    </Card>
    <Modal
      v-model="modal1"
      title="物品详情"
      width="800px"
    >

      <Row>
        <Col span="8">
        <Avatar
          shape="square"
          style="width: 100px; height: 150px"
          :src="item.photo"
        >
        </Avatar>
        </Col>
        <Col span="16">
        <h1>茶品名称：{{item.name}}</h1>
        <h1>茶品价格：￥{{item.price}}</h1>
        <InputNumber
          v-model="itemvalue"
          size="large"
          min="1"
          style="margin:20px 0; width: 100px"
        ></InputNumber>
        <Button type="primary">加入购物车</Button>
        </Col>
      </Row>
      <Divider dashed />
      <h2>类型：{{item.type}}</h2>
      <h2>产地：{{item.position}}</h2>
      <h2>描述：{{item.description}}</h2>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  filters: {
    ellipsis (value) {
      if (!value) { return '' }
      if (value.length > 8) {
        return value.slice(0, 60) + '...'
      }
      return value
    }
  },
  props: {
    item: Object
  },
  data () {
    return {
      modal1: false,
      itemvalue: 1
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/shoppage.css";
</style>