<template>
  <div>
    <Divider orientation="left">文章管理</Divider>
    <articlefunc @addArticleSubmit="addArticleSubmit" />
    <Divider orientation="left">文章列表</Divider>
    <articlecontent :articles="articles" @searchArticleSubmit="searchArticleSubmit" />
  </div>
</template>

<script>
import axios from 'axios'
import articlecontent from '@/components/admin/adminpage/articlemanage/article_content'
import articlefunc from '@/components/admin/adminpage/articlemanage/article_func'
export default {
  components: {
    articlecontent,
    articlefunc
  },
  async asyncData (ctx) {
    let { status: amstatus, data: { amcode, amresult } } = await ctx.$axios.get('/manager/article_manage/getArticle')
    if (amstatus === 200 & amcode === 0) {
      return {
        articles: amresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.articlename,
            date: item.articledate,
            text: item.articletext
          }
        })
      }
    }
  },
  data () {
    return {
      article: Array
    }
  },
  methods: {
    async addArticleSubmit (formData) {
      let { status, data: { code, msg, result } } = await axios.post(`/manager/article_manage/addarticle`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.article = result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.articlename,
            date: item.articledate,
            text: item.articletext
          }
        })
        this.articles.push(this.article[0])
        this.$Message.success('添加成功')
      }
    },
    async searchArticleSubmit (formData) {
      let { status, data: { code, msg, result } } = await axios.post(`/manager/article_manage/searcharticle`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.articles = result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.articlename,
            date: item.articledate,
            text: item.articletext
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>