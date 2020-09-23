<template>
  <div style="margin-top:55px;">
    <!-- 底部导航栏开始 -->
    <mt-tabbar v-model="active" fixed>
      <mt-tab-item id="tab1">
        <img src="../assets/index_active.png" v-if="active=='tab1'" slot="icon">
        <img src="../assets/index.png" slot="icon" v-else>
        首页
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img src="../assets/xinxi_active.png" slot="icon" v-if="active=='tab2'">
        <img src="../assets/xinxi.png" slot="icon" v-else>
        房聊
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img src="../assets/xingqiu_active.png" slot="icon" v-if="active=='tab3'">
        <img src="../assets/xingqiu.png" slot="icon" v-else>
        有料
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img src="../assets/me_active.png" slot="icon" v-if="active=='tab4'">
        <img src="../assets/me.png" slot="icon" v-else>
        个人中心
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部导航栏结束 -->
  </div>
</template>
<script>
export default {
  props:["selected"],
  data(){
    return{
      active:this.selected,
    }
  },
  watch:{
    active(key){
      switch (key) {
        case 'tab1':
          this.$router.push("/")
          break;
          case 'tab2':
          this.$router.push("/about")
          break;
          case 'tab3':
          this.$router.push("/trigrams")
          break;
          case 'tab4':
          this.$router.push("/personal")
          break;
      }
    }
  }
}
</script>