<template>
  <div>
    <Row>
      <Col
        span="24"
        v-for="item in cartitem"
        :key="item.name"
      >
      <Card style="margin:20px 0">
        <Row>
          <Col span="7">
          <Avatar
            shape="square"
            size="100"
            :src="item.photo"
          >
          </Avatar>
          </Col>
          <Col
            span="16"
            offset="1"
          >
          <Row>
            <Col span="12">
            <h2>{{item.name}}</h2>
            </Col>
            <Col span="12">
            <h1>￥{{item.price}}</h1>
            </Col>
            <Col span="12">
            <InputNumber
              v-model="itemvalue"
              size="large"
              :min="1"
              :editable="true"
              style="margin:20px 0; width: 100px"
            ></InputNumber>
            </Col>
            <Col>
            </Col>
          </Row>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    cartitem: Object
  }
}
</script>