import workermanage from './adminmodules/workermanage'
import drinkmanage from './adminmodules/drinkmanage'
import cakemanage from './adminmodules/cakemanage'
import tablemanage from './adminmodules/tablemanage'
import myselfinfomanage from './adminmodules/myselfinfo'
import articlemanage from './adminmodules/articlemanage'
import adminmanage from './adminmodules/adminmanage'

export const modules = {
  workermanage,
  drinkmanage,
  cakemanage,
  tablemanage,
  myselfinfomanage,
  articlemanage,
  adminmanage
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    if (req.user) {
      if (req.user.auth === 'admin') {
        let { status, data: { code, result } } = await app.$axios.get('/manager/worker_manage/getStaff')
        if (status === 200 & code === 0) {
          commit('workermanage/setStaff', {
            staff: result.filter(item => item._id.length).map(item => {
              return {
                id: item._id,
                name: item.staffname,
                sex: item.staffsex,
                workdate: item.staffworkdate,
                photo: item.staffphoto,
                email: item.staffemail,
                phonenumber: item.staffphonenumber,
                password: item.staffpassword,
                wages: item.staffwages
              }
            })
          })
        }
        let { status: dmstatus, data: { dmcode, dmresult } } = await app.$axios.get('/manager/tea_manage/getDrink')
        if (dmstatus === 200 & dmcode === 0) {
          commit('drinkmanage/setDrink', {
            drink: dmresult.filter(item => item._id.length).map(item => {
              return {
                id: item._id,
                name: item.drinkname,
                price: item.drinkprice,
                description: item.drinkdescription,
                type: item.drinktype,
                position: item.drinkposition,
                photo: item.drinkphoto
              }
            })
          })
        }
        let { status: cmstatus, data: { cmcode, cmresult } } = await app.$axios.get('/manager/cake_manage/getCake')
        if (cmstatus === 200 & cmcode === 0) {
          commit('cakemanage/setCake', {
            cake: cmresult.filter(item => item._id.length).map(item => {
              return {
                id: item._id,
                name: item.cakename,
                price: item.cakeprice,
                description: item.cakedescription,
                type: item.caketype,
                taste: item.caketaste,
                photo: item.cakephoto
              }
            })
          })
        }
        let { status: tmstatus, data: { tmcode, tmresult } } = await app.$axios.get('/manager/table_manage/getTable')
        if (tmstatus === 200 & tmcode === 0) {
          commit('tablemanage/setTable', {
            table: tmresult.filter(item => item._id.length).map(item => {
              return {
                id: item._id,
                name: item.tablename,
                condition: item.tablecondition,
                people: item.tablepeople
              }
            })
          })
        }
        let { status: mistatus, data: { micode, miresult } } = await app.$axios.get('/manager/myself_infomation/getInfo')
        if (mistatus === 200 & micode === 0) {
          commit('myselfinfomanage/setinfo', {
            info: miresult.filter(item => item._id.length).map(item => {
              return {
                id: item._id,
                name: item.adminname,
                sex: item.adminsex,
                email: item.adminemail,
                workdate: item.adminworkdate,
                photo: item.adminphoto,
                phonenumber: item.adminphonenumber,
                password: item.adminpassword,
                type: item.admintype,
                wages: item.adminwages
              }
            })
          })
        }
        let { status: amstatus, data: { amcode, amresult } } = await app.$axios.get('/manager/article_manage/getArticle')
        if (amstatus === 200 & amcode === 0) {
          commit('articlemanage/setarticle', {
            article: amresult.filter(item => item._id.length).map(item => {
              return {
                id: item._id,
                name: item.articlename,
                date: item.articledate,
                text: item.articletext
              }
            })
          })
        }
        let { status: mmstatus, data: { mmcode, mmresult } } = await app.$axios.get('/manager/manager_manage/getAdmin')
        if (mmstatus === 200 && mmcode === 0) {
          commit('adminmanage/setadmin', {
            admin: mmresult.filter(item => item._id.length).map(item => {
              return {
                id: item._id,
                name: item.adminname,
                sex: item.adminsex,
                email: item.adminemail,
                workdate: item.adminworkdate,
                photo: item.adminphoto,
                phonenumber: item.adminphonenumber,
                password: item.adminpassword,
                type: item.admintype,
                wages: item.adminwages
              }
            })
          })
        }
      }
    } else {

    }
  }
}
