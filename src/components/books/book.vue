<template>
    <div class="book-container">
        <div class="book-list">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="item in booklist" :key="item.url" @click="godetails(item.id)"  class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                    <a href="javascript:" class="abox">
                        <img :src="item.url" alt="">
                        <div>
                            <p class="descri">{{ item.description }}</p>
                            <p class="author">带渲染</p>
                            <p class="type">平装</p>
                            <p class="price">$19.9</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                booklist:null
            }
        },
        methods:{
            getMessage:function(){
                var that=this;
                this.$http.get('public/static/mock/booklist.json').then(function(res){
                    that.booklist=res.body;
                });
            },
            godetails:function(id){
                //js形式编程式导航
                this.$router.push('/home/booksinfo/'+id);
            }
        },
        created:function(){
            this.getMessage();
        }

    }

</script>

<style lang="scss" scoped>

    .book-container{
        .book-list {
            padding:5px;

            .mui-grid-view.mui-grid-9 {
                margin: 0;
                padding: 0;
                background-color: #fff;
                border-top: 0;
                border-left: 0;
                .mui-table-view-cell {
                    padding: 12px 18px 0;
                    vertical-align: top;
                    border-right: none;
                    border-bottom: none;
                    border-right: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                }
                .abox{
                    display:flex;
                    justify-content: space-between;
                    flex-direction: column;
                    min-height:288px;
                }

                .descri {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    white-space: initial;
                    color: #333;
                    text-align:left;
                }

                .author {
                    text-align: left;
                    font-size: 12px;
                }

                .type {
                    text-align: left;
                    color: #333;
                    font-size: 12px;
                }

                .price {
                    text-align: left;
                    color: #B12704;
                    margin-top: 4px;
                    padding-left: 5px;

                }

                img {
                    width: 90%;
                    margin: 0 auto;
                }
            }
        }

    }
</style>
