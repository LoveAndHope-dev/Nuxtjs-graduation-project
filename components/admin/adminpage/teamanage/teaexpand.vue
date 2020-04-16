<style scoped>
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="4">
      <span class="expand-key">照骗: </span>
      <Avatar
        class="expand-value"
        shape="square"
        icon="ios-person"
        size="large"
        :src="picture"
        style="width: 70px; height: 70px"
      />
      </Col>
      <Col span="20">
      <span class="expand-key">描述: </span>
      <span class="expand-value">{{ row.description }}</span>
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
