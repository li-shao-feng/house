<template>
  <div>
    <!-- 表头开始 -->
    <mt-header fixed :title="headerName">
      <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div style="margin-top:50px;">
    <!-- 表头结束 -->  
    <!-- 新房开始 -->
     <!-- v-on="{click:..,change:..."添加多个事件 @click="houseDetails(p.iid),log()"添加多个事件-->
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
    </div>
    <!-- 新房结束 -->
  </div>
</template>
<style scoped>
 .div{
   display: flex;
   
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
 a{
   text-decoration: none;
   display: inline-block;
   color: slategray;
 }
</style>
<script>
export default {
  data(){
    return{
      headerName:"买新房",
      newhouse:[]
    }
  },
  methods:{
    houseDetails(iid){
      this.$router.push(`/houseDetails/${iid}`);
    }
  },
  mounted(){
    console.log(this.$route);
    let house_type=this.$route.query.house_type;
    // 根据类型值不同改变headerName的值
    house_type==10?this.headerName='买新房':house_type==20?this.headerName='买二手房':this.headerName='找租房';
  // 发送ajax请求，请求页面
  this.axios.get('/newhouse?house_type='+house_type).then(res=>{
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
  }
}
</script>