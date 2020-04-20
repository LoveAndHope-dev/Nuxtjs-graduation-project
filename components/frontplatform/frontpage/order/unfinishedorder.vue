<template>
  <div>
    <Card :bordered="false" style="margin:20px 0">
      <h2
        slot="title"
        style="height: 40px"
      >
        <Row>
          <Col span="20">未完成的订单：订单流水号：{{data._id}}<br>下单时间：{{data.ordertime}}，桌位：{{data.ordertable}}</Col>
          <Col span="4">
          <Button type="success">完成订单</Button>
          </Col>
        </Row>
      </h2>
      <div
        v-for="item in data.orderlist"
        :key="item._id"
        style="margin: 20px 50px"
      >
        <Row>
          <Col span="6">
          <img :src="item.photo" width="100px">
          </Col>
          <Col span="18">
          <h2>商品名称：{{item.name}}</h2>
          <h2>选择数量：{{item.num}}</h2>
          <h2>单个价格：{{item.price}}</h2>
          <h2>总体价格：{{item.num * item.price}}</h2>
          </Col>
        </Row>
        <Divider></Divider>
      </div>
      <h2 style="margin:0 150px">总价：{{totalPrice}}</h2>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  computed: {
    totalPrice () {
      let total = 0;
      let list = Array.from(this.data.orderlist)
      list.forEach(item => {
        total += item.price * item.num;
      });
      return total;
    }
  }
}
</script>