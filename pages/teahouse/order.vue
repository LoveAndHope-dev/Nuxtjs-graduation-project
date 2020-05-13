<template>
  <div>
    <Tabs value="name1">
      <TabPane
        label="未完成的订单"
        name="name1"
      >
        <no-ssr>
          <div
            v-masonry
            transition-duration="0.3s"
            item-selector=".item"
            class="masonry-container"
          >
            <div
              v-masonry-tile
              class="item order-container"
              :key="index"
              v-for="(item, index) in ordersList"
            >
              <unfinishedorder :data="item" />
            </div>
          </div>
        </no-ssr>
        
        <Button
          v-if="isMore"
          long
          @click="loadMore"
        >———— 加载更多 ————</Button>
      </TabPane>
      <TabPane
        label="已完成订单"
        name="name2"
      >标签二的内容</TabPane>
    </Tabs>
  </div>

</template>

<script>
import axios from 'axios'
import NoSSR from 'vue-no-ssr'
import unfinishedorder from '@/components/frontplatform/frontpage/order/unfinishedorder.vue'
export default {
  components: {
    'no-ssr': NoSSR,
    unfinishedorder
  },
  async asyncData (ctx) {
    let { data: { code, data, isMore } } = await ctx.$axios.get('/teahouse/order/getOrder')
    return { ordersList: data, isMore };
  },
  mounted () {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
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
@import "@/assets/frontpage/frontcomp/orderpage.css";
</style>