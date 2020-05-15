<template>
  <card>
    <Tabs>
      <TabPane label="查询订单">
        <Input
          v-model="searchorderForm.id"
          search
          enter-button
          @on-search="searchorderSubmit()"
          placeholder="你要查询什么茶品"
          style="margin:20px 0"
        />
        <Table
          border
          height="500"
          :columns="orderColumns"
          :data="orders"
        >
          <template
            slot-scope="{ row }"
            slot="id"
          >
            <strong>{{ row.id }}</strong>
          </template>
        </Table>
        <Button
          :disabled="!ismore"
          long
          @click="loadMore"
        >———— 加载更多 ————
        </Button>
      </TabPane>
    </Tabs>
  </card>
</template>

<script>
import expandRow from './order_expand'
export default {
  props: {
    orders: Array,
    ismore: Boolean
  },
  data () {
    return {
      modal1: false,
      pageSize: 12,
      page: 1,
      orderColumns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '订单号',
          key: 'id'
        },
        {
          title: '处理人员',
          key: 'name'
        },
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '桌位',
          key: 'table'
        }
      ],
      searchorderForm: {

      }
    }
  },
  methods: {
    loadMore () {
      this.$emit('getOrderLists', { page: ++this.page, loadMore: true, word: this.searchorderForm.id });
    },
    searchorderSubmit () {
      this.page = 1
      this.$emit('getOrderLists', { word: this.searchorderForm.id })
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>