<template>
  <div>
    <Card style="margin:15px 0">
      <div slot="title">
        <h1>{{item.name}}</h1>
        <h2>{{item.date}}</h2>
      </div>
      <div v-html="ellipsis(item.text)"></div>
    </Card>
    <Modal
      v-model="modal1"
      title="文章详情"
      width="1000px"
    >
      <h2>{{item.name}}</h2>
      <Divider dashed />
      <h3>{{item.date}}</h3>
      <Divider dashed />
      <div v-html="item.text"></div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  filters: {
    ellipsis (value) {
      if (!value) { return '' }
      if (value.length > 8) {
        return value.slice(0, 300) + '...'
      }
      return value
    }
  },
  props: {
    item: null
  },
  data () {
    return {
      modal1: false
    }
  }
}
Vue.prototype.ellipsis = function (value) {
  if (!value) { return '' }
  if (value.length > 8) {
    return value.slice(0, 300) + '...'
  }
  return value
};
</script>