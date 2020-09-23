<template>
    <div>
        <div class="title">
            <span>房产全百科</span>
            <span>专业的买房攻略</span>
        </div>
        <mt-navbar v-model="active">
            <mt-tab-item id="1">
                <img src="../../public/img/5.png" alt="" slot="icon">
                资讯
            </mt-tab-item>
            <mt-tab-item id="2">
                <img src="../../public/img/3.png" alt="" slot="icon">
                问答
            </mt-tab-item>
            <mt-tab-item id="3">
                <img src="../../public/img/4.png" alt="" slot="icon">
                知识
            </mt-tab-item>
            <mt-tab-item id="4">
                <img src="../../public/img/1.png" alt="" slot="icon">
                贷款
            </mt-tab-item>
            <mt-tab-item id="5">
                <img src="../../public/img/2.png" alt="" slot="icon">
                经纪人
            </mt-tab-item>
        </mt-navbar>
    </div>
</template>
<style scoped>
 .title{
     width: 100%;height: 50px;
     margin-bottom: 2px;
     margin-top: 10px;
     background-color: #fff;
     line-height: 50px;
 }
 .title span:first-child{
     font-size: 19px;
     font-weight: bold;
     margin-left: 12px;
 }
 .title span:last-child{
     color: #666666;
     margin-left: 16px;
 }
</style>
<script>
export default {
    data() {
        return {
            active:''
        }
    },
    watch:{
        active(e){
            this.$router.push('/fatie?yid='+e);
        }
    }
}
</script>