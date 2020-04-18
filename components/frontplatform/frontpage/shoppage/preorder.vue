<template>
  <card>
    <Table
      border
      :columns="preorder"
      :data="preorderitem"
      show-summary
    >
      <template
        slot-scope="scope"
        slot="name"
      >
        <strong>{{ scope.row.name }}</strong>
      </template>
      <template
        slot-scope="{ row, index }"
        slot="action"
      >
        <Button
          type="error"
          size="small"
          @click="remove(index)"
        >Delete</Button>
      </template>
    </Table>
    <Row>
      <Col
        span="8"
        offset="16"
      >
      <h1 class="total_cost">总价：{{ totalcost }}</h1>
      <div class="preorder_button_group">
        <Select
          style="width:200px"
        >
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
        <Button type="primary">下单</Button>
        <Button>清空</Button>
      </div>
      </Col>
    </Row>

  </card>
</template>

<script>
export default {
  data () {
    return {
      selectData: [],
      totalcost: Number,
      tablenumber: Number,
      preorder: [
        {
          title: '商品名',
          slot: 'name'
        },
        {
          title: '单价',
          key: 'price'
        },
        {
          title: '数量',
          key: 'quantity',
          render: (h, params) => {
            return h('div', [
              h('InputNumber', {
                props: {
                  min: 1,
                  value: params.row.quantity
                },
                on: {
                  'on-change': e => {
                    params.row.quantity = e
                    this.preorderitem[params.index] = params.row;
                    let str = params.row.price * params.row.quantity;
                    this.$set(this.preorderitem[params.index], 'cost', str)
                    this.selectData.forEach((v, index) => {
                      if (v.name == params.row.name) {
                        this.selectData.splice(index, 1, params.row);
                      }
                    });
                  }
                }
              })
            ])
          }
        },
        {
          title: '消费金额',
          key: 'cost',
          render: (h, params) => {
            if (!params.row.cost) {
              let str = params.row.price * params.row.quantity;
              let total = this.preorderitem.map(row => row.price * row.quantity).reduce((acc, cur) => (parseFloat(cur) + acc), 0)
              this.$set(this.preorderitem[params.index], 'cost', str)
              return h('span', {}, str)
            } else {
              return h('span', {}, params.row.cost)
            }
          }
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      preorderitem: [
        {
          name: '柠檬茶',
          price: 11,
          quantity: 2
        },
        {
          name: '绿茶',
          price: 11,
          quantity: 2
        },
        {
          name: '蓝莓茶',
          price: 11,
          quantity: 2
        },
        {
          name: '小蛋糕',
          price: 11,
          quantity: 2
        }
      ]
    }
  },
  methods: {
    remove (index) {
      this.preorderitem.splice(index, 1);
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/shoppage.css";
</style>