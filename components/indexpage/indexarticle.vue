<template>
  <div>
    <Row>
      <Col
        :xl="6"
        :sm="12"
        v-for="item in articles"
        :key="item.name"
      >
      <div class="index_article_div">
        <Card class="index_article_card">
          <h3 slot="title">{{item.name}}</h3>
          <div v-html="$options.filters.ellipsis(item.text)"></div>
        </Card>
      </div>
      </Col>
    </Row>

  </div>
</template>

<script>
export default {
  filters: {
    ellipsis (value) {
      if (!value) { return '' }
      if (value.length > 8) {
        return value.slice(0, 100) + '...'
      }
      return value
    }
  },
  props: {
    articles: Array
  },
  data () {
    return {
     
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/indexpage.css";
</style>