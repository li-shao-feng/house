<template>
    <div class="xuanze">
        <div class="d1" @click="tiaozhuang(1)">
            <img src="../../public/img/tupian.png" alt="">
            <div class="d1_1">
                <div class="d1_2">图文</div>
                <div class="d1_3">拍照或者相册上传</div>
            </div>
        </div>
        <div class="d2" @click="tiaozhuang(0)">
            <img src="../../public/img/shiping.png" alt="">
            <div class="d2_1">
                <div class="d2_2">文章/视频</div>
                <div class="d2_3">公众号文章或者腾讯视频链接</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .xuanze{
        margin-top: 50%;
        padding-left: 15%;
    }
    .xuanze .d1{
        margin-bottom: 60px;
    }
    .xuanze .d1 img{
        vertical-align:middle;
        margin-right: 15px;
    }
    .xuanze .d1 .d1_1{
        display: inline-block;
        vertical-align:middle;
    }
    .xuanze .d1 .d1_1 .d1_2{
        margin-bottom: 10px;
        font-size: 20px;
    }
    .xuanze .d1 .d1_1 .d1_3{
        font-size: 14px;
        color: #878787;
    }
    .xuanze .d2 img{
        vertical-align:middle;
        margin-right: 15px;
    }
    .xuanze .d2 .d2_1{
        display: inline-block;
        vertical-align:middle;
    }
    .xuanze .d2 .d2_1 .d2_2{
        margin-bottom: 10px;
        font-size: 20px;
    }
    .xuanze .d2 .d2_1 .d2_3{
        font-size: 14px;
        color: #878787;
    }
</style>
<script>
export default {
    methods:{
        tiaozhuang(pid){
            this.$router.push(`/taolun?pid=${pid}`)
        },
    },
}
</script>