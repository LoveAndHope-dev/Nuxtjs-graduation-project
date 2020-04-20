<template>
  <div @click="modal1 = true">
    <Card class="shop_item_card">
      <Row>
        <Col span="12">
        <Avatar
          shape="square"
          style="width: 150px; height: 150px"
          :src="item.photo"
        >
        </Avatar>
        </Col>
        <Col span="12">
        <Row>
          <Col span="12">
          <h2>{{item.name}}</h2>
          </Col>
          <Col span="12">
          <h2>￥{{item.price}}</h2>
          </Col>
        </Row>
        <h4>类型：{{item.type}}</h4>
        <h4>口味：{{item.taste}}</h4>
        <h4>描述：{{item.description | ellipsis}}</h4>
        </Col>
      </Row>
    </Card>
    <Modal
      v-model="modal1"
      title="物品详情"
      width="800px"
    >

      <Row>
        <Col span="8">
        <Avatar
          shape="square"
          style="width: 150px; height: 150px"
          :src="item.photo"
        >
        </Avatar>
        </Col>
        <Col span="16">
        <h1>茶品名称：{{item.name}}</h1>
        <h1>价格：￥{{item.price*itemvalue}}</h1>
        <InputNumber
          v-model="itemvalue"
          size="large"
          :min="1"
          :editable="true"
          style="margin:20px 0; width: 100px"
        ></InputNumber>
        <Button
          type="primary"
          style="margin:20px"
          size="large"
          @click="onSubmit"
        >加入购物车</Button>
        </Col>
      </Row>
      <Divider dashed />
      <h2>类型：{{item.type}}</h2>
      <h2>口味：{{item.taste}}</h2>
      <h2>描述：{{item.description}}</h2>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  filters: {
    ellipsis (value) {
      if (!value) { return '' }
      if (value.length > 8) {
        return value.slice(0, 100) + '...'
      }
      return value
    }
  },
  props: {
    item: Object
  },
  data () {
    return {
      modal1: false,
      itemvalue: 1
    }
  },
  methods: {
    async onSubmit () {
      let formData = new FormData()
      formData.append('cakeId', this.item.id)
      formData.append('cakenum', this.itemvalue)
      let { status, data: { code, msg } } = await axios.post('/teahouse/shop/addCake', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.$Message.success(msg)
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/shoppage.css";
</style>