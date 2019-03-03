<template>
    <div class="cart-container">

        <p class="tip" v-show="isShow">----------- 空空如也，快去挑选商品 -----------</p>
        <div class="mui-card" v-for="(item,index) in carList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="cartlist">
                        <input type="checkbox" :value="item.id" @change.stop="selectedChange(item.id,item.selected)" v-model="item.selected">

                        <div class="goods">
                            <img :src="item.url" @click="godetails(item.id)">
                            <div class="title-price">
                                <h5 @click="godetails(item.id)">{{ item.title }}</h5>
                                <span>￥{{ item.price }} &nbsp;</span>
                                <numbox :num="$store.getters.getCarEachCount[item.id]" :goodsId="item.id"></numbox>&nbsp;
                                <a href="javascript:0" @click.prevent="remove(item.id,index)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已购选商品 <span class="number">￥{{$store.getters.getCountAndPrice.count}}</span> 件，总价：<span class="number money">￥{{$store.getters.getCountAndPrice.amount}}</span></p>
                    </div>
                    <mt-button type="danger" @click="checkLogin" size="small">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from './subcomponents/car_numbox.vue';
    export default {
        data: function () {
            return {
                carList:[],
                isShow:false
            }
        },
        created:function(){
            this.getCartList();
        },
        mounted:function(){
            //修改bug，为了让小球能飘到购物车不受padding的限制
            document.querySelector(".app-container").style.paddingBottom="0px";
        },
        methods:{
            godetails:function(id){
              //js形式编程式导航
              this.$router.push('/home/booksinfo/'+id);
            },
            getCartList:function(){
                var that=this;
                // this.$http.get('./dataJson/cartlist.json').then(function(res){
                //     that.carList=res.body;
                // });做了后台之后再去用，这里先调用本地localstornge
                if(localStorage.getItem('car')!='[]' && localStorage.getItem('car')!=null) {
                    JSON.parse(localStorage.getItem('car')).forEach(function (item) {
                        that.carList.push(item);
                    });
                }else{
                    this.isShow=true;
                }
            },
            remove:function(id,index){
                this.carList.splice(index,1);
                this.$store.commit('removeFromCart',id);
                //每次删除后都判断下，如果没有商品了就赋值显示快去购物
                this.isShow = this.$store.getters.getCountAndPrice.count === 0 ? true :false;
                // this.$store.getters.getCountAndPrice.count ? this.isShow=true :
            },
            selectedChange:function(id,value){
                //这里有一个bug没有解决，就是点击的时候会触发四次，当是radio和checkbox的时候
                var info={id:id,selected:value};
                // console.log(id+'---'+value);
                this.$store.commit('updateGoodsStatus',info);
            },
            checkLogin:function () {
              if (this.$store.getters.getCountAndPrice.count === 0) {
                alert('您的购物车什么都没有，请先挑选商品');
                //如果本地没有存储用户信息就代表没登陆，就直接跳转到登陆页面
              }else if (!this.$store.getters.getUserSession.user) {
                this.$router.push('/center/login');
              } else {
                //跳转支付页面
                this.$router.push('/center/pay');
              }
            }
        },
        components:{
            numbox
        },
    }


</script>

<style lang="scss" scoped>
    .cart-container{
        padding-bottom: 60px;
    }
    .tip{
        text-align: center;
        font-size:15px;
        margin:50px 0;
        color:#666;
        letter-spacing:1px;
    }
    .cartlist{
        justify-content: space-between;
        display: flex;
        .checkbox{
            background-color: red;
        }
        img{
           height:60px;
        }
        .goods{
            justify-content: flex-end;
            display: flex;
            .title-price{
                margin-left:10px;
                h5{
                    color:#333;
                    font-size:15px;
                    margin-bottom: 10px;
                }
                span{
                    color:red;
                }
                a{
                    color:#6F56A1;
                }
            }
        }
    }
    .jiesuan{
        display:flex;
        justify-content:space-between;
        align-items:center;
        .number{
            color:red;
            font-size:16px;
            font-weight: bold;
        }
        .money {
        }
    }

</style>
