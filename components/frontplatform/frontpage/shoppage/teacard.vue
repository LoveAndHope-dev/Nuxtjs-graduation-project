<template>
  <div>
    <Row>
      <Col
        :xl="6"
        :lg="12"
        :xs="24"
        class="shop_item_div"
        v-for="item in teaitem"
        :key="item.name"
      >
      <Card class="shop_item_card">
        <Row>
          <Col span="7">
          <img
            :src="item.img"
            class="shop_item_img"
          ></Col>
          <Col
            span="15"
            offset="2"
          >
          <h2>{{item.name}}</h2>
          <h1>￥{{item.cost}}</h1>
          <h4>口味：{{item.taste}}</h4>
          <h4>描述：{{item.desc}}</h4>
          <h4>原配方产地：{{item.position}}</h4>
          <Button
            type="primary"
            shape="circle"
            icon="ios-cart-outline"
            class="shop_item_button"
          >加入预订单</Button>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      teaitem: [
        {
          img: '/teaimg/tea1.PNG',
          name: '蓝莓茶',
          cost: 11,
          desc: '带有甜味的果茶，可以令人神清气爽，沁人心脾的蓝莓气味可以让人陶醉其中',
          taste: '甜',
          position: '吉林'
        },
        {

          img: '/teaimg/tea2.PNG',
          name: '柠檬茶',
          cost: 11,
          desc: '🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋',
          taste: '甜酸',
          position: '吉林'
        },
        {
          img: '/teaimg/tea3.PNG',
          name: '树莓茶',
          cost: 11,
          desc: '带有甜味的果茶，可以令人神清气爽，沁人心脾的蓝莓气味可以让人陶醉其中',
          taste: '甜',
          position: '吉林'
        },
        {

          img: '/teaimg/tea4.PNG',
          name: '蓝梅气泡水',
          cost: 11,
          desc: '带有甜味的果茶，可以令人神清气爽，沁人心脾的蓝莓气味可以让人陶醉其中',
          taste: '甜',
          position: '吉林'
        }
      ]
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/shoppage.css";
</style>