<template>
  <div>
    <Row>
      <Col
        span="24"
        v-for="(item, index) in cartitem"
        :key="item.name"
      >
      <Card style="margin:20px 0">
        <Row>
          <Col span="9">
          <img
            style="width:100px"
            :src="item.photo"
          >
          </img>
          </Col>
          <Col
            span="14"
            offset="1"
          >
          <h3>商品名称：{{item.name}}</h3>
          <h3>价格：￥{{item.price * item.num}}</h3>
          <h3>单价：￥{{item.price}}</h3>
          <InputNumber
            v-model="item.num"
            size="large"
            :min="1"
            :editable="true"
            @on-change="changeNum($event, item.id)"
          ></InputNumber>
          <Icon
            type="ios-trash-outline"
            size="50"
            color="#ed4014"
            style="margin:0 50px;cursor:pointer"
            @click.stop="deleteProduct(item.id, index)"
          />
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    cartitem: null
  },
  methods: {
    async deleteProduct (id, index) {
      let res = await axios.delete('/teahouse/shop/deletePro', {
        params: {
          id: id
        }
      })
      if (res.status == 200) {
        this.$Message.success('删除成功!');
        this.cartitem.splice(index, 1);
      }
    },
    async changeNum (val, id) {
      // console.log(val, id)
      let formData = new FormData()
      formData.append('id', id)
      formData.append('num', val)
      let data = await axios.post('/teahouse/shop/updatePro', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      });
      if (!data.code == 200) {
        this.$Message.error(res.msg);
      }
    }
  }
}
</script>