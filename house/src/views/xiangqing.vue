<template>
    <div class="xiangqing">
        <!-- 表头开始 -->
    <mt-header fixed>
      <router-link to="/about" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 表头结束 --> 
    <div style="margin-top:50px;">
        <div class="xiangqing_1">
        <div class="d1">
            <div class="d1_1">
                <img :src="obj.upicture" alt="">
                <div class="d1_2">
                    <span class="s1">{{obj.uname}}</span>
                    <span class="s2">{{(new Date(obj.p_time)).toLocaleString()}}&nbsp; 人气{{obj.dzs}}</span>
                </div>
            </div>
            <div class="d1_3">
                <img src="../../public/img/jingxuan.png" alt="">
                <span>精品话题</span>
            </div>
        </div>
        <div class="d2">{{obj.p_title}}</div>
        <div class="d3"><img :src="obj.p_picture" alt=""></div>
        <div class="d4">{{obj.p_text}}</div>
        <div class="d5">
            <img src="../../public/img/jubao.png" alt="">
            <span class="s1">举报</span>
        </div>
        </div>
        <div class="xiangqing_2">
            <div class="d1">
                <span>全部评论 ({{obj.plzs}})</span>
                <span><span class="s1">{{obj.dzs}}</span> 赞</span>
            </div>
        </div>
        <div class="xiangqing_3">
            <div class="d1" v-for="(elem,i) of arr" :key="i">
                <img src="../../public/img/touxiang.jpg" alt="">
                <div class="d2">
                    <div class="d3">
                        <div class="d4">{{elem.uname}}</div>
                        <div class="d5">{{i+1}}楼 {{(new Date(elem.c_time)).toLocaleString()}}</div>
                        <div class="d6">{{elem.c_text}}</div>
                    </div>
                    <div class="d7">
                        <img class="img1" src="../../public/img/02.png" alt="">
                        <img class="img2" src="../../public/img/xin.png" alt="">
                        <span class="s1">赞</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="xiangqing_4">
            <div class="d1">
                <img @click="fanhui" class="img1" src="../../public/img/fanhui.png" alt="">
                <input type="text" placeholder="来说说我的看法" v-model="value">
                <mt-button plain type="primary" size="small" @click="fabiao">发表</mt-button>
            </div>
            <div class="d2">
                <img class="img2" src="../../public/img/04.png" alt="">
                <img class="img3" :src="obj.dztb" alt="" @click="dianzan($event)">
            </div>
        </div>
    </div>
    </div>
