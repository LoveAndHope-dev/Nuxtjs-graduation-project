<template>
  <div id="main">
    <div class="login">
      <div class="login-form">
        <div class="login-logo">
          <span>欢迎来到<br />🍵Teahub-Chakela☕</span>
        </div>
        <Form
          inline
          ref="loginFormRef"
          :model="loginData"
          :rules="rule"
        >
          <FormItem
            prop="user"
            class="form-item"
          >
            <Input
              type="text"
              icon="person"
              v-model="loginData.id"
              @on-enter="loginSubmit"
              placeholder="登录账号（手机号）"
            ></Input>
          </FormItem>
          <FormItem
            prop="password"
            class="form-item"
          >
            <Input
              type="password"
              icon="ios-locked"
              v-model="loginData.password"
              @on-enter="loginSubmit"
              placeholder="账户密码"
            ></Input>
          </FormItem>
          <FormItem
            prop="radio"
            class="form-item"
          >
            <RadioGroup
              v-model="loginData.radio"
              @on-enter="loginSubmit"
            >
              <Radio label="staff">工作人员</Radio>
              <Radio label="admin">管理员</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class="form-item">
            <Button
              class="loginBtn"
              type="primary"
              :loading="loading"
              @click="loginSubmit()"
            >
              登 录
            </Button>
          </FormItem>
          <a href="/">回到主页</a>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import CryptoJS from 'crypto-js'
import vuex from 'vuex'
export default {
  layout: 'full',
  asyncData ({ query }) {
    let jump = query.jump || ''
    return {
      jump: jump,
      record: false,
      loading: false,
      loginData: {
        id: '',
        password: '',
        radio: ''
      },
      rule: {
        id: [
          { required: true, message: '请填写登录账户', trigger: 'blur' },
          {
            type: 'string',
            min: 2,
            message: '登录ID最少为2个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请填写账户密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            max: 30,
            message: '账户密码必须为6~30字符',
            trigger: 'blur'
          }
        ],
        radio: [
          { required: true, message: '请选择您的身份', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit: async function () {
      this.loading = true
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          this.loading = false
          this.$Message.error({
            content: '请正确填写登录账户和密码！',
            duration: 2,
            closable: true
          })
        } else {
          let self = this;
          let formData = new FormData()
          formData.append('username', window.encodeURIComponent(self.loginData.id))
          formData.append('password', CryptoJS.MD5(self.loginData.password).toString())
          if (self.loginData.radio === 'staff') {
            let { status, data: { code, msg, user } } = await this.$axios.post(`/login/staffsignin`, formData, {
              headers: { 'content-type': 'multipart/form-data' }
            })
            if (status === 200) {
              if (code === 0) {
                this.$Message.success(msg + '，立即跳转主页，那么欢迎您')
                setTimeout(function () { location.href = '/' }, 1500);
              } else {
                this.$Message.error(msg)
                this.loading = false
              }
            } else {
              this.$Message.error(`服务器出错`)
              this.loading = false
            }
          } else {
            let { status, data: { code, msg, user } } = await this.$axios.post(`/login/adminsignin`, formData, {
              headers: { 'content-type': 'multipart/form-data' }
            })
            if (status === 200) {
              if (code === 0) {
                this.$Message.success(msg + '，立即跳转主页，那么欢迎您')
                setTimeout(function () { location.href = '/' }, 1500);
              } else {
                this.$Message.error(msg)
                this.loading = false
              }
            } else {
              this.$Message.error(`服务器出错`)
              this.loading = false
            }
          }
        }
      })
    }
  }
}
</script>
<style scoped>
@import "@/assets/common/login.css";
</style>
