<template>
    <div>
    <!-- 表头开始 -->
    <mt-header fixed title="有料" style="z-index:9999;">
    </mt-header>
    <!-- 表头结束 -->
    <div style="margin-top:50px;">
        <!-- 搜索区域开始 -->
        <div class="search">
            <input type="text" placeholder="请输入查询的内容" v-model="values"><button @click="search">搜索</button>
        </div>
        <!-- 搜索区域结束 -->
        <!-- 内容区域开始 -->
        <div class="news">
            <!-- 内容一 -->
            <div class="trigrams1" v-for="(k,i) of news" :key="i">
                <router-link :to="`/content/${k.nid}`">
                <p>{{k.title}}</p>
                <div class="news_img" v-if="k.pic.length==3">
                    <img :src="n"  v-for="(n,m) of k.pic" :key="m">
                </div>
                <div class="trigrams2" v-else>  
                   <img :src="n"  v-for="(n,m) of k.pic" :key="m">
                </div>
                <span>评论&nbsp;{{k.count}}</span>&nbsp;
                <span>时间&nbsp;{{k.times}}</span>
                </router-link>
            </div>
        </div>
        <!-- 内容区域结束 -->
        <!-- 底部导航栏开始 -->
        <my-tab :selected='selected'></my-tab>
        <!-- 底部导航栏结束 -->
        </div>
    </div>
</template>
<script>
    export default{
        
        data(){
            return {
                values:"",
                foot:"trigrams",
                news:[],
                selected:'tab3',

            }
        },
        methods:{
            search(){
                 var value = this.values
                        if(value!=""){
                        // console.log(`${this.values}`);
                        this.news=[];
                        this.axios.get("/comment_ss?title="+value).then((res)=>{
                            let data=res.data.results;
                                //console.log(res.data.results)
                                //循环获得的数组对象
                            data.forEach(item=>{
                                //图片按&切割后存入arrs中
                                let pic=item.pic.split("&");
                                    for(var i=0;i<pic.length;i++){
                                        pic[i]=require('../assets/img/trigrams/'+pic[i]);
                                    }
                                    item.pic=pic
                                    console.log(item)
                                    item.times=item.times.substr(0,4);
                                    this.axios.get('/comment_num?new_id='+item.nid).then(res=>{
                                                let count=res.data.length;
                                                // console.log(res.data);
                                            item.count=count;
                                            this.news.push(item);
                                            });
                        })
                    })
                } 
            }
        },
        mounted(){
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
                elem.times = elem.times.substr(0,4);
                this.news.push(elem);          
                }); 
              });
              console.log(this.news);
                }
             });
     }
     }
</script>
<style scoped>
span{
        font-size: 14px;
        color: #999;
    }
    a{
        text-decoration: none;
        color: #000;
        font-size: 16px;
        line-height: 24px;
    }
.search{
    display: flex;
    height: 60px;
    font-size: 16px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    background-color: #F8F8F8;
}
.search input{
    width: 70%;
    height: 30px;
    margin-left: 10px;
    outline: 0;
    border: 0;
    padding-left: 16px;
    background: url("../assets/搜索.png") no-repeat left center;
}
.search button{
    width: 20%;
    height: 36px;
    color: #A2A2B6;
    background: #DFDFDF;
    border: 0;
}
.news{
    /* box-sizing:border-box;  */
    margin:1rem 1rem 55px;
    font-size: 18px;
}
.trigrams1{
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    padding-bottom: 10px;
}
    
    .trigrams1 .news_img {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
   
    .trigrams1 .news_img img {
        width: 33.33333%;
        box-sizing: border-box;
        padding: 0 4px;
    }   
  .trigrams2 img {
       width: 100%;
       margin: 10px 0; 
    }  
</style>