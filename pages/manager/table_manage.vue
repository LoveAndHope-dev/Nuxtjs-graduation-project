<template>
  <div>
    <Divider orientation="left">桌位管理</Divider>
    <card>
      <Row>
        <Col span="8">
        <tablefunc />
        </Col>
        <Col offset="2" span="14">
        <tablecontent />
        </col>
      </Row>
    </card>
  </div>
</template>

<script>
import tablecontent from '@/components/admin/adminpage/tablemanage/table_content'
import tablefunc from '@/components/admin/adminpage/tablemanage/table_func'
export default {
  components: {
    tablecontent,
    tablefunc
  },
  data () {
    return {
      persons: Array
    }
  }
}
</script>

<style scoped>
</style>