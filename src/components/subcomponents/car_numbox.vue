<template>
    <div class="mui-numbox" :id="goodsId" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" @change.stop="getCount" readonly  v-model="num" />
        <button class="mui-btn mui-btn-numbox-plus"  type="button">+</button>
    </div>
</template>

<script>
    export default {
        data:function(){
          return {
              count:0,
              max:0,
              id:'#'+this.goodsId
          }
        },
        mounted:function(){
            //分别初始化
            mui(this.id).numbox();//初始化
        },
        created:function(){
            this.getStore();
        },
        methods: {
            getCount: function () {
                var selectNum=parseInt(mui(this.id).numbox().getValue());
                // //数据过滤,如果小于=0或者大于库存就取1或者库存值
                this.count=selectNum>this.max ? this.max :selectNum<=0 ? 1 : selectNum;
                //更新localstornge里面的数据

                this.$store.commit('updateCarListCount',{id:this.goodsId,count:this.count});
            },
            //根据id查商品的库存
            getStore:function(){
                var that=this;
                this.$http.get('/api/bookstore').then(function(res){
                    res.body.some(function(item){
                        if(that.goodsId===item.id){
                            that.max=item.store;
                            mui(that.id).numbox().setOption('max',item.store);
                            // console.log(item.store);
                            return true
                        }
                    })

                })
            }
        },

        props:['num','goodsId']//num是一个商品的选择的个数，id是商品id
    }
</script>

<style lang="scss" scoped>
    .mui-numbox {
        height: 31px;
    }
</style>
