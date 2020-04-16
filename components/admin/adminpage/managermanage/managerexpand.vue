<style scoped>
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">照骗: </span>
      <span class="expand-value">{{ row.photo }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">邮箱: </span>
      <span class="expand-value">{{ row.email }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">手机号码: </span>
      <span class="expand-value">{{ row.phonenumber }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>
