<template>
  <div>
    <Divider orientation="left">文章管理</Divider>
    <articlefunc />
    <Divider orientation="left">文章列表</Divider>
    <articlecontent />
  </div>
</template>

<script>
import articlecontent from '@/components/admin/adminpage/articlemanage/article_content'
import articlefunc from '@/components/admin/adminpage/articlemanage/article_func'
export default {
  components: {
    articlecontent,
    articlefunc
  }
}
</script>

<style scoped>
</style>