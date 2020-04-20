<template>
  <div>
    <Tabs value="name1">
      <TabPane
        label="未完成的订单"
        name="name1"
      >
        <Row :gutter="16">
          <Col
            span="12"
            v-for="(item, index) in ordersList"
            :key="index"
          >
          <unfinishedorder :data="item" />
          </Col>
        </Row>
        <Button
          v-if="isMore"
          long
          @click="loadMore"
        >———— 加载更多 ————</Button>
      </TabPane>
      <TabPane
        label="标签二"
        name="name2"
      >标签二的内容</TabPane>
      <TabPane
        label="标签三"
        name="name3"
      >标签三的内容</TabPane>
    </Tabs>
  </div>

</template>

<script>
import axios from 'axios'
import unfinishedorder from '@/components/frontplatform/frontpage/order/unfinishedorder.vue'
export default {
  components: {
    unfinishedorder
  },
  async asyncData (ctx) {
    let { data: { code, data, isMore } } = await ctx.$axios.get('/teahouse/order/getOrder')
    return { ordersList: data, isMore };
  },
  data () {
    return {
      ordersList: [],
      isMore: true,
      isLoading: false,
      pageSize: 2,
      page: 1
    };
  },
  methods: {
    loadMore () {
      this.getOrderLists({ page: ++this.page, loadMore: true });
    },
    async getOrderLists ({
      pageSize = 2,
      page = 1,
      loadMore = false
    }) {
      let { data: { code, data, isMore } } = await axios.get('/teahouse/order/getOrder', {
        params: {
          pageSize: pageSize,
          page: page
        }
      });
      if (code == 200) {
        this.ordersList = loadMore
          ? [...this.ordersList, ...data]
          : data;
        console.log(isMore)
        this.isMore = isMore
      }
    }
  }
}
</script>

<style scoped>
</style>