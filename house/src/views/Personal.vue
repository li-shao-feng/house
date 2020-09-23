<template>
    <div>
         <!-- 表头开始 -->
    <mt-header fixed title="个人中心">
    </mt-header>
    <!-- 表头结束 -->
    <div style="margin-top:50px;">
        <!-- 头像开始 -->
            <mt-cell v-if="isLogin"  class="avatar" :title="me.uname">
                <img :src="me.avatar" slot="icon">
                <span @click="unlogin()">注销</span>
            </mt-cell>  
            <mt-cell v-else  class="avatar" title="【未登录】">
                <img src="../assets/img/personal/avatar.png" slot="icon">
                <router-link to="/login">登录</router-link>  |
                <router-link to="/reg">注册</router-link>
            </mt-cell>   
        <!-- 头像结束 -->
        
        <!-- 内容开始 -->
        <div class="cell"  >
            <mt-cell title="系统通知" to="/datatwo" >
                <img src="../assets/img/personal/1.png" slot="icon">
            </mt-cell>
            <mt-cell title="我的订单" to="/reg" >
                <img src="../assets/img/personal/2.png" slot="icon">
            </mt-cell>
            <mt-cell title="购物车" to="/reg"  >
                <img src="../assets/img/personal/3.png" slot="icon">
            </mt-cell>
            <mt-cell title="售后" to="/reg"  >
                <img src="../assets/img/personal/4.png" slot="icon">
            </mt-cell>
            <mt-cell title="足迹" to="/reg" >
                <img src="../assets/img/personal/5.png" slot="icon">
            </mt-cell>
        </div>
        <!-- 内容结束 -->
        <!-- 底部导航栏开始 -->
         <my-tab :selected='selected'></my-tab>
        <!-- 底部导航栏结束 -->
        </div>
    </div>
</template>
<script>
    export default{     
        data(){
            return{
                me:{},
                selected:'tab4',
                isLogin:false
            }
        },
        methods:{ 
            unlogin(){
                if(confirm("你确定要注销吗？")){
                    sessionStorage.clear();
                    this.isLogin=false;
                }
            }    
         },
        mounted(){
            // 从浏览器缓存中取出uid,并发送请求
            let uid=sessionStorage.getItem('uid');
            if(uid!==null){
                console.log(uid)
           this.axios.get('/personal?uid='+uid).then(res=>{
            // 接收个人中心所需的数据
            res.data[0].avatar=require('../assets/'+res.data[0].avatar);
            this.me.avatar=res.data[0].avatar;
            this.me.uname=res.data[0].uname;
            this.isLogin=true;
           })           
        }}
    }
</script>
<style scoped>
a{
    text-decoration: none;
    color: #000;
}
.avatar{
    background:url("../assets/img/personal/avatar_bg.jpg") no-repeat center center;
    background-size:100%;
    /* background-image: linear-gradient(180deg,0,150,0,.5); */
    /* background: rgba(0, 150, 0, .5); */
    font-size: 24px;
    color: #fff; 
}
.avatar img{
    width: 50px;
    height: 50px;
    margin: 30px 20px; 
    border-radius:50%;
}
.cell{
    margin-bottom: 55px;
}
.cell a {
    border-bottom: 1px solid #eee;
    margin-top: 5px;
}
/* #footer :hover{
    color:#1afa29;
} */
</style>