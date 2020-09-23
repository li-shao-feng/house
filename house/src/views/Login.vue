<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="登录">     
        <router-link to="/personal"  slot="left">
        <mt-button icon="back"></mt-button></router-link>              
    </mt-header>
    <!-- 顶部导航结束 -->
    <div>
    <mt-field 
    label="用户名" 
    placeholder="请输入用户名" 
    :state="usernameState" 
    :attr="{maxlength:10}" 
    disableClear 
    v-model="username" 
     @blur.native.capture="user"
    >
    </mt-field>
    <!-- 设置原生属性，例如 :attr="{ maxlength: 10 }"输入的最大长度为10 -->
    <mt-field 
    label="密码" 
    placeholder="请输入密码" 
    type="password" 
    :state="userpwdState"
    v-model="userpwd" 
     @blur.native.capture="upwd"
     >
    </mt-field>
    <mt-button type="primary" size="large" @click="reg">快速登录</mt-button>
  </div>
  </div>
</template>
<script>
export default {
  data(){
  return {//用data函数时一定要记得return 
    // 定义初始值
    username:"",
    userpwd:"",
    userpwd2:"",
    usernameState:"",
    userpwdState:"",
    userowd2State:""
   } },
  methods:{
      user(){
         // 1.验证用户名是否合法，规则为：任意的字母数字下划线的组合，长度为6~12之间
    var usernameRegExp=/^\w{2,12}$/;//[a-z0-9A-Z_]{6,12}
    if(usernameRegExp.test(this.username)){
        this.usernameState="success";
      return true;
    }else{
        this.usernameState="error";
      // console.log(this.username);
      // console.log(usernameRegExp.test(this.username));
    //  this.$toast('用户名格式错误')//简写
       this.$toast({
         message:'用户名错误',
         position:'top',
         duration:3000//显示时间的毫秒数
       })
      return false;//终止函数的执行
    }  
      },
      upwd(){
       // 1.验证用户密码是否合法，规则为：任意的字母数字下划线的组合，长度为8~20之间
     var userpwdRegExp=/^\w{4,20}$/;
      if(userpwdRegExp.test(this.userpwd)){
          this.userpwdState="success"
       return true;
    }else{
        this.userpwdState="error"
    //  this.$toast('用户名格式错误')//简写
       this.$toast({
         message:'密码错误',
         position:'top',
         duration:3000//显示时间的毫秒数
       })
      return false;//终止函数的执行
    }
    },
   
   reg(){
    // 4.如果都正确了，就将信息提交到服务器
    if(this.user() && this.upwd()){
      console.log(this.username,this.userpwd)
      this.axios.post('/login',"username="+this.username+"&userpwd="+this.userpwd).then((res)=>{
        console.log(res.data);
        if(res.data.code==0){
            this.$messagebox('用户登录失败')
        }else{         
          // 将id写入浏览器缓存
           sessionStorage.setItem("uid",res.data.results[0].uid);
           sessionStorage.setItem("upicture",res.data.results[0].avatar);
           sessionStorage.setItem("uname",res.data.results[0].uname);
          //  页面跳转到个人中心
          // res.data.results[0].avatar=require('../assets/img/personal/'+res.data.results[0].avatar);
           this.$router.push('/personal');
        }
      })
    }
    }   
  }
}
</script>