<template>
  <div>
    <Divider orientation="left">工作人员管理</Divider>
    <workerfunc />
    <Divider orientation="left">人员列表</Divider>
    <workercontent />
  </div>
</template>

<script>
import workercontent from '@/components/admin/adminpage/workermanage/worker_content'
import workerfunc from '@/components/admin/adminpage/workermanage/worker_func'
export default {
  components: {
    workercontent,
    workerfunc
  }
}
</script>

<style scoped>
</style>