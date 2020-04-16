<template>
  <div>
    <Divider orientation="left">茶品管理</Divider>
    <teafunc />
    <Divider orientation="left">茶品列表</Divider>
    <teacontent />
  </div>
</template>

<script>
import teafunc from '@/components/admin/adminpage/teamanage/tea_func'
import Teacontent from '@/components/admin/adminpage/teamanage/tea_content'
export default {
  components: {
    Teacontent,
    teafunc
  }
}
</script>

<style scoped>
</style>