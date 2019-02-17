<template>
    <div class="newsDetails">
        <div id="article">
            <div class="head">
                <h1 class="title">习近平到天津考察 参观南开百年校史展览</h1>
                <div class="info">
                    <span class="time js-time">2019-01-17 11:02:15</span>
                    <span class="source js-source">新华网</span>
                </div>
            </div>
            <div class="content">
               <p>17日上午，习近平来到天津考察调研。在南开大学，他参观了百年校史主题展览，与部分院士、专家和中青年师生代表互动交流，察看了化学学院和元素有机化学国家重点实验室，详细了解南开大学历史沿革、学科建设、人才队伍、科研创新等情况。</p>
                <div class="editor_title">
                    <p>(原标题：习近平在天津考察)</p>
                    <p>(责任编辑：钱珏晓_NBJ10675)</p>
                </div>
            </div>
        </div>
        <comments :newsList="newsList"></comments>
    </div>
</template>
<script>
    //导入comments组件
    import comments from '../subcomponents/comments.vue';
    export default {
        data:function(){
            return {
                id:this.$route.params.id,
                newsList:[
                    {user:'四代歼机',content:'习总威武！',date:'2019-01-31 06:31:00'},
                    {user:'行尽江南',content:'南开大学不愧是百年名校！',date:'2019-01-31 9:00:00'},
                    {user:'于斯为盛',content:'啥时候来武大，看樱花啊，虽然这里很热，但是冬天很暖！',date:'2019-01-31 22:31:00'},
                    {user:'杜预',content:'习总身边肯定有很多智囊！',date:'2019-01-31 13:31:00'},
                    {user:'湾仔',content:'台湾领导过年就会送米面油！',date:'2019-01-31 15:31:00'}
                ]
            }
        },
        created:function(){
          this.show();
        },
        methods:{
            show:function(){
                var that=this;
                this.$http.get('public/static/mock/newsList.json',{params:{id:that.id}}).then(function(res){
                //    这里需要自己做后台页面，来根据参数返回一个数据，因为这里传了参数，有逻辑处理
                });
            }
        },
        components:{
            comments
        }
    }

</script>
<style lang="scss" scoped>
    .newsDetails{
        #article {
            margin-bottom:30px;
            padding: 0 20px;
            background-color: #f6f6f6;
            .head {
                font-weight: 400;
                padding: 13px 0 0;

                .title {
                    font-size: 20px;
                    color: #404040;
                    line-height: 30px;
                }

                .info {
                    font-size: 14px;
                    margin: 5px 0 20px;
                    color: #888;
                }
            }

            .content {
                color: #404040;
                padding: 0 0 20px;

                p:first-child {
                    font-size: 15px;
                    line-height: 25px;
                    color: #404040;
                    word-break: break-all;
                    text-indent: 2em;
                }

                .editor_title {
                    p:first-child {
                        font-size: 13px;
                        text-indent: 0;
                    }
                    p:last-child {
                        font-size: 13px;
                        text-align: right;
                        color: #404040;
                    }
                }
            }
        }
        #comments{
            padding: 5px 20px;
            background-color: #f6f6f6;
            border:#f6f6f6;
            .comments-area {
                h4{
                    color:#666;
                    letter-spacing:1px;
                    line-height:20px;
                }
                textarea {
                    margin-bottom: 5px;
                    border:1px solid #8a6de9;
                    font-size: 13px;
                    letter-spacing: 1px;
                }
                .mui-btn-block {
                    font-size: 18px;
                    display: block;
                    width: 100%;
                    margin-bottom: 10px;
                    padding: 5px 0;
                }
            }
            .comments-group {
                padding: 0;
                margin: 0;
                color: #333;
                li {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    div {
                        .user {

                        }
                        .comments-content {
                            color:#000;
                            letter-spacing:1px;
                        }
                        .date {
                            display: flex;
                            justify-content: space-between;
                            a{
                                color:#8a6de9;
                            }
                        }
                        hr{
                            border:1px dashed #8A9295;
                        }
                    }

                }
            }
        }
    }
</style>
