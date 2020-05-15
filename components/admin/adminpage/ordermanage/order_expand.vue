<style scoped>
</style>
<template>
  <div>
    <Table
      style="width:100%"
      :columns="columns1"
      :data="list"
    >
    </Table>
    <h2 style="text-align:right">总价：{{totalPrice}}</h2>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  data () {
    return {
      list: this.row.list,
      columns1: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '数量',
          key: 'num'
        },
        {
          title: '单个价格',
          key: 'price'
        }
      ]
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      let list = Array.from(this.list)
      list.forEach(item => {
        total += item.price * item.num;
      });
      return total;
    }
  }
};
</script>
