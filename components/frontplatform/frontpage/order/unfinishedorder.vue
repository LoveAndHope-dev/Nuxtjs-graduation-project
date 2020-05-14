<style scoped>
@import "@/assets/frontpage/frontcomp/orderpage.css";
</style>
<template>
  <div>
    <Card>
      <div slot="title">
        <Row>
          <Col span="20">
          <h3>未完成的订单 流水号：{{data._id}}</h3><br />
          <h4>下单时间：{{data.ordertime}}，桌位：{{data.ordertable}}</h4>
          </Col>
          <Col span="4">
          <Button
            type="success"
            @click="finishOrder"
          >完成订单</Button>
          </Col>
        </Row>
      </div>
      <Table
        style="width:100%"
        :columns="columns1"
        :data="data.orderlist"
      >
      </Table>
      <h2 class="total-cost">总价：{{totalPrice}}</h2>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data () {
    return {
      columns1: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '数量',
          key: 'num'
        },
        {
          title: '单个价格',
          key: 'price'
        },
        {
          title: '总体价格',
          key: 'cost',
          render: (h, params) => {
            return h('div', [
              h('p', params.row.num * params.row.price)
            ])
          }
        }
      ]
    }
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
  },
  methods: {
    async finishOrder () {
      let formdata = new FormData()
      formdata.append('orderid', this.data._id)
      formdata.append('tableid', this.data.ordertableid)
      let { status, data: { code } } = await this.$axios.post(`/teahouse/order/finishOrder`, formdata, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (code === 0) {
        this.$Message.success('您已经完成订单，正在刷新页面')
        setTimeout(function () { location.reload() }, 1000);
      } else {
        this.$Message.serror('出错请重试')
      }
    }
  }
}
</script>