<template>

    <div id="slider"  class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a class="mui-control-item mui-active">
                    全部
                </a>
                <a class="mui-control-item">
                    武侠
                </a>
                <a class="mui-control-item">
                    美女
                </a>
                <a class="mui-control-item">
                    科技
                </a>
                <a class="mui-control-item">
                    娱乐
                </a>
                <a class="mui-control-item">
                    动漫
                </a>
            </div>
        </div>
        <div class="image-list">
            <ul>
                <li v-for="item in images">
                        <img v-lazy="item.url">
                    <div class="shade">
                        <p class="text">{{item.description}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>

    export default {
        data: function(){
            return {
                images:''
            }
        },
        created:function(){
            this.getPhotoList();
        },
        mounted:function(){//vue将元素渲染完毕的时候再操作元素
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
            });
        },
        methods:{
            getPhotoList:function(){
                var that=this;
                this.$http.get('/api/photos').then(function(res){
                    that.images=res.body;
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
    /*谷歌浏览器为了滑动流畅的设置*/
    *{
        touch-action:pan-y;
    }
    .image-list{
        padding:15px;
        ul{
            padding:0;
            margin:0;
        }

        li{
            list-style:none;
            position: relative;
            margin-bottom: 5px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #eee;
            img{
                width:100%;
            }
            .shade{
                background:rgba(#6F56A1,0.3);
                position: absolute;
                bottom:0;
                width:100%;
            }
            .text{
                font-size:16px;
                text-indent: 2em;
                color:#fff;
                line-height:20px;
                padding:5px;
                margin:0;
            }
        }
        img[lazy=loading] {
            height: 40px;
            width:40px;

        }
    }


</style>
