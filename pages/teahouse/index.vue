<template>
  <div>
    <Divider>欢迎来到Teahub Chakela</Divider>
    <indexintroduce />
    <Row>
      <Col
        :xxl="15"
        :xl="24"
      >
      <Divider>最近新品</Divider>
      <indexnew />
      </Col>
      <Col :xxl="{span:8,offset:1}" :xl="24">
      <Divider>最新文章</Divider>
      <indexarticle />
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