<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="注册">     
        <router-link to="/personal"  slot="left">
        <mt-button icon="back"></mt-button></router-link>              
    </mt-header>
    <!-- 顶部导航结束 -->
    <div>
      <!-- 上传头像开始 -->
      <input id="tx"  @change="huan" type="file" style="display:none;" ref="fileInput">
      <label for="tx">
        <div class="touxiang">
          <div>头像</div>
          <div class="tx_img">
           <img :src="bbb">
          </div>
        </div>
      </label>
      <!-- 上传头像结束 -->
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
    <mt-field 
    label="确认密码" 
    placeholder="请确认密码" 
    type="password" 
    :state="userowd2State" 
    v-model="userpwd2"
    :attr="{maxlength:10,autocomplete:'off'}"
     @blur.native.capture="upwd2"
     >
     </mt-field>
     <mt-field 
    label="电话" 
    placeholder="请输入电话号码" 
    :state="userphoneState" 
    :attr="{maxlength:11}" 
    disableClear 
    v-model="userphone" 
     @blur.native.capture="phone"
     
    >   
       <!--input 的属性autocomplete 默认为on其含义代表是否让浏览器自动记录之前输入的很多时候，需要对客户的资料进行保密，防止浏览器软件或者恶意插件获取到可以在input中加入autocomplete="off" 来关闭记录  -->
    </mt-field>
    <!-- 性别单选按钮 -->
    <div class="sex">
      <span>性别</span>
      
      <input id="man" type="radio" name="sex" value="1" v-model="sex">男
		  <input id="wom" type="radio" name="sex" value="0"  v-model="sex">女
		  <input id="unk" type="radio" name="sex" value="-1"  v-model="sex">保密<br>
    </div>
    <input type="checkbox" v-model="f" class="agree">用户同意
    <mt-button type="primary" size="large" @click="reg" :disabled="!f">免费注册</mt-button>
    <router-link class="btn" to="/login">已注册，点此登录</router-link>
  </div>
  </div>
</template>
<script>
import aaa from '../assets/img/personal/avatar.png'
export default {
  data(){
  return {//用data函数时一定要记得return 
    // 定义初始值
    username:"",
    userpwd:"",
    userpwd2:"",
    userphone:"",
    usernameState:"",
    userpwdState:"",
    userowd2State:"",
    userphoneState:"",
    sex:0,
    f:false,
    bbb:aaa,
    formData:'',
    file:''
   } },
  methods:{
    huan(){
    let formData = new FormData();
     let file = this.$refs.fileInput.files[0];
     this.file=file;
    //  console.log(file)
     let fr = new FileReader();//FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件
    //  console.log(fr)
     fr.onload=(e)=>{
       this.bbb=e.target.result;
       console.log(e.target)
     }
     fr.readAsDataURL(file);
     formData.append("touxiang",file);
     this.formData=formData;
    },
      user(){
         // 1.验证用户名是否合法，规则为：任意的字母数字下划线的组合，长度为2~12之间
    var usernameRegExp=/^\w{2,12}$/;//[a-z0-9A-Z_]{2,12}
    if(usernameRegExp.test(this.username)){
        this.usernameState="success";
      return true;
    }else{
        this.usernameState="error";
      console.log(this.username);
      console.log(usernameRegExp.test(this.username));
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
     var userpwdRegExp=/^\w{6,15}$/;
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
      upwd2(){
        // 3.确认密码
    if(this.userpwd==this.userpwd2){
        this.userowd2State="success";
        return true;
    // 什么也不干
    }else{
        this.userowd2State="error"
      this.$toast({
         message:'密码不一致',
         position:'top',
         duration:3000//显示时间的毫秒数
       })
      return false;//终止函数的执行
    }  
      },
      phone(){
        // 1.验证用户手机号码是否合法，规则为：1开头第二位3-9的11位数字组合，长度为11
        let userphoneRegExp = /^1[3-9]\d{9}$/;
               if(userphoneRegExp.test(this.userphone)){
                   this.userphoneState="success";
                //    console.log('正确');
                return true;
               }else{
                   this.userphoneState="error";
                //    console.log('错误');
                //简写
                //this.$toast("电话号码错误");
                //标准
                this.$toast({
                    message:"电话号码错误",
                    position:"middle",
                    duration:3000//显示时间的毫秒数
                })
                return false;//终止函数的执行
        }
      },
   reg(){
    // 4.如果都正确了，就将信息提交到服务器
    if(this.user() && this.upwd() && this.upwd2() && this.phone() ){
      console.log(this.sex)
      //注册 带参传递 姓名,密码,电话
        this.axios.post('/reg',"uname=" +this.username+"&upwd="+this.userpwd+"&uphone="+this.userphone+"&sex="+this.sex+"&avatar="+this.avatar).then(res=>{
          //根据服务器响应的code进行判断
          if(res.data.code==0){
            //注册失败弹出提示框
            this.$messagebox('倒霉孩子','用户名被占了，又得重写')
          }else{
             console.log("发送请求，插入图片");          
             this.axios.post("/touxiang_pic",this.formData).then(res=>{
                    console.log(res.data);
                    if(res.data==1){
                      console.log("ok");
      }
    })
            this.$router.push("/login")
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .agree,.sex{
    text-align: left;
    margin: 15px auto;
     margin-left: 10px;
  }
  .sex :first-child{
   margin-right: 50px;
  }
 .btn{
   text-decoration: none;
   display: block;
   width: 130px;
   margin: 15px auto;
   color: darkgray;
 }
 .touxiang{
   width: 100%px;height: 90px;
   display: flex;
 }
 .touxiang div:first-child{
   margin-left:10px;
   line-height: 90px;
 }
 .tx_img {
   margin-left:103px;
   margin-top: 5px;
   width: 80px;height: 80px;
   border: 1px solid rgb(199, 32, 88);
   border-radius: 50%;
   overflow: hidden;
   
 }
 .tx_img img{
   max-width: 80px;
   min-height: 80px;
 }
</style>