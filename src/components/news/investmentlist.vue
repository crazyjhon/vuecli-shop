<template>
    <div>
        <ul class="mui-table-view">
            <li v-for="item in news" :key="item.docid" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/news/investmentlist/newsdetails/'+item.docid">
                    <img class="mui-media-object mui-pull-left" :src="item.imgsrc">
                    <div class="mui-media-body">
                        <p class='mui-ellipsis'>{{ item.title }}</p>
                        <p class="date_count"><span>发表时间：<i>{{ item.lmodify }}</i></span><span>浏览:<i>{{ item.votecount }}</i>次</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                news:null
            }
        },
        created:function(){
            this.getNews();
        },
        methods:{
            getNews:function(){
                var that=this;
               this.$http.get('public/static/mock/newsList.json').then(function(res){
                    that.news=res.body.T1348647853363;
               });
            }
        }
    }
</script>

<style lang="scss" scoped>
    div{
        p {
            font-size: 13px;
            margin-top: 0;
            margin-bottom: 0;
            color: #333;
        }
        .date_count{
            display: flex;
            justify-content: space-between;
            color:#6F56A1;
            i{
                font-style: normal;
            }
            span:first-child{

            }
            span:last-child{

            }
        }


    }

</style>
