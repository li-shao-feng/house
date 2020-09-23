<template>
  <div>
    <!-- 表头开始 -->
    <mt-header fixed :title="sname.a">
      <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 表头结束 -->    
    <!-- 内容区域开始 -->
    <div class="neirong">
     <span>基本信息</span>
     <div class="width">
     <input type="text" v-model="area" placeholder="所在区域">
     <input type="text" v-model="community" placeholder="所属小区">
     </div>
     <div>
     <span>装修类型</span>
     <div class="font_big">
     <input type="radio" id="aa" v-model="Decoration_type" value=0><label for="aa">毛坯</label>
     <input type="radio" id="bb"  v-model="Decoration_type" value=1><label for="bb">精装</label>
     </div>
     </div>
     <div>
     <span>用途</span>
     <div class="font_big">
     <input type="radio" id="cc" v-model="application" value=0><label for="cc">住宅</label>
     <input type="radio" id="dd" v-model="application" value=1><label for="dd">商铺</label>
     </div>
     </div>     
     <div class="width">
     <span>出售信息</span>
     <input type="text" v-model="iname" placeholder="房屋名称">
     <input type="text" v-model="price" :placeholder="sname.b">
     <input type="text" v-model="unit_type" placeholder="户型">
     <input type="text" v-model="age" placeholder="年代">
     <input type="text" v-model="acreage" placeholder="面积（单位：m²）">
     <input type="text" v-model="floor_number" placeholder="楼层">
     <input type="text" v-model="phone" placeholder="手机号">
    </div>
    <span>房屋描述</span>
    <div>
    <textarea rows="5" cols="49" maxlength="200"  v-model="description" name="fangwumiaoshu" style="resize:none;"  placeholder="请输入多行文本" ></textarea>
    </div>
    <span>房屋封面</span>-
    <div class="add_pic">
    <input type="file" id="ee" @change="ee" style="display:none;" ref="fileInput">
    <div>
      <label for="ee"><img src="../assets/add_pic.png" alt=""></label>
    </div>
    <div class="__img">
      <img :src="bbb">
    </div>
    </div>
    <div class="btn_size">
    <mt-button type="primary" @click="tijiao" size="large">提交</mt-button>
    </div>
    </div>
    <!-- 内容区域结束 -->
  </div>
</template>
<style scoped>
 .neirong{
  margin-top: 50px;
  background-color: #d6b21060;
}
.neirong span{
  font-size: 16px;
  line-height: 50px;
  margin-top: 30px;
  margin-left: 8px;
}
.width>input{
  width: 350px;height: 40px;
  margin-left: 8px;
}
.width>input~input{
  margin-top: 10px;
}
.font_big{
  font-size: 20px;
}
.font_big>input{
  width: 16px;height: 16px;
}
textarea{
  margin-left: 8px;
}
.add_pic{
 width: 350px;height: 156px;
 background-color: #fff;
 margin-left: 9px;
 border: 1px solid #767676;
}
.btn_size{
  width: 350px;
  margin-left: 8px;
  margin-top: 10px;
}
.__img{
  width: 130px;height: 97.6px;
  float: right;
  margin-top: -120px;
  margin-right: 61px;
}
.__img img{
  width: 100%;
  height: 100%;
}
</style>
<script>
import Qs from 'qs';
import aaa from '../assets/tupian.png'
export default {
  data(){
    return{
     sname:{},
     area:'',
     community:'',
     Decoration_type:0,
     application:0,
     iname:'',
     price:'',
     unit_type:'',
     age:'',
     acreage:'',
     floor_number:'',
     phone:'',
     description:'',
     pic:'',
     house_type:10,
     agent:'',
     formData:'',
     bbb:aaa
    }
  },
  methods:{
     tijiao(){
       
let data = {
      'area':this.area,
      'community':this.community,
      'Decoration_type':this.Decoration_type,
      'application':this.application,
      'iname':this.iname,
      'price':this.price,
      'unit_type':this.unit_type,
      'age':this.age,
      'acreage':this.acreage,
      'floor_number':this.floor_number,
      'phone':this.phone,
      'description':this.description,
      'house_type':this.house_type,
      'agent':this.agent
}
console.log(data)
this.axios({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: '/house_insert',
    data: Qs.stringify(data)
}).then(res=>{
    console.log(res);
    if(res.data=='1'){
      console.log("发送请求，插入图片");
    this.axios.post("/house_pic",this.formData).then(res=>{
      console.log(res.data);
      if(res.data==1){
        console.log("ok");
        this.$router.push("/")
      }
    })
    }
});
   
    
},
    
     ee(){
    let formData = new FormData();
    let file = this.$refs.fileInput.files[0];
    let fr = new FileReader();//FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件
    fr.onload=(e)=>{
       this.bbb=e.target.result;
       console.log(e.target)
     }
     fr.readAsDataURL(file);
    formData.append("upload",file);
    this.formData=formData;
    }
  },
  mounted(){
    this.sname=this.$route.query
    this.sname.a=='我要卖房'?this.house_type=20:this.house_type=30;
    this.sname.a=='我要卖房'?this.agent='22':this.agent='33';
  },
  
}
</script>