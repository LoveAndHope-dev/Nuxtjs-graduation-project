<template>
  <div>
    <Card style="margin:15px 0">
      <div slot="title">
        <h1>{{item.name}}</h1>
        <h2>{{item.date}}</h2>
      </div>
      <div v-html="ellipsis(item.text)"></div>
    </Card>
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