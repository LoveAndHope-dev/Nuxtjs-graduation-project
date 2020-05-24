export default {
  data () {
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
          }
        ],
        price: [
          { required: true, message: '茶点价格不能为空', trigger: 'blur' },
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
          }
        ],
        phonenumber: [
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
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        people: [
          { required: true, message: '不能为空', trigger: 'blur' },
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
          }
        ],
        price: [
          { required: true, message: '茶品价格不能为空', trigger: 'blur' },
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
          }
        ],
        phonenumber: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '禁止为空', trigger: 'blur' }
        ],
        wages: [
          { required: true, message: '禁止为空', trigger: 'blur' },
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