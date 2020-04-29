export default {
  dbs: 'mongodb://127.0.0.1:27017/chakela',
  redis: {
    get host () {
      return '127.0.0.1'
    },
    get port () {
      return 6379
    }
  }
}
