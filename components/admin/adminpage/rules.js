export default {
  data () {
    const validworkerphonenumber = async (rule, value, callback) => {
      if (this.changeWorkerForm === undefined) {
        this.changeWorkerForm = NaN
      } 
      let { status: vwpns, data: { vwpnc } } = await this.$axios.get(`/manager/worker_manage/phonenumbervalid`, {
        params: {
          id: this.changeWorkerForm.id,
          phonenumber: value
        }
      })
      if (vwpns === 200) {
        if (vwpnc === 0) {
          callback(new Error('已经有人使用此手机号'))
        } else {
          callback()
        }
      }
    }
    const validworkeremail = async (rule, value, callback) => {
      if (this.changeWorkerForm === undefined) {
        this.changeWorkerForm = NaN
      } 
      let { status: vwes, data: { vwec } } = await this.$axios.get(`/manager/worker_manage/emailvalid`, {
        params: {
          id: this.changeWorkerForm.id,
          email: value
        }
      })
      if (vwes === 200) {
        if (vwec === 0) {
          callback(new Error('已经有人使用此邮箱'))
        } else {
          callback()
        }
      }
    }
    const validdrinkname = async (rule, value, callback) => {
      if (this.changeDrinkForm === undefined) {
        this.changeDrinkForm = NaN
      } 
      let { status: vdns, data: { vdnc } } = await this.$axios.get(`/manager/tea_manage/drinknamevalid`, {
        params: {
          id: this.changeDrinkForm.id,
          name: value
        }
      })
      if (vdns === 200) {
        if (vdnc === 0) {
          callback(new Error('已经有此茶品'))
        } else {
          callback()
        }
      }
    }
    const validcakename = async (rule, value, callback) => {
      if (this.changecakeForm === undefined) {
        this.changecakeForm = NaN
      } 
      let { status, data: { code } } = await this.$axios.get(`/manager/cake_manage/cakenamevalid`, {
        params: {
          id: this.changecakeForm.id,
          name: value
        }
      })
      if (status === 200) {
        if (code === 0) {
          callback(new Error('已经有此茶点'))
        } else {
          callback()
        }
      }
    }
    const validmanagerphonenumber = async (rule, value, callback) => {
      if (this.changeadminForm === undefined) {
        this.changeadminForm = NaN
      } 
      let { status, data: { code } } = await this.$axios.get(`/manager/manager_manage/phonenumbervalid`, {
        params: {
          id: this.changeadminForm.id,
          phonenumber: value
        }
      })
      if (status === 200) {
        if (code === 0) {
          callback(new Error('已经有人使用此手机号'))
        } else {
          callback()
        }
      }
    }
    const validmanageremail = async (rule, value, callback) => {
      if (this.changeadminForm === undefined) {
        this.changeadminForm = NaN
      } 
      let { status, data: { code } } = await this.$axios.get(`/manager/manager_manage/emailvalid`, {
        params: {
          id: this.changeadminForm.id,
          email: value
        }
      })
      if (status === 200) {
        if (code === 0) {
          callback(new Error('已经有人使用此邮箱'))
        } else {
          callback()
        }
      }
    }
    const validtablename = async (rule, value, callback) => {
      if (this.changetableForm === undefined) {
        this.changetableForm = NaN
      } 
      let { status, data: { code } } = await this.$axios.get(`/manager/table_manage/tablenamevalid`, {
        params: {
          id: this.changetableForm.id,
          name: value
        }
      })
      if (status === 200) {
        if (code === 0) {
          callback(new Error('已经有此桌位'))
        } else {
          callback()
        }
      }
    }
    return {
      articleruleValidate: {
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ]
      },
      cakeruleValidate: {
        name: [
          { required: true, message: '茶点名不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 2,
            max: 25,
            message: '商品名称在2-25字之间',
            trigger: 'blur'
          },
          { validator: validcakename, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '茶点价格不能为空' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ],
        type: [
          { required: true, message: '茶点类型不能为空', trigger: 'blur' }
        ],
        taste: [
          { required: true, message: '茶点口味不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '茶点描述不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 20,
            message: '20字以上',
            trigger: 'blur'
          }
        ],
        photo: [
          { required: true, message: '图片非空', trigger: 'blur' }
        ]
      },
      managerruleValidate: {
        password: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '禁止为空' }
        ],
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '禁止为空', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱形式不对',
            trigger: 'blur'
          },
          { validator: validmanageremail, trigger: 'blur' }
        ],
        phonenumber: [
          { required: true, message: '禁止为空', trigger: 'blur' },
          { validator: validmanagerphonenumber, trigger: 'blur' }
        ],
        wages: [
          { required: true, message: '禁止为空' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ],
        radio: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        photo: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ]
      },
      newruleValidate: {
        photo: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ]
      },
      tableruleValidate: {
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' },
          { validator: validtablename, trigger: 'blur' }
        ],
        people: [
          { required: true, message: '不能为空' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ]
      },
      tearuleValidate: {
        name: [
          { required: true, message: '茶品名不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 2,
            max: 25,
            message: '商品名称在2-25字之间',
            trigger: 'blur'
          },
          { validator: validdrinkname, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '茶品价格不能为空' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ],
        type: [
          { required: true, message: '茶品类型不能为空', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '茶品口味不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '茶品描述不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 20,
            message: '20字以上',
            trigger: 'blur'
          }
        ],
        photo: [
          { required: true, message: '图片非空', trigger: 'blur' }
        ]
      },
      workerruleValidate: {
        date: [
          { required: true, message: '禁止为空' }
        ],
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '禁止为空', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱形式不对',
            trigger: 'blur'
          },
          { validator: validworkeremail, trigger: 'blur' }
        ],
        phonenumber: [
          { required: true, message: '禁止为空', trigger: 'blur' },
          { validator: validworkerphonenumber, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        wages: [
          { required: true, message: '禁止为空' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform (value) {
              return Number(value);
            }
          }
        ],
        radio: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        photo: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ]
      },
      myselfruleValidate: {
        name: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '禁止为空', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱形式不对',
            trigger: 'blur'
          }
        ],
        phonenumber: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        radio: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        photo: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ]
      }
    }
  }
}