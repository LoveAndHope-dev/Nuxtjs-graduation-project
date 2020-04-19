<template>
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
    <TabPane
      label="已加入的预订单"
      name="preorder"
    >
      <preorder />
    </TabPane>
  </Tabs>
</template>

<script>
import { mapState } from 'vuex'
import itemcard from '@/components/frontplatform/frontpage/shoppage/itemcard'
import cakecard from '@/components/frontplatform/frontpage/shoppage/cakecard'
import preorder from '@/components/frontplatform/frontpage/shoppage/preorder'
export default {
  components: {
    itemcard,
    cakecard,
    preorder
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
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/shoppage.css";
</style>