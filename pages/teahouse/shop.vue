<template>
  <div>
    <Divider>老哥你要吃点啥，来点老八秘制小憨包？</Divider>
    <Drawer
      v-model="value1"
      width="30"
    >
      <div slot="header">
        <h2>您的预订单</h2>
        <Row :gutter="16">
          <Col :span="12">
          <Button
            type="success"
            class="drawer-header-button"
            long
          >下单</Button>
          </Col>
          <Col :span="12">
          <Button
            type="error"
            class="drawer-header-button"
            long
          >清空</Button>
          </Col>
        </Row>
      </div>
      <cartlist :cartitem="cartitem" />
    </Drawer>
    <Button
      type="success"
      long
      @click="openCart()"
    >打开你的预订单</Button>
    <Tabs>
      <TabPane
        label="茶品"
        name="tea"
      >
        <Row>
          <Col
            :xl="8"
            :md="12"
            :xs="24"
            class="shop_item_div"
            v-for="item in drink"
            :key="item.name"
          >
          <itemcard :item="item" />
          </Col>
        </Row>
      </TabPane>
      <TabPane
        label="茶点"
        name="cake"
      >
        <Row>
          <Col
            :xl="8"
            :md="12"
            :xs="24"
            class="shop_item_div"
            v-for="item in cake"
            :key="item.name"
          >
          <cakecard :item="item" />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import itemcard from '@/components/frontplatform/frontpage/shoppage/itemcard'
import cakecard from '@/components/frontplatform/frontpage/shoppage/cakecard'
import cartlist from '@/components/frontplatform/frontpage/shoppage/cartlist'
export default {
  components: {
    itemcard,
    cakecard,
    cartlist
  },
  async asyncData (ctx) {
    let [
      { status: thtstatus, data: { thtcode, thtresult } },
      { status: thcstatus, data: { thccode, thcresult } }
    ] = await Promise.all([
      ctx.$axios.get('/teahouse/shop/getTea'),
      ctx.$axios.get('/teahouse/shop/getCake')
    ])
    if (thtstatus === 200 & thtcode === 0 & thcstatus === 200 & thccode === 0) {
      return {
        drink: thtresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.drinkname,
            price: item.drinkprice,
            description: item.drinkdescription,
            type: item.drinktype,
            position: item.drinkposition,
            photo: item.drinkphoto
          }
        }),
        cake: thcresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.cakename,
            price: item.cakeprice,
            description: item.cakedescription,
            type: item.caketype,
            taste: item.caketaste,
            photo: item.cakephoto
          }
        })
      }
    }
  },
  data () {
    return {
      value1: false,
      cartitem: {}
    }
  },
  methods: {
    async openCart () {
      this.value1 = true
      let { status, data: { code, result } } = await axios.get('/teahouse/shop/getCart')
      if (status === 200 & code === 0) {
        this.cartitem = result.filter(item => item.goodsId.length).map(item => {
          return {
            id: item.goodsId,
            price: item.goodsPrice,
            photo: item.goodsPhoto,
            name: item.goodsName,
            check: item.checked,
            num: item.goodsNum
          }
        })
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/shoppage.css";
</style>