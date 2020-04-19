<template>
  <div>
    <Modal
      v-model="modal1"
      title="文章详情"
      width="800px"
    >
      <h1>{{title}}</h1>
      <h2>{{time}}</h2>
      <h3>{{text}}</h3>
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
                  @click="searcharticleSubmit()"
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
        :data="article"
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
import { mapState } from 'vuex'
export default {

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
  computed: {
    ...mapState({ article: state => state.articlemanage.article.article })
  },
  methods: {
    show (index) {
      this.modal1 = true
      this.text = this.article[index].text
      this.title = this.article[index].name
      this.time = this.article[index].date
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.article[index].id)
      await this.$store.dispatch('articlemanage/removearticleSubmit', formData)
    },
    searcharticleSubmit: async function () {
      let self = this
      let formData = new FormData()
      formData.append('articlename', self.searcharticleForm.name)
      await this.$store.dispatch('articlemanage/searcharticleSubmit', formData)
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>