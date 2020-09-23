<template>
  <div class="about">
    <!-- 表头开始 -->
    <mt-header fixed  title="房聊">
      <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 表头结束 --> 
    <div style="margin-top:50px;z-index:999;">
    <div style="height:300px">
      <mt-swipe :auto="1500" continuous>
        <mt-swipe-item>
          <img  @click="tiaozhuang1(6)" src="../../public/img/6.png" style="width:100%">
        </mt-swipe-item>
        <mt-swipe-item>
          <img @click="tiaozhuang1(8)" src="../../public/img/7.png" style="width:100%">
        </mt-swipe-item>
        <mt-swipe-item>
          <img @click="tiaozhuang1(7)" src="../../public/img/8.png" style="width:100%">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <mt-navbar v-model="top">
        <mt-tab-item id="a">
            最热话题
        </mt-tab-item>
        <mt-tab-item id="b">
            最新发表
        </mt-tab-item>
        <mt-tab-item id="c">
            最近距离
        </mt-tab-item>
        <mt-tab-item id="d">
            最热回复
        </mt-tab-item>
    </mt-navbar>
    
    <div v-for="(elem,i) in arr" :key="i" class="d1" @click="tiaozhuang(elem.pid,elem.browse_number)">
      <div class="d2">
        <img class="img1" :src="elem.upicture">&nbsp;{{elem.uname}}
      </div>
      <div class="d3">{{arr[i].p_title}}</div>
      <div class="d4">{{arr[i].p_text}}</div>
      <div class="d5">
        <img class="img2" :src="arr[i].p_picture" alt="">
      </div>
      <div class="d6">
        <span class="s1">{{(new Date(arr[i].p_time)).toLocaleString()}}</span>
        <span class="s2">来自{{elem.leixin}}</span>
      </div>
      <div class="d7">
      <div class="d7_1">
            <img :src="tx" alt="" v-for="(tx,m) of arr[i].dztx" :key="m">
            <span>{{arr[i].dzs}}人点赞</span>
        </div>
      <div class="d7_2">
        <div v-for="(item,index) in elem.pinglun2" :key="index" v-show="index<=2">
          <span class="s2">{{item.uname}}</span>:<span class="s3">{{item.c_text}}</span>
        </div>
        <div class="d7_2_1" v-show="elem.pinglun2">
          <span class="s4">查看全部</span><span class="s4">{{arr[i].plzs}}条评论</span>
        </div>
      </div>
      </div>
      <div class="d8">
        <span class="s1">
          <img src="../../public/img/04.png" alt="">
          <span>3</span>
        </span>
        <span class="s1">
          <img src="../../public/img/03.png" alt="">
          <span>{{elem.browse_number}}</span>
        </span>
        <span class="s1">
          <img @click="pinglunshu($event,elem.pid,i,elem.yid)" src="../../public/img/02.png" alt="">
          <span>{{arr[i].plzs}}</span>
        </span>
        <span class="s1">
          <img :src="arr[i].dztb" alt="" @click="dianzan($event,elem.pid,i)">
          <span>{{arr[i].dzs}}</span>
        </span>
      </div>
    </div>
    <!-- 底部导航栏开始 -->
    <my-tab :selected='selected'></my-tab>
  <!-- 底部导航栏结束 -->
  </div>
  </div>
