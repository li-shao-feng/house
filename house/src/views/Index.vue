<template>
  <div class="bg">
    <!-- 表头开始 -->
    <mt-header fixed title="首页">
    </mt-header>
    <!-- 表头结束 -->
    <!-- 轮播图开始 -->
     <div style="height:140px;margin-top:50px;">
      <mt-swipe :auto="1500" continuous>
        <mt-swipe-item>
          <img src="../assets/lunbo1.png" style="width:100%">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/lunbo2.png" style="width:100%">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 轮播图结束 -->
    <!-- 房子选项开始 -->
    <div class="house_div">
    <mt-navbar v-model="active">
       <mt-tab-item  id="1">
          <img src="../assets/xinfang.png">
          <span>买新房</span>
       </mt-tab-item>
       <mt-tab-item id="2">
          <img src="../assets/ershoufang.png">
          <span>买二手房</span>
       </mt-tab-item>
       <mt-tab-item id="3">
          <img src="../assets/zufang.png">
          <span>找租房</span>
       </mt-tab-item>
       <mt-tab-item id="4">
          <img src="../assets/woyaomaifang.png">
          <span>我要卖房</span>
       </mt-tab-item>
       <mt-tab-item id="5">
          <img src="../assets/woyaochuzu.png">
          <span>我要出租</span>
       </mt-tab-item>
    </mt-navbar>
    </div>
    <!-- 房子选项结束 -->
    <!-- 房聊选项卡开始 -->
    <mywiki></mywiki>
    <!-- 房聊选项卡结束 -->
    <!-- 每日资讯开始 -->
    <div class="new_title">
      <span>每日资讯</span>
    </div>
      <!-- 新闻开始 -->
      <div class="yingcang">
        <div  v-for="(p,i) of news" :key=i>
          <router-link class="new" :to="`/content/${p.nid}`">
            <div class="new_left">
                <div class="new_content">{{p.title}}</div>
                <div class="two">
                  <div>评论&nbsp;{{p.count}}</div>
                  <div>时间&nbsp;{{p.times}}</div>
                </div>
            </div>
            <div class="new_right">
              <img :src="p.pic[0]">
            </div>
          </router-link>
        </div>
      </div>
      <!-- 新闻结束 -->
      <!-- 猜你喜欢开始 -->
      <div class="new_title">
        <span>猜你喜欢</span>
      </div>
      <div class="div" @click="houseDetails(p.iid)" v-for="(p,i) of newhouse" :key=i><!-- 此处v-for -->
      <div class="left">
        <img :src="p.pic">
      </div>
      <div class="right">
        <div>
          <span>{{p.iname}}</span>
        </div>
        <div class="flex">
          <span>{{p.age}}</span>
          <span class="red_color">{{p.price}}</span>
        </div>
        <div class="flex">
          <span>{{p.unit_type}}</span>
          <span>{{p.acreage}}</span>
        </div>
        <div>
          <span>{{p.application==0?'住宅':'商铺'}}</span>
          
        </div>
      </div>
    </div>
      <!-- 猜你喜欢结束 -->
    <!-- 每日资讯结束 -->
  <!-- 底部导航栏开始 -->
    <my-tab :selected='selected'></my-tab>
  <!-- 底部导航栏结束 -->
  </div>
</template>
<style scoped>
.div{
   display: flex;
   background-color: #fff;
   margin-top: 2px;
 }
 .left>img{
   width: 130px;
   margin: 10px;
   border-radius: 5px;
 }
 .right{
   width:100%;
   margin: 10px;
   margin-left:0;
   text-align: left;
   line-height:24px;
 }
 .flex span:last-child{
   margin-left:50px;
 }
 .red_color{
   color: red;
   font-size:20px;
   font-weight: bold;
 }
.new_title{
   font-size: 19px;
   font-weight: bold;
   background-color: #fff;
   margin-top: 10px;
   height: 50px;
   line-height: 50px;
}
.new_title span{
 margin-left: 12px;
}
.yingcang{
  height: 224px;
  overflow: hidden;
}
.new{
 display: flex;
 background-color: #fff;
 margin-top: 2px;
}
a{
  text-decoration: none;
  display: inline-block;
}
.new_left{
  width: 218px;height: 110px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.new_content{
  color:#333;
  line-height: 22px;
  font-size: 16px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.two{
  color: #999;
  font-size: .2rem;
  line-height: 1.15;
  display: flex;
}
.two>div{
  margin: 0 0 4px 10px;
}
.new_right{
  width: 117px;height: 88px;
  margin: 11px 0;
}
.new_right>img{
  width: 100%;height: 100%;
  border-radius: 5px;
}
.bg{
background-color: #F5F5F5;
}
.house_div{
  text-align: center;
  
}
.house_div>div{
  display:flex;
  justify-content: space-around;
}
.house_div span{
  display:block;
  margin-top: 5px;
  flex-direction: column;
}
</style>
<script>
import mywiki from './wiki.vue'
export default {
  components:{
   mywiki
  },
  data(){
    return{
      selected:'tab1',
      active:'',
      news:[],
      newhouse:[]
    }
  },
  methods:{
   houseDetails(iid){
      this.$router.push(`/houseDetails/${iid}`);
    }
  },
  mounted(){
  //  每日资讯的初始化加载
  this.axios.get('/comment').then((res)=>{
                 
              console.log(res.data); 
              if(res.data.length!=0){
              res.data.forEach(elem => {
                  let arr=[];
                  elem.pic.split('&').forEach(img => {
                  img=require('../assets/img/trigrams/'+img);
                 arr.push(img);
                  });
                elem.pic=arr;
                this.axios.get('/comment_num?new_id='+elem.nid).then(res=>{
                    let count=res.data.length;
                    // console.log(res.data);
                elem.count=count;
                this.news.push(elem);
                elem.times = elem.times.substr(0,4);
                }); 
              });
              console.log(this.news);
                }
             });
  // 初始化加载房子信息
  console.log(this.$route);
  // 发送ajax请求，请求页面
  this.axios.get('/newhouse?house_type=10').then(res=>{
    console.log(res.data.results);
    // 接收并处理服务器返回的结果
    // 先遍历，因为没有静态托管，所以要动态添加前缀。然后再push到事先准备好的数组
      res.data.results.forEach((elem,i)=>{
        if(elem.pic!=null){
      elem.pic=require("../assets/"+elem.pic);
        }
      console.log(elem.pic);
      this.newhouse.push(elem);
    });
    console.log(this.newhouse)
  });
  },
  watch:{
    active(key){
      console.log(this.active)
    switch (key) {
      case "1":
        this.$router.push("/newhouse?house_type=10")
      break;
      case "2":
        this.$router.push("/newhouse?house_type=20")
      break;
      case "3":
        this.$router.push("/newhouse?house_type=30")
      break;
      case "4":
        this.$router.push("/sellHouse/?a=我要卖房&b=售价(单位：万元）")
      break;
      case "5":
        this.$router.push("/sellHouse/?a=我要租房&b=租金(单位：元/月）")
      break;
    }
    }
  },
  
}

</script>