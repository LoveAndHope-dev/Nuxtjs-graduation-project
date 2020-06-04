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
              v-for="(item, index) in finordersList"
            >
              <finishorder :data="item" />
            </div>
          </div>
        </no-ssr>
        <Button
          v-if="finisMore"
          long
          @click="finloadMore"
        >———— 加载更多 ————</Button>
      </TabPane>
    </Tabs>
  </div>

</template>

<script>
import axios from 'axios'
import NoSSR from 'vue-no-ssr'
import unfinishedorder from '@/components/frontplatform/frontpage/order/unfinishedorder.vue'
import finishorder from '@/components/frontplatform/frontpage/order/finishorder.vue'
export default {
  components: {
    'no-ssr': NoSSR,
    unfinishedorder,
    finishorder
  },
  async asyncData (ctx) {
    let [
      { data: { code, data, isMore } },
      { data: { fincode, findata, finisMore } }
    ] = await Promise.all([
      ctx.$axios.get('/teahouse/order/getOrder'),
      ctx.$axios.get('/teahouse/order/getfinishOrder')
    ])
    return { ordersList: data, isMore, finordersList: findata, finisMore };
  },
  data () {
    return {
      ordersList: [],
      finordersList: [],
      isMore: true,
      isLoading: false,
      pageSize: 2,
      page: 1,
      finpage: 1
    };
  },
  mounted () {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    loadMore () {
      this.getOrderLists({ page: ++this.page, loadMore: true });
    },
    finloadMore () {
      this.getfinOrderLists({ finpage: ++this.finpage, loadMore: true });
    },
    async getOrderLists ({
      pageSize = 2,
      page = 1,
      loadMore = false
    }) {
      let { data: { code, data, isMore } } = await this.$axios.get('/teahouse/order/getOrder', {
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
    },
    async getfinOrderLists ({
      pageSize = 2,
      finpage = 1,
      loadMore = false
    }) {
      let { data: { fincode, findata, finisMore } } = await this.$axios.get('/teahouse/order/getfinishOrder', {
        params: {
          pageSize: pageSize,
          finpage: finpage
        }
      });
      if (fincode == 200) {
        this.finordersList = loadMore
          ? [...this.finordersList, ...findata]
          : data;
        console.log(finisMore)
        this.finisMore = finisMore
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/orderpage.css";
</style>