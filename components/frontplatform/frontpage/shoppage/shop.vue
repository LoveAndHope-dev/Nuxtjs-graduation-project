<template>
  <Tabs>
    <TabPane
      label="茶品"
      name="tea"
    >
      <teacard />
    </TabPane>
    <TabPane
      label="茶点"
      name="cake"
    >
      <cakecard />
    </TabPane>
    <TabPane
      label="已加入的预订单"
      name="preorder"
    >
    <preorder />
    </TabPane>
  </Tabs>
</template>

<script>
import teacard from '@/components/frontplatform/frontpage/shoppage/teacard'
import cakecard from '@/components/frontplatform/frontpage/shoppage/cakecard'
import preorder from '@/components/frontplatform/frontpage/shoppage/preorder'
export default {
  components: {
    teacard,
    cakecard,
    preorder
  }
}
</script>

<style scoped>
</style>