<style scoped>
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">照骗: </span>
      <Avatar
        class="expand-value"
        shape="square"
        icon="ios-person"
        size="large"
        :src="picture"
        style="width: 50px; height: 70px"
      />
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
  },
  data () {
    return {
      picture: this.row.photo
    }
  }
};
</script>
