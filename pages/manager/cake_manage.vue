<template>
  <div>
    <Divider orientation="left">茶点管理</Divider>
    <cakefunc />
    <Divider orientation="left">茶点列表</Divider>
    <cakecontent />
  </div>

</template>

<script>
import cakecontent from '@/components/admin/adminpage/cakemanage/cake_content'
import cakefunc from '@/components/admin/adminpage/cakemanage/cake_func'
export default {
  components: {
    cakecontent,
    cakefunc
  }
}
</script>

<style scoped>
</style>