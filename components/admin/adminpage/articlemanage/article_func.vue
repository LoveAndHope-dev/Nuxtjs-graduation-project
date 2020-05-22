<template>
  <Card>
    <Form
      :rules="ruleValidate"
      ref="articleValidate"
      :model="articleForm"
      label-position="left"
      :label-width="100"
    >
      <FormItem label="标题" prop="name">
        <Input v-model="articleForm.name"></Input>
      </FormItem>
      <FormItem label="正文" prop="text">
        <editor
          api-key="7mg47kzvekvgnpznozy1enojhbi3et2vijn6etwce55uakhz"
          :init="tinyconf"
          v-model="articleForm.text"
        />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          @click="addarticle"
        >提交</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
import xss from 'xss'
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
export default {
  components: {
    Editor
  },
  data () {
    return {
      articleForm: {
        name: '',
        text: ''
      },
      tinyconf: {
        height: 500,
        language: 'zh_CN',
        async images_upload_handler (blobInfo, success, failure) {
          // 这波啊，这波是，肉弹冲击（把图片提交到static的那个方法）
          // let formData = new FormData()
          // formData.append('file', blobInfo.blob(), blobInfo.filename())
          // let { data } = await axios.post(`/manager/uploadimg`, formData, {
          //   headers: { 'content-type': 'multipart/form-data' }
          // });
          // success(`/articleimg/` + data.filename)
          let str = 'data:image/jpg;base64,' + blobInfo.base64()
          success(str)
        },
        menubar: true,
        plugins: [
          'advlist autolink lists link imagetools image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'

      },
      ruleValidate: {
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async addarticle () {
      this.$refs.articleValidate.validate(async valid => {
        if (!valid) {
          this.$Message.error('请正确填写文章详情')
        } else {
          let formData = new FormData()
          let date = new Date()
          var text = xss(this.articleForm.text, {
            onTagAttr: function (tag, name, value, isWhiteAttr) {
              if (tag === 'img') {
                if (name === 'src') {
                  if (value.substr(0, 5) === 'data:') {
                    return name + '="' + value + '"';
                  }
                }
              }
            }
          })
          formData.append('articlename', this.articleForm.name)
          formData.append('articledate', date.toLocaleDateString())
          formData.append('articletext', text)
          this.$emit('addArticleSubmit', formData)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>