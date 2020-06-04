<template>
  <div>
    <Divider orientation="left">文章管理</Divider>
    <articlefunc @addArticleSubmit="addArticleSubmit" />
    <Divider orientation="left">文章列表</Divider>
    <articlecontent
      :articles="articles"
      :ismore="isMore"
      @getArticleLists="getArticleLists"
    />
  </div>
</template>

<script>
import xss from 'xss'
import axios from 'axios'
import articlecontent from '@/components/admin/adminpage/articlemanage/article_content'
import articlefunc from '@/components/admin/adminpage/articlemanage/article_func'
export default {
  components: {
    articlecontent,
    articlefunc
  },
  async asyncData (ctx) {
    let { status: amstatus, data: { amcode, amresult, isMore } } = await ctx.$axios.get('/manager/article_manage/getArticle')
    if (amstatus === 200 & amcode === 0) {
      return {
        articles: amresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.articlename,
            date: item.articledate,
            text: xss(item.articletext, {
              onTagAttr: function (tag, name, value, isWhiteAttr) {
                if (tag === 'img') {
                  if (name === 'src') {
                    if (value.substr(0, 5) === 'data:') {
                      return name + '="' + value + '"';
                    }
                  }
                }
              }
            })
          }
        }),
        isMore
      }
    }
  },
  data () {
    return {
      article: Array,
      isMore: true
    }
  },
  methods: {
    async addArticleSubmit (formData) {
      let { status, data: { code, msg, result } } = await this.$axios.post(`/manager/article_manage/addarticle`, formData, {
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
        this.getArticleLists({page: 1})
        this.$Message.success('添加成功')
      }
    },
    async getArticleLists ({
      word = '',
      pageSize = 15,
      page = 1,
      loadMore = false
    }) {
      let { data: { amcode, amresult, isMore } } = await this.$axios.get('/manager/article_manage/getArticle', {
        params: {
          word: word,
          pageSize: pageSize,
          page: page
        }
      });
      if (amcode == 0) {
        let more = amresult.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            name: item.articlename,
            date: item.articledate,
            text: xss(item.articletext, {
              onTagAttr: function (tag, name, value, isWhiteAttr) {
                if (tag === 'img') {
                  if (name === 'src') {
                    if (value.substr(0, 5) === 'data:') {
                      return name + '="' + value + '"';
                    }
                  }
                }
              }
            })
          }
        })
        this.articles = loadMore
          ? [...this.articles, ...more]
          : more;
        this.isMore = isMore
      }
    }
  }
}
</script>

<style scoped>
</style>