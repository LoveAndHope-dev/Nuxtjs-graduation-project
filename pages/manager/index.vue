<template>
  <div>
    <Divider orientation="left">主页</Divider>
    <Row :gutter="16">
      <Col span="8">
      <indexcard
        title="今日新增点餐数"
        count="20"
      ></indexcard>
      </Col>
      <Col span="8">
      <indexcard
        title="今日营业额"
        count="510"
      ></indexcard>
      </Col>
      <Col span="8">
      <indexcard
        title="总工作人员"
        count="56"
      ></indexcard>
      </Col>
    </Row>
    <Card :style="{margin: '50px 0',height: '400px'}">
    </Card>
  </div>
</template>

<script>
import indexcard from '@/components/admin/adminpage/indexpage/index_card'
export default {
  components: {
    indexcard
  }
}
</script>

<style scoped>
</style>