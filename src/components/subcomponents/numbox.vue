<template>
    <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" @change="getCount"  v-model="count" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    export default {
        data:function(){
          return {
              count:1,//初始数量1
          }
        },
        mounted:function(){
            mui('.mui-numbox').numbox();//初始化
        },
        methods: {
            getCount: function () {
                mui('.mui-numbox').numbox().setOption('step',1);

                var selectNum=parseInt(mui('.mui-numbox').numbox().getValue());
                //数据过滤,如果小于=0或者大于库存就取1或者库存值
                this.count=selectNum>this.counts ? this.counts :selectNum<=0 ? 1 : selectNum;
                //传给父组件,
                this.$emit('func',this.count);
            }
        },
        watch:{
            //这里必须监听counts，因为父组件异步获取数据的原因，有可能这里接收到的值是undefined，所以当值改变才去设置
            counts:function(n,o){
                mui('.mui-numbox').numbox().setOption('max',n);
            }
        },
        props:['counts']//counts是一个商品的总库存
    }
</script>

<style lang="scss" scoped>
    .mui-numbox {
        height: 31px;
    }
</style>