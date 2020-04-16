<template>
  <Card>
    <Form
      :model="articleForm"
      label-position="left"
      :label-width="100"
    >
      <FormItem label="标题">
        <Input v-model="articleForm.title"></Input>
      </FormItem>
      <FormItem label="发布日期">
        <DatePicker
          type="date"
          placeholder="Select date"
          v-model="articleForm.date"
        ></DatePicker>
      </FormItem>
      <FormItem label="正文">
        <editor
          api-key="7mg47kzvekvgnpznozy1enojhbi3et2vijn6etwce55uakhz"
          :init="tinyconf"
          v-model="articleForm.article"
        />
      </FormItem>
      <FormItem>
        <Button type="primary">提交</Button>
      </FormItem>
    </Form>
    <div v-html="articleForm.article"></div>
  </Card>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
export default {
  components: {
    Editor
  },
  data () {
    return {
      articleForm: {
      },
      tinyconf: {
        height: 500,
        language: 'zh_CN',
        async images_upload_handler (blobInfo, success, failure) {
          let formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          let { data } = await axios.post(`/manager/uploadimg`, formData, {
            headers: { 'content-type': 'multipart/form-data' }
          });
          success(`/articleimg/` + data.filename)
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

      }
    }
  }
}
</script>

<style scoped>
</style>