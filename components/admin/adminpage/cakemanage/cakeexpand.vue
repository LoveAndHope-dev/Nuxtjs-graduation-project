<style scoped>
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="2">
      <img
        class="expand-value"
        v-lazy="picture"
        style="width:100%"
      />
      </Col>
      <Col span="20" offset="2">
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
