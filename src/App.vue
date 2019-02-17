<template>
    <div class="app-container  w-scroll">

        <!--header 顶部区域-->
        <mt-header fixed :title="$route.name"><span>111</span>
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        <scroll>

            <!--router-view 区域-->
        <transition >
            <router-view></router-view>
        </transition>
        </scroll>


        <!--tabBar 底部区域-->
        <nav class="mui-bar mui-bar-tab" >
            <router-link class="mui-tab-item-md " to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-md" to="/message">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">消息</span>
            </router-link>
            <router-link class="mui-tab-item-md" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span :class="{hidden:isHidden}" class="mui-badge" id='nav'>{{$store.getters.getAllCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-md" to="/center">
                <span class="mui-icon mui-icon mui-icon-person-filled"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
    </div>

</template>
<script>
    import Scroll from './components/subcomponents/scroll.vue';
    export default {
        data:function(){
            return {
                isHidden:true,
                flag:false
            }
        },
        methods:{
            goBack:function(){
                this.$router.go(-1);

            }
        },
        created:function(){
            //开始渲染的时候如果购物车有商品，就返回false,(显示)
           this.isHidden=this.$store.getters.getAllCount ? false : true;
           //返回按钮
            this.flag=this.$route.path==="/home" ? false :true;
        },
        //监听vuex的getAllcount的返回值，如果改变了，就让购物车徽章显示出来，computed和watch的组合
        computed:{
           get:function(){
               return this.$store.getters.getAllCount
           }
        },
        watch:{
            get:function(n,o){
                this.isHidden=n ? false : true;
            },
            '$route.path':function(n){
                if(n==='/home'){
                    this.flag=false;
                }else{
                    this.flag=true;
                }
            }
        },
        components:{
            Scroll
        }
    }

</script>

<style lang="scss" scoped>
    .w-scroll {
        height: 100%;
        overflow: auto;
         -webkit-overflow-scrolling: touch;
    }
    .app-container{
        width:100%;
        padding-top:40px;
        padding-bottom:60px;
        overflow-x:hidden;
        /* 设置滚动条宽度 */
        ::-webkit-scrollbar {
            width: 0px;
        }
        /*::-webkit-scrollbar {*/

             /*display: none;!*隐藏滚轮*!*/

        /*}*/
        .mint-header{
            background-color: #6F56A1;
            /*color:#929292;*/
            letter-spacing: 3px;
            font-size:16px;
            z-index:1000;
        }

        //底部导航
        .mui-bar-tab{
            background-color: #6F56A1;
            .router-link-active{
                color: #cdbfe3;
            }
        }
        .v-enter{
            opacity: 0;
            transform:translateX(100%);
        }
        .v-enter-to,
        .v-leave-active{
            transition: all 0.2s ease;
            position: absolute;
        }
        .v-leave-to{
            opacity: 0;
            transform:translateX(-100%);
        }
    }
    .mui-bar-tab .mui-tab-item-md {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
    }
    .mui-bar-tab .mui-tab-item-md .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-md .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .hidden{
        visibility: hidden;
    }



</style>
