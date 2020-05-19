<template>
  <div>
    <Card style="text-align: center">
      <h2>欢迎回来 {{infos[0].name}}</h2>
      <h2>今天又是充满希望的一天</h2>
    </Card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({ infos: state => state.usermodal.user.user })
  }
}
</script>

<style scoped>
</style>