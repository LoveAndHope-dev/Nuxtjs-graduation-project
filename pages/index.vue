<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <div v-if="!infos">
        <a
          href="/login"
          class="pure-menu-heading"
        >点击此处登录</a>
      </div>
      <div v-else>
        <a class="pure-menu-heading">您已登录 欢迎您 {{infos[0].name}}</a>
        <ul class="pure-menu-list">
          <li
            v-if="!infos[0].isadmin"
            class="pure-menu-item"
          >
            <nuxt-link to="/teahouse"><a class="pure-menu-link">进入点餐系统</a></nuxt-link>
          </li>
          <li
            v-else
            class="pure-menu-item"
          >
            <nuxt-link to="/manager"><a class="pure-menu-link">进入管理系统</a></nuxt-link>
          </li>
          <li class="pure-menu-item"><a
              @click="exit()"
              class="pure-menu-link"
            >登出</a></li>
        </ul>
      </div>
    </div>
    <div class="banner b-background1">
      <h1 class="banner-head">
        欢迎来到Teahub-Chakela<br />
        <Button
          to="/article"
          style="margin:10px 0;width:50%;opacity:0.7"
          long
        >点击此处进入文章页可阅读文章</Button>
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
            <Carousel
              autoplay
              class="index_new_card"
            >
              <CarouselItem
                v-for="(item, index) in photos.slice(0,5)"
                :key="index"
              >
                <img
                  style=" width: 100%"
                  v-lazy="item.photo"
                />
              </CarouselItem>
            </Carousel>
          </div>
        </div>
        <div class="pure-u-1 pure-u-md-1-2">
          <Divider>为什么要来这里喝茶呢</Divider>
          <div class="l-box">
            <h3 class="information-head">矛盾论</h3>
            <p>
              事物的矛盾法则，即对立统一的法则，是唯物辩证法的最根本的法则。列宁说：“就本来的意义讲，辩证法是研究对象的本质自身中的矛盾。”[1]列宁常称这个法则为辩证法的本质，又称之为辩证法的核心[2]。因此，我们在研究这个法则时，不得不涉及广泛的方面，不得不涉及许多的哲学问题。如果我们将这些问题都弄清楚了，我们就在根本上懂得了唯物辩证法。这些问题是：两种宇宙观;矛盾的普遍性;矛盾的特殊性;主要的矛盾和主要的矛盾方面;矛盾诸方面的同一性和斗争性;对抗在矛盾中的地位。
            </p>
          </div>
          <div class="l-box">
            <h3 class="information-head">我们的经济政策</h3>
            <p>
              我们的经济政策的原则，是进行一切可能的和必须的经济方面的建设，集中经济力量供给战争，同时极力改良民众的生活，巩固工农在经济方面的联合，保证无产阶级对于农民的领导，争取国营经济对私人经济的领导，造成将来发展到社会主义的前提。
            </p>
          </div>
          <div class="l-box">
            <h3 class="information-head">反对本本主义</h3>
            <p>
              你对于某个问题没有调查，就停止你对于某个问题的发言权。这不太野蛮了吗?一点也不野蛮。你对那个问题的现实情况和历史情况既然没有调查，不知底里，对于那个问题的发言便一定是瞎说一顿。瞎说一顿之不能解决问题是大家明了的，那末，停止你的发言权有什么不公道呢?许多的同志都成天地闭着眼睛在那里瞎说，这是共产党员的耻辱，岂有共产党员而可以闭着眼睛瞎说一顿的吗?
            </p>
          </div>
          <div class="l-box">
            <h3 class="information-head">实践论</h3>
            <p>
              首先，马克思主义者认为人类的生产活动是最基本的实践活动，是决定其它一切活动的东西。人的认识，主要地依赖于物质的生产活动，逐渐地了解自然的现象、自然的性质、自然的规律性、人和自然的关系;而且经过生产活动，也在各种不同程度上逐渐地认识了人和人的一定的相互关系。一切这些知识，离开生产活动是不能得到的。在没有阶级的社会中，每个人以社会一员的资格，同其它社会成员协力，结成一定的生产关系，从事生产活动，以解决人类物质生活问题。在各种阶级的社会中，各阶级的社会成员，则又以各种不同的方式，结成一定的生产关系，从事生产活动，以解决人类物质生活问题。这是人的认识发展的基本来源。
            </p>
          </div>
        </div>
        <div class="pure-u-1 pure-u-md-1-2">
          <Divider>本店方位：{{posi}}</Divider>
          <div
            id="container"
            tabindex="0"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import xss from 'xss'
import { mapState } from 'vuex'
import indexarticle from '@/components/indexpage/indexarticle'
export default {
  components: {
    indexarticle
  },
  async asyncData (ctx) {
    let { status, data: { code, result } } = await ctx.$axios.get('/index/getPhoto')
    if (status === 200 & code === 0) {
      return {
        photos: result.filter(item => item._id.length).map(item => {
          return {
            id: item._id,
            photo: item.photo
          }
        })
      }
    }
  },
  computed: {
    ...mapState({ infos: state => state.usermodal.user.user }),
    ...mapState({ posi: state => state.positionmodal.position })
  },
  mounted () {
    let self = this
    var mapObj = new AMap.Map('container', {
      zoom: 15
    });
    mapObj.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        showMarker: true,
        showCircle: true,
        panToLocation: true
      })
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
          onComplete(result)
        } else {
          onError(result)
        }
      });
    });
    function onComplete (success) {
      self.$store.dispatch('positionmodal/setposition', success.formattedAddress)
    }
    function onError (error) {
      self.$store.dispatch('positionmodal/setposition', error)
    }
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
@import "@/assets/frontpage/frontcomp/indexpage.css";
#container {
  width: 100%;
  height: 200px;
  margin: 0px;
}
</style>