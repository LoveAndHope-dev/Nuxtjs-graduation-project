<template>
  <div>
    <Card :bordered="false">
      <p slot="title">{{ title }}</p>
      <h1>{{ mycount }}</h1>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    count: String
  },
  data () {
    return {
      mycount: 0
    }
  },
  mounted () {
    var timer = setInterval(() => {
      if (this.mycount < this.count) {
        this.mycount++
      } else {
        clearInterval(timer)
      }
    }, 0);
  }
}
</script>

<style scoped>
</style>
