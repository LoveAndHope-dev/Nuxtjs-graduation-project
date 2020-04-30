<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <a class="pure-menu-heading">TeaHub-Chakela的文章页 </a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a
            href="/"
            class="pure-menu-link"
          >返回主页</a>
        </li>
      </ul>
    </div>
    <div
      class="banner"
      style="background: transparent url('./alberta-2297204_1920.jpg') 0 0 no-repeat fixed;"
    >
      <h1 class="banner-head">
        欢迎来到Teahub-Chakela
      </h1>
    </div>
    <div
      class="l-content"
      style="background:#f5f7f9"
    >
      <div class="information pure-g">
        <div class="pure-u-1 pure-u-md-1-2">
          <Divider>所有文章</Divider>
          <div class="l-box">
            <Row>
              <Col
                v-for="item in articles"
                :key="item.name"
              >
               <articlemain :item="item" />
              </Col>
            </Row>
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
            text: item.articletext
          }
        }, isMore)
      }
    }
  },
  data () {
    return {
      isMore: true,
      pageSize: 4,
      page: 1
    }
  },
  methods: {
    loadMoreArticle () {
      this.getArticleLists({ page: ++this.page, loadMore: true });
    },
    async getArticleLists ({
      pageSize = 4,
      page = 1,
      loadMore = false
    }) {
      let { data: { code, result, isMore } } = await axios.get('/article/getArticle', {
        params: {
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
            text: item.articletext
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