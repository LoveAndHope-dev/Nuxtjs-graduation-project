<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <div v-if="!infos">
        <a
          href="/login"
          class="pure-menu-heading"
        >Login</a>
      </div>
      <div v-else>
        <a class="pure-menu-heading">您已登录 欢迎您 {{infos[0].name}}</a>
        <ul class="pure-menu-list">
          <li
            v-if="!infos[0].type"
            class="pure-menu-item"
          ><a
              href="/teahouse"
              class="pure-menu-link"
            >进入点餐系统</a></li>
          <li
            v-else
            class="pure-menu-item"
          ><a
              href="/manager"
              class="pure-menu-link"
            >进入管理系统</a></li>
          <li class="pure-menu-item"><a
              @click="exit()"
              class="pure-menu-link"
            >登出</a></li>
        </ul>
      </div>
    </div>
    <div class="banner">
      <h1 class="banner-head">
        欢迎来到Teahub-Chakela
      </h1>
    </div>
    <div
      class="l-content"
      style="background:#f5f7f9"
    >
      <div class="information pure-g">
        <div class="pure-u-1 pure-u-md-1-2">
          <Divider>最近新品</Divider>
          <div class="l-box">
            <indexnew />
          </div>
          <Divider>最新文章</Divider>
          <div class="l-box">
            <indexarticle />
            <Button
              to="/teahouse/article"
              style="margin:20px 0 50px"
              long
            >>>>>>查看更多文章>>>>></Button>
          </div>
        </div>
        <div class="pure-u-1 pure-u-md-1-2">
          <Divider>为什么要来这里喝茶呢</Divider>
          <div class="l-box">
            <h3 class="information-head">心酸老八篇</h3>
            <p>
              关播了兄弟们，不能太晚了，因为咱这里面有上学的，还有上班的，你们好好的，考个好成绩。
              还是那句话，给自己的父母争点光，别跟我学，往那一蹲，没出息，真事，让人唠一辈子。
              说句实话，我现在都成为笑话了，我得让人讲究一辈子。我跟你说背在我身上这个名，永远都擦不去了。
              不像我抹完口红，我拿纸还能擦掉，就是在我蹲茅坑起来的那一刻到现在，不是说到现在，到以后我都会一直背着，就是说我是一个吃屎的人。
              我自己心里明白我是啥样的人，但是我不在乎。有你们，为了你们，想想你们我也开心。
              谢谢你们，啥也不唠了，有你们我真的很开心。
            </p>
          </div>
          <div class="l-box">
            <h3 class="information-head">杂食篇一</h3>
            <p>
              简简单单的米饭，往里放点，豆腐，腐掳，配点蒜，放到盆里这么一拌。今晚就吃，白菜，包个饭。奥利给，兄弟们，造它就完了。吧唧吧唧，咔~咔咔~咔。<br>
              都说面条吃不饱，就怪配料没放好。凑豆腐，腐掳，黄瓜丝。这条面条吃到嘴里，美汁汁儿~奥利给，兄弟们，造它就完了。吧唧吧唧，咔~咔咔~咔。<br>
              虽然长滴不好看，里面装的是米饭。一口米茶一口蒜，简简单单的午饭。奥利给，兄弟们，造它就完了。吧唧吧唧，咔~咔咔~咔。<br>
            </p>
          </div>
          <div class="l-box">
            <h3 class="information-head">三顾茅坑</h3>
            <p>
              老铁们啊，只有你们想不到的，没有老八做不到的。还是那句话，今天老八，挑战一把吃粑粑。兄弟们，奥利给，干它！呕~呕~呕。<br>
              老铁们啊，虽然不是同一时间，但是同一个撤shuoer~。老八我再次挑战一把吃粑粑，奥利给，干了兄弟们！呕~呕~呕<br>
              老铁们啊，还是那句话，只有你们想不到的，永远没有我老八做不到的。你们不要笑我狼狈不堪，我也可以笑你，离开你的父母，比我吃屎都难。奥利给，干了兄弟们！呕~呕~呕。<br>
            </p>
          </div>
          <div class="l-box">
            <h3 class="information-head">杂食篇二</h3>
            <p>
              这个爆头，那个爆头，今天老八给你爆个头，爆个什么头捏，我给你爆个柠檬，看这柠檬头是怎么爆的。吧唧吧唧，咔~咔咔~咔。<br>
              凑豆配腐掳，美食界中的博主。不管是腥还是臭，到我嘴里就是肉。奥利给，干了兄弟们！吧唧吧唧，咔~咔咔~咔。<br>
              老铁们啊，尝不到苦辣，你永远不知道酸甜。今天老八给你挑战一把酸甜苦辣咸。奥利给，干了兄弟们！辣椒，吧唧吧唧，苦瓜，吧唧吧唧，柠檬，吧唧吧唧，精盐，老干妈，白糖，咔咔~咕噜咕噜。<br>
            </p>
          </div>
        </div>
      </div>
    </div> <!-- end information -->
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import indexarticle from '@/components/indexpage/indexarticle'
import indexintroduce from '@/components/indexpage/indexintroduce'
import indexnew from '@/components/indexpage/indexnew'
export default {
  components: {
    indexarticle,
    indexintroduce,
    indexnew
  },
  computed: {
    ...mapState({ infos: state => state.usermodal.user.user })
  },
  methods: {
    async exit () {
      this.$Message.success('你已经退出，请重新登录')
      this.$router.push('/exit')
    }
  }
}
</script>

<style>
@import "@/assets/common/pricing.css";
@import "https://unpkg.com/purecss@1.0.1/build/grids-responsive-min.css";
@import "https://unpkg.com/purecss@1.0.1/build/pure-min.css";
</style>