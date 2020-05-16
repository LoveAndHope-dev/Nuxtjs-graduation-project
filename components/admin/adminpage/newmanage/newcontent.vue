<template>
  <Card>
    <Tabs>
      <TabPane label="预览图片">
        <Carousel
          autoplay
          class="new_card"
        >
          <CarouselItem
            v-for="(item, index) in photos.slice(0,5)"
            :key="index"
          >
            <img
              style=" width: 100%"
              v-lazy="item.photo"
            />
          </CarouselItem>
        </Carousel>
        <Divider> 图片列表</Divider>
        <Table
          border
          height="300"
          :columns="teaColumns"
          :data="photos"
        >
          <template
            slot-scope="{ row }"
            slot="id"
          >
            <strong>{{ row.id }}</strong>
          </template>
          <template
            slot-scope="{ row, index }"
            slot="action"
          >
            <Button
              type="error"
              size="small"
              @click="remove(index)"
            >删除</Button>
          </template>
        </Table>
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>
export default {
  props: {
    photos: null
  },
  data () {
    return {
      photo: [],
      teaColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'id',
          slot: 'id'
        },
        {
          title: 'Action',
          width: '150px',
          slot: 'action',
          align: 'center'
        }
      ],
      value3: 0
    }
  },
  methods: {
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.photos[index].id)
      let { status, data: { code, msg, removeID } } = await this.$axios.post(`/manager/new_manage/deletePhoto`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.$Message.success('删除成功,正在刷新')
        setTimeout(function () { location.reload() }, 1000);
      }
    }
  }
}
</script>
<style scoped>
.new_card {
  width: 700px;
  height: 210px;
  margin: 25px auto;
}
</style>