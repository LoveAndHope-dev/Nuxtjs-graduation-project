<template>
  <div>
    <div
      class="banner"
      style="background: transparent url('../landscape-1622739_1920.jpg') 0 0 no-repeat fixed;"
    >
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
      this.article.text = result.articletext
      this.article.date = result.articledate
    }
  }
}
</script>

<style scoped>
@import "@/assets/common/pricing.css";
@media (min-width: 900px) {
  .banner {
    height: 500px;
  }

  .banner-head {
    font-size: 3em;
  }
}
</style>