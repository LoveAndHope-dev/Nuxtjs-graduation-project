<template>
  <div>
    <Table
      border
      size="small"
      :columns="cart"
      :data="cartitem"
    >
      <template
        slot-scope="scope"
        slot="name"
      >
        <strong>{{ scope.row.name }}</strong>
      </template>
    </Table>
    <h2 style="text-align: right;margin-right: 15%">总价：{{totalPrice}}</h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    cartitem: null
  },
  data () {
    return {
      cart: [
        {
          title: '商品名',
          slot: 'name'
        },
        {
          title: '单价',
          key: 'price'
        },
        {
          title: '消费金额',
          key: 'money',
          render: (h, params) => {
            if (!params.row.money) {
              let str = params.row.price * params.row.num;
              this.$set(this.cartitem[params.index], 'money', str)
              return h('span', {}, str)
            } else {
              return h('span', {}, params.row.money)
            }
          }
        },
        {
          title: '操作',
          key: 'num',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('InputNumber', {
                props: {
                  min: 1,
                  value: params.row.num
                },
                on: {
                  'on-change': e => {
                    params.row.num = e
                    let str = params.row.price * params.row.num;
                    this.$set(this.cartitem[params.index], 'money', str)
                    this.changeNum(e, params.row.id)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'error'
                },
                style: {
                  margin: '0 10px'
                },
                on: {
                  click: e => {
                    this.deleteProduct(params.row.id, params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      let list = Array.from(this.cartitem)
      list.forEach(item => {
        total += item.money;
      });
      return total;
    }
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