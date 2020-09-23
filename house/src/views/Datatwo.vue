<template>
    <div class="datatwo">
        <mt-navbar v-model="active">
            <mt-tab-item id="1">系统通知</mt-tab-item>
            <mt-tab-item id="2">互动消息</mt-tab-item>
            <mt-tab-item id="3">推送消息</mt-tab-item>
        </mt-navbar>
        <div >
            <mt-tab-container v-model="active">
            <mt-tab-container-item id="1">
                <div v-for="(k,v) of 10" :key="v" class="Renting">
                    <!--  v-for="(k,v) of 10" :key="v" -->
                    <div>
                        <div class="Renting_one">
                            <span >表单提交成功</span>
                            <p v-html="month"></p>
                        </div>
                        <div class="Renting_two">
                            <div class="d1">
                                <img src="../assets/img/personal/datatwo1.png" alt="">
                            </div>
                            <div>租房</div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">BB</mt-tab-container-item>
            <mt-tab-container-item id="3">CC</mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
     export default {
        data(){
            return {
                //默认
                active:'1',
                month:`8月份`
            }
        }
     }
</script>
<style scoped>
.datatwo{
    background: #f5f5f9;
}
.Renting{
    margin-bottom: 10px;
    font-size: 14px;
    width: 90%;
    margin: 0 auto;
    background: #fff;
}
.Renting div{
    margin: 5px;
}
.Renting .Renting_one{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.Renting .Renting_one span{
    color: #1afa29;
}
.Renting .Renting_one p{
    color: #ccc;
    font-size: 12px;
}
.Renting .Renting_two{
    display: flex;
    margin-top: 20px;
}
.Renting .Renting_two .d1 {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    border-radius: 100%;
    background: rgba(30, 150, 0, 0.596);
    text-align: center;
    
}
.Renting .Renting_two img {
    display: inline-block;
    margin-top: 8px;
    margin-left: 3px;
}
 
</style>