</template>
<style scoped>
  .about{
    margin: 0 15px;
  }
  .about .d1{
    position: relative;
    /* z-index: 3; */
  }
  .about .mint-tab-item:hover{
    border-bottom: 0;
    color: forestgreen;
  }
  .about .d1 .d2{
    height:30px;
    display:table-cell
  }
  .about .d1 .d2 .img1{
    width:30px;
    height: 30px;
    border-radius: 50%; 
    vertical-align:middle
  }
  .about .d1 .d3{
    font-size: 18px;
    font-weight:700;
    color:#333;
    margin-top:10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .about .d1 .d4{
    margin-top:10px;
    line-height: 22px;
    color:#666;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  .about .d1 .d5 .img2{
    width:110px;height:110px;
  }
  .about .d1 .d6{
    font-size: 12px;
    color:#999999;
    position: relative;
    height: 23px;
    margin-bottom: 19.3px;
  }
  .about .d1 .d6 .s1{
    display: inline-block;
    height: 22px;
    line-height:22px;
    position: absolute;
    left: 0;
  }
  .about .d1 .d6 .s2{
    position: absolute;
    right: 0;
    background-color: #f1f1f1;
    padding: 5px 13.5px;
    border-radius: 1rem;
  }
  .about .d1 .d7 .d7_1{
        background-color: #f5f5f5;
        padding: 11.5px 11.5px;
        border-bottom: 1px solid #E1E1E1;
    }
    .about .d1 .d7 .d7_1 img{
        width: 25px; height: 25px;
        margin-right: 5px;
        vertical-align:middle;
    }
    .about .d1 .d7 .d7_1 span{
        color: #999999;
        font-size: 12px;
    }
  .about .d1 .d7 .d7_2{
    margin-bottom: 10px;
    padding: 11.5px 11.5px;
    background-color: #f5f5f5;
    word-break: break-all;
    line-height: 25px;
  }
  .about .d1 .d7 .d7_2 .d7_2_1{
    color: #59a7f5;
  }
  .about .d1 .d7 .d7_2 .s2{
    margin: 0 4px;
    color: #59a7f5;
  }
  .about .d1 .d7 .d7_2 .s3{
    margin: 0 4px;
    color: #999999;
  }
  .about .d1 .d7 .d7_2 .s4{
    color: #59a7f5;
  }
  .about .d1 .d8{
    font-size: 15px;
    color: #999999;
    border-top: 1px solid #f1f1f1;
  }
  .about .d1 .d8 .s1{
    display: inline-block;
    width: 25%;
    text-align: center;
    margin: 13px 0;
    border-right: 1px solid #f1f1f1;
    box-sizing: border-box;
  }
  .about .d1 .d8 :last-child{
    border-right:none;
  }
  .about .d1 .d8 .s1 img{
    vertical-align:middle;
    margin-right: 3px;
  }
</style>
<script>
import { MessageBox } from 'mint-ui';
export default {
  data(){
    return {
      top:'',
      arr:[],
      arr1:[],
      formData:new FormData(),
      selected:'tab2'
    }
  },
  mounted(){
    this.axios.get("/about").then((res)=>{
      for(let i=0;i<res.data.length;i++){
        this.axios.get('/leixin?yid='+res.data[i].yid).then(resl=>{
            res.data[i].leixin=`${resl.data}`
        });
        res.data[i].p_picture=require('../../public/img/'+res.data[i].p_picture);
        res.data[i].upicture=require('../assets/'+res.data[i].upicture)
        this.axios.get(`/pinglun1?pid=${res.data[i].pid}`).then((resq)=>{
            res.data[i].pinglun2=resq.data
            this.$forceUpdate()//因为v-for数据层次太多，函数没有自动更新，需手动强制刷新。----此代码为强制渲染页面     
        });
        var uid=sessionStorage.getItem("uid");
        var upicture=sessionStorage.getItem("upicture");
        this.axios.get(`/dianzan2?pid=${res.data[i].pid}&uid=${uid}&upicture=${upicture}`).then(resqui=>{
        if(resqui.data.code==1){
          var img1="dianzan.png"
          res.data[i].dztb=require('../../public/img/'+img1);
          this.$forceUpdate()
        }else{
          var img2="01.png"
          res.data[i].dztb=require('../../public/img/'+img2);
          this.$forceUpdate()
        }
        });
        res.data[i].dztx=[];
        this.axios.get(`/dianzan?pid=${res.data[i].pid}`).then(resqu=>{
            res.data[i].dzs=resqu.data.dzs[0].zs
            for(let m=0;m<resqu.data.dz.length;m++){
              resqu.data.dz[m].upicture=require('../assets/'+resqu.data.dz[m].upicture)
              res.data[i].dztx.push(resqu.data.dz[m].upicture);
              this.$forceUpdate()
            }
        });
        this.axios.get(`/pinglunshu?pid=${res.data[i].pid}`).then(resqu=>{
          res.data[i].plzs=resqu.data[0].plzs;
          console.log(this.arr);
          this.$forceUpdate()
        });
      }
      this.arr=res.data
    });
  },
  methods:{
    tiaozhuang(pid,number){
      //  e.stopPropagation();
      this.axios.post('/llzs',{pid:pid,number:number}).then(res=>{
        console.log(res.data);
        if(res.data==1){
          this.$router.push(`/xiangqing?pid=${pid}`);
        }
      });
    },
    tiaozhuang1(yid){
      this.$router.push(`/fatie?yid=${yid}`)
    },
    dianzan(e,pid,i){
      e.stopPropagation();
      if(sessionStorage.getItem('uid')==null){
        if(confirm("请先登录")){
           this.$router.push('/personal')        
      }
      }else{  
      var uid=sessionStorage.getItem("uid");
      var upicture=sessionStorage.getItem("upicture");
      this.axios.get(`/dianzan1?pid=${pid}&uid=${uid}&upicture=${upicture}`).then(res=>{
        if(res.data.code==1){
          var img1="dianzan.png"
          e.target.src=require('../../public/img/'+img1);
        }else{
          var img2="01.png"
          e.target.src=require('../../public/img/'+img2);
        }
        this.axios.get(`/dianzan?pid=${pid}`).then(resqu=>{
            console.log(resqu.data);
            let arr2=[];
            this.arr[i].dzs=resqu.data.dzs[0].zs
            for(let m=0;m<resqu.data.dz.length;m++){
              resqu.data.dz[m].upicture=require('../assets/'+resqu.data.dz[m].upicture)
              arr2.push(resqu.data.dz[m].upicture);
              this.$forceUpdate()
            }
            this.arr[i].dztx=arr2
        });
      });
      }
    },
    pinglunshu(event,pid,i,yid){
      event.stopPropagation();
      if(sessionStorage.getItem('uid')==null){
        if(confirm("请先登录")){
           this.$router.push('/personal')        
      }
      }else{ 
      MessageBox.prompt('输入评论内容',{confirmButtonText:'发表'}).then(({ value, action })=>{
        var uid=sessionStorage.getItem("uid");
        var uname=sessionStorage.getItem("uname");
        this.axios.post('/pinglun',{yid:yid,pid:pid,uid:uid,uname:uname,c_text:value,c_time:new Date().getTime()}).then(res=>{
          if(res.data==1){
            Toast({
              message:'评论成功',
            });
            this.axios.get(`/pinglun1?pid=${this.arr[i].pid}`).then((resq)=>{
              this.arr[i].pinglun2=resq.data
              this.$forceUpdate()//因为v-for数据层次太多，函数没有自动更新，需手动强制刷新。----此代码为强制渲染页面
              this.axios.get(`/pinglunshu?pid=${this.arr[i].pid}`).then(resqu=>{
                this.arr[i].plzs=resqu.data[0].plzs;
                this.$forceUpdate()
                console.log(this.arr);
              });
            });
          }
        });
      });
    }
    }
  }
  
}
</script>