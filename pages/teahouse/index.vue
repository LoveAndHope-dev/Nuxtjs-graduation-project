<template>
  <div>
    <Divider>欢迎来到Teahub Chakela</Divider>
    <indexintroduce />
    <Row>
      <Col span="24">
      <Divider>最近新品</Divider>
      <indexnew />
      </Col>
      <Col span="24">
      <Divider>最新文章</Divider>
      <indexarticle />
      <Button to="/teahouse/article" long>>>>>>查看更多文章</Button>
      </Col>
    </Row>
  </div>

</template>

<script>
import indexarticle from '@/components/frontplatform/frontpage/indexpage/indexarticle'
import indexintroduce from '@/components/frontplatform/frontpage/indexpage/indexintroduce'
import indexnew from '@/components/frontplatform/frontpage/indexpage/indexnew'
export default {
  components: {
    indexarticle,
    indexintroduce,
    indexnew
  }
}
</script>