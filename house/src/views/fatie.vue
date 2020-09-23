<template>
    <div class="fatie">
        <!-- 表头开始 -->
    <mt-header fixed>
      <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 表头结束 -->
    <div class="d1">
            <div class="d2">
                <img src="../../public/img/sousuo.png" alt="">
                <input type="search" placeholder="搜索">
            </div>
            <img src="../../public/img/lingdang.png" alt="">
            <img src="../../public/img/wode.png" alt="">
        </div>
        <div class="d3">
            <!-- <img src="../../public/img/5.png" alt=""> -->
            <div class="d3_1">
              <img class="d3_1_img" src="../../public/img/湖边星空.png">
            </div>
            <div class="d3_2">
               <span class="d3_2_1">
                   <p>{{data}}</p>
               </span>
               <span class="d3_2_2">
                   <p>话题&nbsp;{{fatiezs}}</p>
                   <p>回复&nbsp;{{leixinpinglunzs}}</p>
               </span>
               <span>
                   <p>{{data}}话题</p>
               </span> 
            </div>
        </div>
        <div class="d4">
            <span class="s1">全部</span>
        </div>
        <div @click="tiaozhuan(elem.pid,elem.browse_number)" class="d5" v-for="(elem,i) of arr" :key="i">
            <div class="d6">
                <div>
                <img :src="elem.upicture" alt="">
                <div class="d7">
                    <div class="d8">{{elem.uname}}</div>
                    <div class="d9">{{elem.p_title}}</div>
                </div>
                </div>
                <span class="s1">联系Ta</span>
            </div>
            <div class="d10">
                <div class="d11">{{elem.p_text}}
                    <span class="s1">全文</span>
                </div>
                <img class="img1" :src="elem.p_picture" alt="">
                <div class="d12">
                    <div class="d12_1">
                        <span class="s1">{{(new Date(elem.p_time)).toLocaleString()}}</span>
                        <img class="img2" src="../../public/img/ai-eye.png" alt="">
                        &nbsp;<span class="s2">{{elem.browse_number}}</span>
                    </div>
                    <div class="d12_2">
                        <div class="d12_3">
                            <img @click="dianzan($event,elem.pid,i)" :src="elem.dztb" alt=""> 
                            <span>{{elem.dzs}}&nbsp;</span>
                            <span>|&nbsp;</span>
                            <img @click="pinglun($event,elem.pid,i,elem.yid)" src="../../public/img/02.png" alt="">
                            <span>{{elem.plzs}}</span>
                        </div>
                        <img @click="dianji" id="img1" src="../../public/img/diandian.png" alt="">
                    </div>
                </div>
                <div class="d13">
                    <div class="d6">
                        <div class="d6_1">
                            <img :src="tx" alt="" v-for="(tx,m) of arr[i].dztx" :key="m">
                        </div>
                        <span>{{elem.dzs}}人点赞</span>
                    </div>
                    <div class="d7">
                       <div v-show="index<=2" v-for="(itme,index) of elem.pinglun2" :key="index">
                            <span class="s3">{{itme.uname}}</span>:<span class="s3">{{itme.c_text}}</span>
                        </div>
                        <div v-show="elem.pinglun2">
                            <span class="s4">查看全部</span><span class="s4">{{elem.plzs}}条评论</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fatie_1">
            <img @click="tiaozhuang1" src="../../public/img/001.png" alt="">
            <img src="../../public/img/002.png" alt="">
        </div>
    </div>
