<style scoped>
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="2">
      <img
        class="expand-value"
        v-lazy="picture"
        style="width: 100%"
      />
      </Col>
      <Col span="9" offset="2">
      <span class="expand-key">邮箱: </span>
      <span class="expand-value">{{ row.email }}</span>
      </Col>
      <Col span="9" offset="2">
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
  },
  data () {
    return {
      picture: this.row.photo
    }
  }
};
</script>
