<template>
  <div>
    <Divider orientation="left">管理员管理</Divider>
    <managerfunc />
    <Divider orientation="left">人员列表</Divider>
    <managercontent />
  </div>
</template>

<script>
import managerfunc from '@/components/admin/adminpage/managermanage/manager_func'
import managercontent from '@/components/admin/adminpage/managermanage/manager_content'
export default {
  components: {
    managercontent,
    managerfunc
  }
}
</script>

<style scoped>
</style>