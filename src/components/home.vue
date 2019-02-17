<template>
    <div class="home-container">
        <swipe :isfull="true"></swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><router-link to="/home/news/investmentlist">
                <!--<span class="mui-icon mui-icon-home"></span>-->
                <img src="../assets/icon1.png" alt="">
                <div class="mui-media-body">新闻</div></router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><router-link to="/home/photos">
                <!--<span class="mui-icon mui-icon-home"></span>-->
                <img src="../assets/icon2.png" alt="">
                <div class="mui-media-body">图片</div></router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><router-link to="/home/books">
                <!--<span class="mui-icon mui-icon-home"></span>-->
                <img src="../assets/icon3.png" alt="">
                <div class="mui-media-body">书籍</div></router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><a href="#">
                <!--<span class="mui-icon mui-icon-home"></span>-->
                <img src="../assets/icon4.png" alt="">
                <div class="mui-media-body">待完善</div></a>
            </li>
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><a href="#">-->
                <!--&lt;!&ndash;<span class="mui-icon mui-icon-home"></span>&ndash;&gt;-->
                <!--<img src="../images/icon8.png" alt="">-->
                <!--<div class="mui-media-body">手表</div></a>-->
            <!--</li>-->
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><a href="#">-->
                <!--&lt;!&ndash;<span class="mui-icon mui-icon-home"></span>&ndash;&gt;-->
                <!--<img src="../images/icon6.png" alt="">-->
                <!--<div class="mui-media-body">资产拍卖</div></a>-->
            <!--</li>-->
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><a href="#">-->
                <!--&lt;!&ndash;<span class="mui-icon mui-icon-home"></span>&ndash;&gt;-->
                <!--<img src="../images/icon7.png" alt="">-->
                <!--<div class="mui-media-body">珠宝玉翠</div></a>-->
            <!--</li>-->
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-2"><a href="#">-->
                <!--&lt;!&ndash;<span class="mui-icon mui-icon-home"></span>&ndash;&gt;-->
                <!--<img src="../images/icon5.png" alt="">-->
                <!--<div class="mui-media-body">更多分类</div></a>-->
            <!--</li>-->
        </ul>
    </div>


</template>

<script>
    import swipe from './subcomponents/swipe.vue';
    export default {
        components:{
            swipe
        }
    }
</script>

<style lang="scss" scoped>
    .home-container{
        .mui-grid-view.mui-grid-9{
            margin: 0;
            padding: 0;
            background-color: #fff;
            .mui-table-view-cell{
                margin: 0;
                padding: 0px 18px;
                vertical-align: top;
                border-right: none;
                border-bottom: none;
            }
            .mui-media-body{
                font-size:13px;
            }
            img{
                width:50%;
                height:50%;
            }
        }
    }
</style>
