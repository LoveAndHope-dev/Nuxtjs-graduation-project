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
          <Input
            v-model="searcharticleForm.name"
            search
            enter-button
            @on-search="searchArticleSubmit"
            placeholder="文章名字"
            style="margin:20px 0"
          />
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
          <Button
            :disabled="!ismore"
            long
            @click="loadMore"
          >———— 加载更多 ————
          </Button>
        </TabPane>
      </Tabs>
    </card>
  </div>
</template>

<script>
import xss from 'xss'
import axios from 'axios'
export default {
  props: {
    articles: Array,
    ismore: Boolean
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
      searcharticleForm: {
        name: ''
      },
      modal1: false,
      text: '',
      title: '',
      time: '',
      pageSize: 15,
      page: 1
    }
  },
  methods: {
    loadMore () {
      this.$emit('getArticleLists', { page: ++this.page, loadMore: true, word: this.searcharticleForm.name });
    },
    searchArticleSubmit () {
      this.page = 1
      this.$emit('getArticleLists', { word: this.searcharticleForm.name })
    },
    show (index) {
      this.modal1 = true
      this.text = this.articles[index].text
      this.title = this.articles[index].name
      this.time = this.articles[index].date
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.articles[index].id)
      let { status, data: { code, msg, removeID } } = await this.$axios.post(`/manager/article_manage/removearticle`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
         this.$emit('getArticleLists', { word: this.searcharticleForm.name })
        this.$Message.success('删除成功')
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>