</template>
<style scoped>
    .fatie .d1{
        padding: 15px;
        background-color: #EEEEEE;
        display: flex;
        justify-content: space-around;
    }
    .fatie .d1 .d2{
        display: inline-block;
        background-color: white;
        padding: 5px 0;
        width: 70%;
        border-radius: 5px;
    }
    .fatie .d1 input {
        padding: 5px;
        width: 80%;
        border: none;
        outline: none;
    }
    .fatie .d1>img{
        vertical-align:middle;
        width: 24px;
        height: 24px;
    }
    .fatie .d1 .d2 img{
        margin: 0 10px;
        vertical-align:middle;
    }
    .fatie .d3{
        width: 100%;height: 100px;
        display: flex;
        background:#928d8ddc url(../../public/img/湖边星空.png) no-repeat center center;
        background-size:200%;
        background-blend-mode: multiply;
    }
    .fatie .d3 .d3_1{
        width: 80px;height: 80px;
        background:#eee8e8dc;
        margin: 10px;     
        border-radius: 40%;
    }
     .fatie .d3 .d3_1_img{
         width: 100%;height: 100%;
     }
     .fatie .d3 .d3_2{
         margin-top: 20px;
         line-height: 20px;
         color: #fff;
         font-size: 10px;
     }
     .fatie .d3 .d3_2 .d3_2_1{
        font-size: 16px; 
     }
     .fatie .d3 .d3_2 .d3_2_2{
         display: flex;
     }
     .fatie .d3 .d3_2 .d3_2_2>p{
         margin-right:20px;
     }
    .fatie .d4{
        background-color: #EEEEEE;
        padding: 10px 0;
    }
    .fatie .d4 .s1{
        background-color: white;
        display: block;
        padding: 15px;
        color: #6EBB6A;
    }
    .fatie .d5{
        padding: 15px;
    }
    .fatie .d5 .d6{
        display: flex;
        justify-content: space-between;
    }
    .fatie .d5 .d6 span{
        height: 12px;
    }
    .fatie .d5 .d6 img{
        width: 50px;height: 50px;
    }
    .fatie .d5 .d6 .d7{
        display: inline-block;
        margin-left: 10px;
        vertical-align:top;
    }
    .fatie .d5 .d6 .d7 .d8{
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .fatie .d5 .d6 .d7 .d9{
        font-size: 12px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fatie .d5 .d6 .s1{
        vertical-align:top;
        font-size: 12px;
        padding: 5px 10px;
        border: 1px solid #6EBB6A;
        color: #6EBB6A;
        display: inline-block;
    }
    .fatie .d5 .d10{
        padding: 0 25px;
    }
    .fatie .d5 .d10 .d11{
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }
    .fatie .d5 .d10 .d11 .s1{
        color: #577A9F;
    }
    .fatie .d5 .d10 .img1{
        width: 100%;
    }
    .fatie .d5 .d10 .d12{
        padding: 10px;
        font-size: 12px;
        color: #9C9C9C;
        display: flex;
        justify-content: space-between;
    }
    .fatie .d5 .d10 .d12 .d12_1{
        display: inline-block;
        vertical-align: middle;
        line-height: 24px;
    }
    .fatie .d5 .d10 .d12 .d12_2{
        display: inline-block;
        position: relative;
    }
    .fatie .d5 .d10 .d12 .d12_1 .s1{
        margin-right: 8px;
        vertical-align:middle;
    }
    .fatie .d5 .d10 .d12 .d12_1 .s2{
        vertical-align:middle;
    }
    .fatie .d5 .d10 .d12 .d12_1 .img2{
        vertical-align:middle;
    }
    .fatie .d5 .d10 .d12 .d12_2 .d12_3{
        display: none;
        background: #4C5154;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 8px;
    }
    .fatie .d5 .d10 .d12 .d12_2 .d12_3 img{
        vertical-align:middle;
        display: inline;
    }
    .fatie .d5 .d10 .d12 .d12_2 .d12_3 span{
        vertical-align:middle;
        display: inline;
        font-size: 12px;
    }
    .fatie .d5 .d10 .d12 .d12_2>img{
       vertical-align:middle; 
    }
    .fatie .d5 .d10 .d13 .d6{
        background-color: #f5f5f5;
        padding: 11.5px 11.5px;
        border-bottom: 1px solid #E1E1E1;
    }
    .fatie .d5 .d10 .d13 .d6 img{
        width: 25px; height: 25px;
        margin-right: 5px;
        vertical-align:middle;
    }
    .fatie .d5 .d10 .d13 .d6 .d6_1{
        display: inline-block;
        vertical-align:middle;
    }
    .fatie .d5 .d10 .d13 .d6 span{
        color: #999999;
        font-size: 12px;
    }
    .fatie .d5 .d10 .d13 .d7{
    margin-bottom: 10px;
    padding: 11.5px 11.5px;
    background-color: #f5f5f5;
    word-break: break-all;
    line-height: 25px;
    font-size: 12px;
  }
  .fatie .d5 .d10 .d13 .d7 .s3{
    margin: 0 4px;
    color: #999999;
  }
 .fatie .d5 .d10 .d13 .d7 .s4{
    color: #59a7f5;
  }
  .fatie .fatie_1{
      position: fixed;
      bottom: 0;right: 10px;
  }
  .fatie .fatie_1 img{
      display: block;
      border-radius: 50%;
      margin-bottom: 15px;
  }
</style>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    methods:{
        dianzan(e,pid,i){
            e.stopPropagation();
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
                        resqu.data.dz[m].upicture=require('../assets/'+resqu.data.dz[m].upicture);
                        arr2.push(resqu.data.dz[m].upicture);
                        this.$forceUpdate()
                    }
                    var d12_3=e.target.parentNode
                        d12_3.style.display="none"
                    this.arr[i].dztx=arr2
                });
            });
        },
        pinglun(event,pid,i,yid){
            event.stopPropagation();
            MessageBox.prompt('输入评论类容',{confirmButtonText:'发表'}).then(({ value, action }) => {
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
                            var d12_3=event.target.parentNode
                            d12_3.style.display="none"
                            this.axios.get(`/pinglunshu?pid=${this.arr[i].pid}`).then(resqu=>{
                                this.arr[i].plzs=resqu.data[0].plzs;
                                this.$forceUpdate()
                                console.log(this.arr);
                            });
                        });
                        this.axios.get('/leixinpinglunzs?yid='+yid).then(res=>{
                            this.leixinpinglunzs=res.data.leixinpinglunzs;
                            this.$forceUpdate()
                        });
                    }
                });
            })
        },
        dianji(e){
            e.stopPropagation();
            var d12_3=e.target.previousElementSibling;
            if(d12_3.style.display=="none"){
                d12_3.style.display="inline-block"
                }else{
                d12_3.style.display="none"
            } 
        },
        tiaozhuan(pid,number){
            this.axios.post('/llzs',{pid:pid,number:number}).then(res=>{
                console.log(res.data);
                if(res.data==1){
                    this.$router.push(`/xiangqing?pid=${pid}`);
                }
            });
        },
        tiaozhuang1(){
            this.$router.push(`/xuanze`)
        }
    },
    data(){
        return {
            arr:[],
            data:'',
            fatiezs:'',
            leixinpinglunzs:''
        }
    },
    mounted(){
        var yid=this.$route.query.yid
        this.axios.get('/leixin?yid='+yid).then(res=>{
            this.data=res.data
        });
        this.axios.get('/fatiezs?yid='+yid).then(res=>{
            this.fatiezs=res.data.fatiezs
        });
        this.axios.get('/leixinpinglunzs?yid='+yid).then(res=>{
            this.leixinpinglunzs=res.data.leixinpinglunzs
        });
        this.axios.get("/fatie?yid="+yid).then((res)=>{
            console.log(res.data)
            for(let i=0;i<res.data.length;i++){
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
                    console.log(resqu.data);
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
}
</script>