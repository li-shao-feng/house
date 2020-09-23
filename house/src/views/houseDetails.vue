<template>
  <div>
    <!-- 表头开始 -->
    <mt-header fixed title="买新房">
      <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 表头结束 --> 
    <!-- 内容开始 -->
    <div style="margin-top:50px;">
    <div>
      <img class="big_img " :src="details.pic">
    </div>
    <div class="hname">
      {{details.iname}}
    </div>
    <div class="yuezu">{{details.price}}</div>
    <div class="dingwei">
      <img src="../assets/dingwei.png">
      <p>{{details.area}}{{details.community}}</p>
    </div>
    <!-- 隔行区域开始 -->
    <div class="gehang"></div>
    <!-- 隔行区域结束 -->
    <!-- 电话咨询开始 -->
    <div class="zhongjie">
      <div class="liunan">
         <img :src="details.img">
        <div>
          <p>{{details.aname}}({{details.fanwei}}，请找我)</p>
          <p>{{details.aphone}}</p>
        </div>
      </div>
      <div class="dianhuazixun">
        <img src="../assets/dianhuazixun.png">
        <p class="green_font">电话咨询</p>
      </div>
    </div>
    <!-- 电话咨询结束 -->
    <!-- 隔行区域开始 -->
    <div class="gehang"></div>
    <!-- 隔行区域结束 -->
    <!-- 房源信息开始 -->
    <div  class="fangyuan">房源信息</div>
    <div class="div_ul">
      <ul class="ul_left">
        <li>面积：{{details.acreage}}</li>
        <li>户型：{{details.unit_type}}</li>
        <li>楼层：{{details.floor_number}}</li>
      </ul>
      <ul class="ul_right">
        <li>单价：{{details.price}}</li>
        <li>类型：{{details.Decoration_type==1?'精装':'毛坯'}}</li>
        <li>年代：{{details.age}}</li>
      </ul>
    </div>
    <!-- 房源信息结束 -->
    <!-- 隔行区域开始 -->
    <div class="gehang"></div>
    <!-- 隔行区域结束 -->
    <!-- 房屋描述开始 -->
    <div  class="fangyuan">房屋描述</div>
    <div v-html="details.description">
      <!-- v-html中的样式必须是全局样式才能修改，所以style不能加scoped -->
      
    </div>
    <!-- 房屋描述结束 -->
    <!-- 隔行区域开始 -->
    <div class="gehang"></div>
    <!-- 隔行区域结束 -->
    <!-- 底部开始 -->
    <div class="dibu">
      <div>
        <img src="../assets/Tafangyuan.png">
        <p>Ta的房源</p> 
      </div>
      <div>
        <img src="../assets/fenxiangfangwu.png">
        <p>分享房屋   </p> 
      </div>
      <div class="lianxi">
        立即联系
      </div>
    </div>
    <!-- 底部结束 -->
    <!-- 内容结束 -->
    </div>
  </div>
</template>
<style>
.xiangqin{
  line-height: 32px;
  color: rgb(102, 102, 102);
  font-size: 14px;
}
.miaoshu{
  list-style: none;
  margin-left: 8px;
  color: rgb(102, 102, 102);
  line-height: 42px;
  font-size: 15px;
  padding-left:10px;
}
.ul_left{
  list-style: none;
  margin-left:10px; 
  padding: 0;
}
.ul2{
  list-style: none;
  margin-left: 30px;
}
</style>
<style scoped>
.big_img{
  width: 100%;
}
.dingwei{
  display: flex;
  align-items: flex-end;
  color:#8a8a8a;
  margin-left: 10px;
}
.dingwei>p{
  margin: 0;
}
.hname{
  color: rgb(34,34,34);
  font-size: 19px;
  line-height: 47px;
  margin-left: 10px;
}
.gehang{
  width: 100%;
  height: 10px;
  background:#8e8e8e6b; 
  margin-top: 12px;
}
.zhongjie{
  display: flex;
  justify-content: space-between;
}
.liunan{
  display: flex;
  vertical-align: middle;
}
.liunan>img{
  width: 80px;height: 80px;
  border-radius: 50%; 
  margin-top:23px; 
}
.liunan>div{
  padding-top:22px;
  line-height: 20px;
}
.dianhuazixun{
  text-align: center;
  padding-top: 30px;
  padding-right: 15px;
}
.dianhuazixun>img{
  width: 30px;
}
.green_font{
  color:#62b65d;
  font-size: 16px;
  margin-top: 5px;
}
.fangyuan{
  color:#62b65d;
  font-size: 20px;
  line-height: 50px;
  border-bottom: 2px solid #8e8e8e6b;
  margin-left: 10px;
}
.div_ul{
  display: flex;
  line-height: 30px;
  list-style: none;
} 

.ul_right{
  margin-left: 80px;
  list-style: none;
}


.dibu{
  display: flex;
  height: 60px;
}
.dibu>div{
text-align: center;
width: 33.33333%;
height: 60px;
}
.dibu img{
  height: 35px;
}
.dibu p{
  display: block;
  line-height: 20px;
  margin: 0;
}
.lianxi{
  background-color: #62B65D;
  line-height: 60px;
}
.yuezu{
color:red;
font-size:22px;
margin-left:8px;
}

</style>
<script>
export default {
  data(){
    return{
      details:{}
    }
  },
  mounted(){
    // 获得上一个页面的传参
    let iid=this.$route.params.id;
    this.axios.get('/houseDetails?iid='+iid).then(res=>{
    // 接收并处理服务器返回的结果
    res.data.results[0].pic=require('../assets/'+res.data.results[0].pic);
    res.data.results[0].img=require('../assets/'+res.data.results[0].img);
    this.details=res.data.results[0];
     console.log(this.details);
  });
  
  }
}
</script>