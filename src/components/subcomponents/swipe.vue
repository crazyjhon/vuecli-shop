<template>
    <div class="imageBox" :class="{full:isfull}">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgSrc" :key="item"><img :src="item"  alt=""></mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                imgSrc:null,
                addClass:'addClass'
            }
        },
        created:function(){
            this.showSwipe();
        },
        methods:{
            showSwipe:function(){
                var url;
                //模拟数据传参逻辑
                if(this.goodsId){
                     url='/api/bookswipe';
                }else{
                    //首页的轮播图地址
                     url='/api/homeswipe';
                }
                var that=this;
                this.$http.get(url).then(function(res){
                    that.imgSrc=res.body;
                    // if(res.status===200){
                    //     // that.imgSrc=res.body;
                    // }else{
                    //     console.log(失败);
                    // }
                });
            }
        },
        props:['goodsId','isfull']
    }
</script>

<style lang="scss" scoped>
    .imageBox{
        height:270px;
        padding:5px 0;
        img{
            height:100%;
        }
    }
    .full{
        height:150px;
        padding:0;
        img{
            width:100%;
        }
    }
</style>
