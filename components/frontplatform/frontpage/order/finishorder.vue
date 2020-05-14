<style scoped>
@import "@/assets/frontpage/frontcomp/orderpage.css";
</style>
<template>
  <div>
    <Card>
      <div slot="title">
        <h3>已完成订单 流水号：{{data._id}}</h3><br />
        <h4>下单时间：{{data.ordertime}}，桌位：{{data.ordertable}}</h4>
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
  }
}
</script>