</template>
<style scoped>
    .xiangqing{
        background: #EEEEEE;
    }
    .xiangqing_1{
        padding: 15px;
        background: white;
    }
    .xiangqing .xiangqing_1 .d1{
        display: flex;
        justify-content: space-between;
    }
    .xiangqing .xiangqing_1 .d1 .d1_1 img{
        width: 50px;height: 50px;
        border-radius: 5px;
        margin-right: 8px;
        vertical-align:top;
    }
    .xiangqing .xiangqing_1 .d1 .d1_1 .d1_2{
        display: inline-block;
        padding-top: 5px;
    }
    .xiangqing .xiangqing_1 .d1 .d1_1 .d1_2 .s1{
        font-size: 16px;
        margin-bottom: 10px;
        display: block;
    }
    .xiangqing .xiangqing_1 .d1 .d1_1 .d1_2 .s2{
        font-size: 12px;
        color: #7E7E7E;
        display: block;
    }
    .xiangqing .xiangqing_1 .d1 .d1_3 img{
        margin-right: 5px;
        vertical-align:middle;
    }
    .xiangqing .xiangqing_1 .d1 .d1_3 span{
        color: #FF6C3E;
        font-size: 12px;
    }
    .xiangqing .xiangqing_1 .d2{
        margin: 10px 0;
    }
    .xiangqing .xiangqing_1 .d3 img{
        width: 100%;
    }
    .xiangqing .xiangqing_1 .d4{
        line-height: 20px;
    }
    .xiangqing .xiangqing_1 .d5{
        text-align: right;
    }
    .xiangqing .xiangqing_1 .d5 img{
        vertical-align:middle;
        margin-right: 5px;
    }
    .xiangqing .xiangqing_1 .d5 .s1{
        font-size: 12px;
    }
    .xiangqing .xiangqing_2{
        padding: 15px;
        margin-top: 15px;
        background: white;
        border-bottom: 1px solid #EEEEEE;
    }
    .xiangqing .xiangqing_2 .d1{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
    .xiangqing .xiangqing_2 .d1 .s1{
        color: #62B65D;
    }
    .xiangqing .xiangqing_3{
        padding: 15px;
        background: white;
    }
    .xiangqing .xiangqing_3 .d1{
        margin-bottom: 15px;
    }
    .xiangqing .xiangqing_3 .d1>img{
        width: 40px;
        border-radius: 50%;
        vertical-align:top;
        margin-right: 15px;
    }
    .xiangqing .xiangqing_3 .d1 .d2{
        border-bottom: 1px solid #EEEEEE;
        display: inline-flex;
        justify-content: space-between;
        width: 80%;
    }
    .xiangqing .xiangqing_3 .d1 .d2 .d3{
        width: 210px;
    }
    .xiangqing .xiangqing_3 .d1 .d2 .d3 .d4{
        margin-bottom: 15px;
    }
    .xiangqing .xiangqing_3 .d1 .d2 .d3 .d5{
        margin-bottom: 15px;
        font-size: 12px;
        color: #9B9B9B;
    }
    .xiangqing .xiangqing_3 .d1 .d2 .d3 .d6{
        font-size: 15px;
        margin-bottom: 40px;
    }
    .xiangqing .xiangqing_3 .d1 .d2 .d7 .img2{
        width: 24px;
        vertical-align:middle;
    }
    .xiangqing .xiangqing_3 .d1 .d2 .d7 .img1{
        vertical-align:middle;
    }
    .xiangqing .xiangqing_3 .d1 .d2 .d7 .s1{
        vertical-align:middle;
    }
    .xiangqing .xiangqing_4{
        padding: 10px 15px;
        border-top: 1px solid #EEEEEE;
        background: white;
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        z-index: 5;
        width: 100%;
    }
    .xiangqing .xiangqing_4 .d1{
        display: inline-block;
    }
    .xiangqing .xiangqing_4 .d1 .img1{
       vertical-align:middle;
    }
    .xiangqing .xiangqing_4 .d1 input{
        height: 30px;
        background: #EEEEEE;
        border: none;
        padding-left: 15px;
        outline: none;
    }
    .xiangqing .xiangqing_4 .d1 button{
        padding: 2px 8px;
        font-size: 12px;
        height: 30px;
        margin-left: 10px;
    }
    .xiangqing .xiangqing_4 .d2{
        margin-right: 15px;
    }
    .xiangqing .xiangqing_4 .d2 .img2{
        vertical-align:middle;
        margin-left: 15px;
    }
    .xiangqing .xiangqing_4 .d2 .img3{
        vertical-align:middle;
        margin: 0 15px;
    }
</style>
<script>
export default {
    data(){
        return{
            value:'',
            arr:[],//数组不能给标签内容{{}}绑定语法同步变量的值，只能用于绑定v-for数组
            obj:{}//因为数组不能直接给标签内容绑定变量，所以用对象来给标签内容绑定，数组只能用于v-for绑定数组
        }
    },
    methods:{
        fabiao(){
            if(sessionStorage.getItem('uid')==null){
        if(confirm("请先登录")){
           this.$router.push('/personal')        
      }
      }else{ 
            if(this.value!=''){
                var value1=this.value;
                var yid=this.obj.yid;
                var pid=this.$route.query.pid;
                var uid=sessionStorage.getItem("uid");
                var uname=sessionStorage.getItem("uname");
                this.axios.post('/pinglun',{yid:yid,pid:pid,uid:uid,uname:uname,c_text:value1,c_time:new Date().getTime()}).then(res=>{
                    this.value=''
                    if(res.data==1){
                        this.axios.get(`/pinglun1?pid=${pid}`).then((resq)=>{
                            if(resq.data!=0){
                                console.log(11);
                                console.log(resq.data);
                                this.arr=resq.data
                            }
                            this.axios.get(`/pinglunshu?pid=${pid}`).then(resqu=>{
                                this.obj.plzs=resqu.data[0].plzs;
                                this.$forceUpdate()
                                console.log(this.arr);
                            });
                        });
                    }
                });
            }
          }
        },
        dianzan(e){
            e.stopPropagation();
            if(sessionStorage.getItem('uid')==null){
        if(confirm("请先登录")){
           this.$router.push('/personal')        
      }
      }else{ 
            var uid=sessionStorage.getItem("uid");
            var upicture=sessionStorage.getItem("upicture");
            var pid=this.$route.query.pid;
            this.axios.get(`/dianzan1?pid=${pid}&uid=${uid}&upicture=${upicture}`).then(res=>{
                if(res.data.code==1){
                    var img1="dianzan.png"
                    e.target.src=require('../../public/img/'+img1);
                }else{
                    var img2="01.png"
                    e.target.src=require('../../public/img/'+img2);
                }
                this.axios.get(`/dianzan?pid=${pid}`).then(resqu=>{
                    this.obj.dzs=resqu.data.dzs[0].zs
                    this.$forceUpdate()
                });
            });
         }
        },
        fanhui(){
            window.history.back(-1);//历史回退上一页，前提是上一页的页面参数已缓存
        }
    },
    mounted(){
        this.axios.get('/about1?pid='+this.$route.query.pid).then(res=>{
            res.data[0].p_picture=require('../../public/img/'+res.data[0].p_picture);
            res.data[0].upicture=require('../assets/'+res.data[0].upicture);
            var uid=sessionStorage.getItem("uid");
            var upicture=sessionStorage.getItem("upicture");
            this.axios.get(`/dianzan2?pid=${res.data[0].pid}&uid=${uid}&upicture=${upicture}`).then(resqui=>{
                if(resqui.data.code==1){
                    var img1="dianzan.png"
                    res.data[0].dztb=require('../../public/img/'+img1);
                    this.$forceUpdate()
                }else{
                    var img2="01.png"
                    res.data[0].dztb=require('../../public/img/'+img2);
                    this.$forceUpdate()
                }
            });
            res.data[0].dztx=[];
            this.axios.get(`/dianzan?pid=${res.data[0].pid}`).then(resqu=>{
                console.log(resqu.data);
                res.data[0].dzs=resqu.data.dzs[0].zs
                for(let m=0;m<resqu.data.dz.length;m++){
                    resqu.data.dz[m].upicture=require('../assets/'+resqu.data.dz[m].upicture)
                    res.data[0].dztx.push(resqu.data.dz[m].upicture);
                    this.$forceUpdate()
                }
            });
            this.axios.get(`/pinglunshu?pid=${res.data[0].pid}`).then(resqu=>{
                    res.data[0].plzs=resqu.data[0].plzs;
                    this.$forceUpdate()
                });
            this.obj=res.data[0];
            console.log(this.obj);
        });
        var pid=this.$route.query.pid;
        this.axios.get(`/pinglun1?pid=${pid}`).then((resq)=>{
            if(resq.data!=0){
            this.arr=resq.data
            }
        });
    },
}
</script>