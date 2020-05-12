<template>
  <div>
    <Carousel
      v-model="value3"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
    >
      <CarouselItem>
        <div class="demo-carousel">
          <card class="index_new_card">

          </card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <card class="index_new_card">

          </card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <card class="index_new_card">

          </card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <card class="index_new_card">
            <img src="/illust_61283291_20190910_163354.jpg" style="width:100%"></img>
          </card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <card class="index_new_card">
          </card>
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 4000,
        dots: 'inside',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover'
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/frontpage/frontcomp/indexpage.css";
</style>