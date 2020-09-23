<template>
    <div>
        <!-- 表头开始 -->
    <mt-header fixed title="资讯详情">
      <router-link to="/trigrams" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 表头结束 --> 
    <div style="margin-top:50px;">
        <div class="content">
            <!-- 标题区域开始 -->
            <div>
                <p id="p1">{{news.title}}</p>
                <div class="content_span">
                    <span>{{news.subhead}}</span>
                    <span>{{news.times}}</span>
                </div>
            </div>
            <!-- 标题区域结束 -->
            <!-- 内容区域开始 -->
            <div class="html1" v-html="news.content">
            </div>
            <!-- 内容区域结束 --> 
            <span class="yuedu">
            <p>阅读{{news.number}}</p>   
            </span>       
        </div>      
        <!-- 评论区域开始 -->
        <div class="pl">
            <!-- 统计评论数量 -->
            <div id="sss">
            <p>全部评论{{num}}</p>
            <p>点赞{{news.count}}</p>
            </div>
            <div class="user_pl"  v-for="(p,i) of comment222" :key="i" >
                <!-- 用户头像 -->
                <div class="portrait"><img :src="p.avatar" alt=""></div>
                <div class="user_ly">
                    <div class="userdata">
                        <!-- 用户姓名 -->
                        <div>{{p.uname}}</div>
                        <!-- 发表顺序时间 -->
                        <div class="usertime">
                            <span>{{i+1}}楼</span>
                            <span>{{p.comment_time}}</span>   
                        </div>
                        <!-- 内容区域 -->
                        <div>
                            {{p.comment_content}}
                        </div> 
                    </div>
                    <div class="tatal">
                        <!-- 点赞数量 -->
                        <span>{{p.count}}</span>
                        <img @click="love(p.cid,i)"  class="d1" src="../assets/img/trigrams/news/love (1).png" v-if="p.islike=='0'">
                        <img @click="love(p.cid,i)" src="../assets/img/trigrams/news/love.png" v-else>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评论区域结束 -->
        <!-- 底部评论开始 -->
        <div class="commet">
            <router-link to="/trigrams"><img src="../assets/img/trigrams/news/return.png"></router-link>
            <input type="text" v-model="pinlun" placeholder="来说说我的看法...">
            <img src="../assets/img/trigrams/news/comment.png" alt="">
            <div id="love">
                <img @click="love_new()" src="../assets/img/trigrams/news/love.png" alt="" v-if="islove=='1'">
                <img @click="love_new()"  src="../assets/img/trigrams/news/love (1).png" alt="" v-else >                 
            </div>           
            <img @click="addpinlun" src="../assets/img/trigrams/news/fasong.png" alt="">
        </div>       
        <!-- 底部评论结束 -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            comment:"",
            news:{},
            comment222:[],
            num:0,
            pinlun:'',
            islove:'0'
            
        }
    },
    methods:{
        //新闻点赞
        love_new(){
            if(sessionStorage.getItem('uid')==null){
        if(confirm("请先登录")){
           this.$router.push('/personal')        
      }
      }else{ 
        let news_id = this.$route.params.lid;
        let users_id = sessionStorage.getItem('uid');
        this.axios.get('/love_new?news_id='+news_id+"&users_id="+users_id).then(res=>{
            console.log(res.data);
            this.islove=res.data
            this.num_lovenum(news_id)
        })
        }
        },
        // 查找新闻的点赞数量
        num_lovenum(news_id){
            this.axios.get('num_lovenum?news_id='+news_id).then(res => {
                console.log("新闻的点赞数",res.data);
               this.news.count=res.data[0].count
               console.log(this.news)
               this.$forceUpdate();
            })
        },    
        // 写评论
        addpinlun(){
            if(sessionStorage.getItem('uid')==null){
        if(confirm("请先登录")){
           this.$router.push('/personal')        
      }
      }else{ 
        let new_id = this.$route.params.lid;
        let comment_time = new Date().toLocaleString();
        let users_id = sessionStorage.getItem('uid');
        this.axios.get('/add_comment?new_id='+new_id+'&comment_content='+this.pinlun+'&comment_time='+comment_time+'&users_id='+users_id).then(res=>{
            console.log(res.data);
            let obj = {}
            res.data.result3[0].avatar = require("../assets/"+res.data.result3[0].avatar);
            obj.avatar = res.data.result3[0].avatar;
            obj.cid =res.data.result2[0].cid; 
            obj.comment_content = res.data.result2[0].comment_content; 
            obj.comment_time = res.data.result2[0].comment_time; 
            obj.count = 0; 
            obj.islike = 0;
            obj.uname = res.data.result3[0].uname; 
            this.comment222.push(obj);
            this.pinlun='';
        // 查评论的数量
        this.axios.get('comment_num?new_id='+new_id).then(res=>{
            console.log(res.data);
            this.num=res.data.length;
        })
        })
        }
        }, 
        // 查找点赞评论数量
        lovenum(comment_id,i){
            console.log(comment_id)
            this.axios.get('lovenum?comment_id='+comment_id).then(res => {
                console.log("评论的点赞数",res.data);
                // 将点赞数给当前评论的count
               console.log(res.data[0].count) 
               console.log(this.comment222[i])
               this.comment222[i].count=res.data[0].count;

            })
        },
        love(cid,i){
            if(sessionStorage.getItem('uid')==null){
        if(confirm("请先登录")){
           this.$router.push('/personal')        
      }
      }else{ 
            // 获得点赞用户的id
            let users_id = sessionStorage.getItem('uid');
            this.axios.get('love?users_id='+users_id+'&comment_id='+cid).then(res=>{
              this.comment222.forEach(elem=>{
                  this.lovenum(cid,i);
                  console.log(res.data);
                  this.comment222[i].islike=res.data;
          });                  
       });   
     }
        }
        },
    mounted(){
       this.d1 = document.getElementById('d1');
        // 动态获取url信息 id
        let nid=this.$route.params.lid;
        this.axios.get('/content?nid='+nid).then(res => {
            this.news=res.data[0];
            console.log(res.data)
            
        });
        //加载新闻的点赞状态以及点赞数量
        let news_id = this.$route.params.lid;
        let users_id = sessionStorage.getItem('uid');
        this.axios.get('/islove?news_id='+news_id+"&users_id="+users_id).then(res=>{
            this.num_lovenum(news_id);
            console.log(res.data);
            this.islove=res.data;
        })  

        // 加载评论点赞  
        let new_id = this.$route.params.lid;
        this.axios.get('comment222?new_id='+new_id).then(res => {
            console.log(res.data);
            res.data.forEach(elem => {
                elem.avatar = require('../assets/'+elem.avatar);
                this.num+=1;
            console.log(elem)
        // 评论点赞数量以及我是否点赞
        let cid = elem.cid;
        this.axios.get('comment_like?comment_id='+cid+'&users_id='+users_id).then(res=>{
            console.log(res.data);
            elem.islike=res.data.islike.length>0?1:0;
            elem.count=res.data.num[0].count;
            this.comment222.push(elem);
            });
        });  
        console.log(this.comment222); 
    });  
}
}
</script>
<style>
.html1 p{
   font-size: 14px;
   color: #909090;
   line-height: 22px;
   margin: 0;
   text-indent: 2em;
}
</style>
<style scoped>
.content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 10px;
}
.content #p1{
    font-size: 18px;
    color: #000;
    font-weight: bold;
    line-height: 25px;
}
.content .content_span{
    display: flex;
    justify-content: space-between;
}
.content .content_span span{
    font-size: 14px;
        color: #999;
        margin: 10px 0;
}
/* 打赏区域样式 */
.content .reward{
    display: flex;
    justify-content: space-between;
    /* height: 10%; */
    margin-top: 60px;
    background: #f8f8f8;
    
}
.reward .d1{
    display: flex;
    /* line-height: 40px; */
    /* justify-content: space-around; */
}
.reward .d1 div:first-child>img{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 20px 8px;
}
.reward .d1 div:last-child p{
    font-size: 14px;
    margin-top: 28px;
    color: #000;
}
.reward .d1 div:last-child span{
    display: block;
    font-size: 12px;
    padding-top: 8px;
    color: #c8c8c8;
}
.reward .span1{
    display: block;
    width: 80px;
    height: 30px;
    margin: 25px 5px;
    background: #f00;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
}
.reward_money p{
    text-align: center;
    margin-top: 20px;
}
.read{
    font-size: 12px;
    color: #ccc;
    margin-top: 20px;
}
/* 推荐商品样式 */
.commodity{
    background: #ebebeb;
    padding: 10px 10px 15px;
    margin-top: 20px;
}
.commodity .p1{
    font-size: 16px;
    color: #000;
    padding: 15px 0 15px 10px;
}
.commodity_d1{
    display: flex;
    /* justify-content: space-between; */
}
.commodity_d1 div{
    width: 50%;
    background: #fff;
}
.commodity_d1 div:first-child{
    margin-right: 10px;
    
}
.commodity_d1 img{
    width: 100%;
    height: 170px;
}
.commodity_d1 p{
    font: size 16px;
    margin-top: 20px;
    padding-left: 10px;
}
.commodity_d1 .p2{
    color: #f00;
}
.commodity_d1 .p3{
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
}
/* 评论区域 */
.pl{
    margin-bottom: 50px;
}
#sss{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    text-align: center;
    color: #757575;
    height: 40px;
}
.pl p{
    width: 100px;
    margin: 0;
    line-height: 40px;
}
.pl .user_pl{
    display: flex;
    justify-content: start;
    margin: 10px;
} 
.pl .user_pl .portrait img{
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 100%;
}
.pl .user_pl .user_ly{
    display: inline-block;
    width: 90%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
}
.userdata div{
    margin-top:10px ;
    font-size: 14px;
    color: #000;
}
.userdata .usertime{
    font-size: 12px;
    color: #999;
}
.userdata .usertime span:first-child{
    margin-right: 20px;
}

.user_ly .tatal{
    font-size: 14px;
    color: #999;
    padding-bottom: 5px;
}
.user_ly .tatal img {
    vertical-align:middle;
    margin: 0 5px;
}
/* 底部评论区域 */
.commet{
    height: 40px;
    padding-top: 10px;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0px;
    background-color: #fff;
}
.commet img{
    padding:5px 10px;
    vertical-align:middle;
}
.commet input{
    padding: 10px 0 10px 10px;
    border: 0;
    border-radius: 5px;
    background: #e8e8e8;
}
#love{
    display: inline-block;
}
.yuedu{
   color: #909090;
   font-size: 16px; 
}
</style>
