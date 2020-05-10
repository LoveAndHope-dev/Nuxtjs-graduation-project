<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <a class="pure-menu-heading">TeaHub-Chakela的文章页 </a>
      <ul class="pure-menu-list">
        <nuxt-link to="/">
          <li class="pure-menu-item">
            <a class="pure-menu-link">返回主页</a>
          </li>
        </nuxt-link>
      </ul>
    </div>
    <div
      class="banner"
      style="background: transparent url('./alberta-2297204_1920.jpg') 0 0 no-repeat fixed;"
    >
      <div class="banner-head">
        欢迎来到Teahub-Chakela<br>
        <Input
          v-model="value"
          search
          enter-button
          @on-search="searchArticle"
          placeholder="你要查询什么文章"
          style="margin:0 auto;;width: 40%; opacity:0.75"
        />
      </div>
    </div>
    <div
      class="l-content"
      style="background:#f5f7f9"
    >
      <div class="information pure-g">
        <div class="pure-u-1 pure-u-md-1-2">
          <Divider>所有文章</Divider>
          <div class="l-box">
            <div
              v-for="(item, index) in articles"
              :key="index"
              @click="goDetail(item.id)"
            >
              <articlemain :item="item" />
            </div>
            <Button
              v-if="isMore"
              long
              @click="loadMoreArticle"
            >———— 加载更多 ————</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xss from 'xss'
import axios from 'axios'
import articlemain from '@/components/indexpage/articlemain'
export default {
  components: {
    articlemain
  },
  async asyncData (ctx) {
    let { status, data: { code, result, isMore } } = await ctx.$axios.get('/article/getArticle')
    if (status === 200 && code === 0) {
      return {
        articles: result.filter(item => item._id.length).map(item => {
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
        }, isMore)
      }
    }
  },
  data () {
    return {
      isMore: true,
      pageSize: 4,
      page: 1,
      value: ''
    }
  },
  methods: {
    goDetail (id) {
      let routeUrl = this.$router.resolve({
        name: 'article-id',
        params: { id: id }
      });
      this.$router.push(routeUrl.href, '_blank');
    },
    searchArticle () {
      this.page = 1
      this.getArticleLists({ word: this.value })
    },
    loadMoreArticle () {
      this.getArticleLists({ page: ++this.page, loadMore: true, word: this.value });
    },
    async getArticleLists ({
      word = '',
      pageSize = 4,
      page = 1,
      loadMore = false
    }) {
      let { data: { code, result, isMore } } = await axios.get('/article/getArticle', {
        params: {
          word: word,
          pageSize: pageSize,
          page: page
        }
      });
      if (code == 0) {
        let more = result.filter(item => item._id.length).map(item => {
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
        console.log(isMore)
        this.isMore = isMore
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/common/pricing.css";
@media (min-width: 900px) {
  .banner {
    height: 800px;
  }

  .banner-head {
    font-size: 3em;
  }
}
</style>