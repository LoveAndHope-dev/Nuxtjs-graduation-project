<template>
  <div>
    <Divider orientation="left">订单中心</Divider>
    <ordercontent
      :orders="orders"
      :ismore="isMore"
      @getOrderLists="getOrderLists"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ordercontent from '@/components/admin/adminpage/ordermanage/order_content'
export default {
  components: {
    ordercontent
  },
  async asyncData (ctx) {
    let { status: omstatus, data: { omcode, omresult, isMore } } = await ctx.$axios.get('/manager/order_manage/getOrder')
    if (omstatus === 200 & omcode === 0) {
      return {
        orders: omresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            time: item.ordertime,
            name: item.staffname,
            table: item.ordertable,
            list: item.orderlist
          }
        }),
        isMore
      }
    }
  },
  data () {
    return {
      order: Array
    }
  },
  methods: {
    async getOrderLists ({
      word = '',
      pageSize = 12,
      page = 1,
      loadMore = false
    }) {
      let { data: { omcode, omresult, isMore } } = await axios.get('/manager/order_manage/getOrder', {
        params: {
          word: word,
          pageSize: pageSize,
          page: page
        }
      });
      if (omcode == 0) {
        let more = omresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            time: item.ordertime,
            name: item.staffname,
            table: item.ordertable,
            list: item.orderlist
          }
        })
        this.orders = loadMore
          ? [...this.orders, ...more]
          : more;
        this.isMore = isMore
      } else if (omcode == -1) {
        this.$Message.error('请输入二十四位订单号谢谢合作')
      }
    }
  }
}
</script>

<style scoped>
</style>