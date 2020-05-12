<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <nuxt-link to="/article">
          <li class="pure-menu-item">
            <a class="pure-menu-link">返回文章页</a>
          </li>
        </nuxt-link>
        <nuxt-link to="/">
          <li class="pure-menu-item">
            <a class="pure-menu-link">返回主页</a>
          </li>
        </nuxt-link>
      </ul>
    </div>
    <div class="banner b-background3">
      <div class="banner-head">
        {{article.name}}<br />
        {{article.date}}
      </div>
    </div>
    <div
      class="l-content"
      style="background:#f5f7f9"
    >
      <div class="information pure-g">
        <div class="pure-u-1 pure-u-md-1-2">
          <Divider>正文内容</Divider>
          <div class="l-box">
            <Card>
              <div v-html="article.text"></div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xss from 'xss'
export default {
  data () {
    return {
      article: {
        name: String,
        id: Number,
        text: String,
        data: String
      }
    }
  },
  async mounted () {
    let id = this.$route.params.id;
    let { status, data: { code, result } } = await this.$axios.get('/article/getArticleDetails', {
      params: { id: id }
    })
    if (code === 0 & status === 200) {
      this.article.name = result.articlename
      this.article.id = result._id
      this.article.text = xss(result.articletext, {
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
      this.article.date = result.articledate
    }
  }
}
</script>

<style scoped>
@import "@/assets/common/pricing.css";
</style>