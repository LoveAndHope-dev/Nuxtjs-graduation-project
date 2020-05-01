export default {
  dbs: `mongodb://${process.env.HOST || 'localhost'}:27017/chakela`,
  redis: {
    get host () {
      return `${process.env.HOST || 'localhost'}`
    },
    get port () {
      return 6379
    }
  }
}
