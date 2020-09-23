<template>
    <div class="taolun">
        <div class="d1">
            <div class="d1_1">
                <input type="text" placeholder="请输入标题" cols="26" v-model="param.p_title">
            </div>
            <div class="d1_2">
                <textarea type="text" placeholder="请输入内容...." cols="26" v-model="param.p_text"></textarea>
                <div class="d1_3" v-show="aa">
                    <label for="inputFile">
                        <img src="../../public/img/jia_1.png" alt="">
                    </label>
                </div>
                <input @change="getFile($event,'tupian')" style="display:none" id="inputFile" type="file" accept="image/*,.pdf">
            </div>
            <div class="d1_4">
                <img src="../../public/img/zuobiao_1.png" alt="">&nbsp;所在位置
            </div>
        </div>
        <div class="d2">
            <div class="d2_1">
                <img src="../../public/img/dianhua.png" alt="">&nbsp;<input type="text" placeholder="电话号码" cols="26" v-model="param.p_phone">
            </div>
            <div class="d2_2">
                <img src="../../public/img/fenlei.png" alt="">&nbsp;默认分类
                <div class="d2_2_1">
                    <input type="radio" name="ra" value="1" checked v-model="param.yid"/>资讯
                    <input type="radio" name="ra" value="2" checked v-model="param.yid"/>问答
                    <input type="radio" name="ra" value="3" checked v-model="param.yid"/>知识
                    <input type="radio" name="ra" value="4" checked v-model="param.yid"/>贷款
                    <input type="radio" name="ra" value="5" checked v-model="param.yid"/>JJ人
                    <input type="radio" name="ra" value="6" checked v-model="param.yid"/>装修
                    <input type="radio" name="ra" value="7" checked v-model="param.yid"/>租房
                    <input type="radio" name="ra" value="8" checked v-model="param.yid"/>买房
                </div>
            </div>
        </div>
        <mt-button type="primary" size="large" @click="submitForm($event)">立即发布</mt-button>
        <img @click="cha()" src="../../public/img/cha.png" alt="">
    </div>
</template>
<style scoped>
    .taolun{
        background: #EEEEEE;
        height: 100%;
    }
    .taolun .d1{
        background: white;
        padding: 15px;
    }
    .taolun .d1 .d1_1 input{
        padding: 15px 0;
        border: none;
        border-bottom: 1px solid #E6E6E6;
        width: 100%;
        outline: none;
    }
    .taolun .d1 .d1_2{
        margin-bottom: 15px;
    }
    .taolun .d1 .d1_2 textarea{
        padding: 15px 0;
        border: none;
        width: 100%;
        outline: none;
    }
    .taolun .d1 .d1_2 .d1_3{
        padding: 15px;
        border: 1px dashed #CCCCCC;
        display: inline-block;
    }
    .taolun .d1 .d1_4{
        border-top: 1px solid #E6E6E6;
        padding-top: 15px;
        color: #757575;
    }
    .taolun .d1 .d1_4 img{
        vertical-align:middle;
    }
    .taolun .d2{
        margin-top: 15px;
        padding: 15px;
        background: white;
    }
    .taolun .d2 .d2_1{
        border-bottom: 1px solid #E6E6E6;
        padding-bottom: 15px;
        color: #757575;
    }
    .taolun .d2 .d2_1 input{
        border: none;
        font-size: 16px;
        outline: none;
    }
    .taolun .d2 .d2_1 img{
        vertical-align:middle;
    }
    .taolun .d2 .d2_2{
        padding: 15px 0;
        color: #757575;
    }
    .taolun .d2 .d2_2 img{
        vertical-align:middle;
    }
    .taolun .d2 .d2_2 .d2_2_1{
        text-align: center;
    }
    .taolun>img{
        position: fixed;
        border-radius: 50%;
        right: 15px;
        bottom: 50px;
    }
</style>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            aa:false,
            param:{
                p_title:'',
                p_phone:'',
                p_text:'',
                yid:'1'
            },
            formData:new FormData(),  
        }
    },
    methods:{
        cha(){
            this.$router.push(`/about`);
        },
        getFile(event,tupian){
            console.log(event.target.files);
            this.formData.append(tupian,event.target.files[0]);//通过type为file的input标签这个dom元素对象中的属性files获取当前选中的文件，然后用append这个方法将文件添加到formdata中
        },
        submitForm(event){
            event.preventDefault();
            var upicture=sessionStorage.getItem("upicture");
            var uid=sessionStorage.getItem("uid");
            var uname=sessionStorage.getItem("uname");
            for(let i in this.param){
                this.formData.append(i,this.param[i]);
            }
            this.formData.append("upicture",upicture);
            this.formData.append("uid",uid);
            this.formData.append("uname",uname);
            let config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            };
            this.axios.post('/url',this.formData,config).then(res=>{
                if(res.data==1){
                    Toast({
                        message: '发帖成功',
                    });
                     setTimeout(()=>{this.$router.push(`/about`);},1000)
                }
               
            });
        }
    },
    created(){
        if(this.$route.query.pid==1){
            this.aa=true
        }else{
            this.aa=false
        }
    },
}
</script>