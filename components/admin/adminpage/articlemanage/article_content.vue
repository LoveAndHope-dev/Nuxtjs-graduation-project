<template>
  <div>
    <Modal
      v-model="modal1"
      title="文章详情"
      width="800px"
    >
      <h1>{{title}}</h1>
      <Divider dashed />
      <h2>{{time}}</h2>
      <Divider dashed />
      <div v-html="text"></div>
      <div slot="footer"></div>
    </Modal>
    <card>
      <Tabs>
        <TabPane label="查询文章">
          <Form
            :model="searcharticleForm"
            :label-width="80"
          >
            <Row>
              <Col span="12">
              <FormItem label="文章名称">
                <Input
                  v-model="searcharticleForm.name"
                  placeholder="Enter something..."
                ></Input>
              </FormItem>
              </Col>
              <Col
                offset="2"
                span="10"
              >
              <FormItem>
                <Button
                  type="primary"
                  @click="searchArticleSubmit()"
                >查询</Button>
              </FormItem>
              </col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
      <Table
        border
        height="500"
        :columns="articleColumns"
        :data="articles"
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
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="show(index)"
          >View</Button>
          <Button
            type="error"
            size="small"
            @click="remove(index)"
          >Delete</Button>
        </template>
      </Table>
    </card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    articles: Array
  },
  data () {
    return {
      articleColumns: [
        {
          title: '文章名称',
          key: 'name'
        },
        {
          title: '文章日期',
          key: 'date'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      searcharticleForm: {},
      modal1: false,
      text: '',
      title: '',
      time: ''
    }
  },
  methods: {
    show (index) {
      this.modal1 = true
      this.text = this.articles[index].text
      this.title = this.articles[index].name
      this.time = this.articles[index].date
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.articles[index].id)
      let { status, data: { code, msg, removeID } } = await axios.post(`/manager/article_manage/removearticle`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.articles.splice(index, 1);
        this.$Message.success('删除成功')
      }
    },
    searchArticleSubmit: async function () {
      let self = this
      let formData = new FormData()
      formData.append('articlename', self.searcharticleForm.name)
      this.$emit('searchArticleSubmit', formData)
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>