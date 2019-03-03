<template>
    <div class="newsDetails">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div id="article">
              <div class="head">
                <h1 class="title">{{ newsdetails.title }}</h1>
                <div class="info">
                  <span class="time js-time">{{ newsdetails.lmodify }}</span>
                  <span class="source js-source">{{ newsdetails.source }}</span>
                </div>
              </div>
              <div class="content">
                <p>{{ newsdetails.digest }}</p>
                <div class="editor_title">
                  <p>(原标题：XXXXXX)</p>
                  <p>(责任编辑：行尽江南)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <comments :comments="newsComments" @getMore="getComments"></comments>
    </div>
</template>
<script>
    //导入comments组件
    import comments from '../subcomponents/comments.vue';
    export default {
        data:function(){
            return {
                id:this.$route.params.id,
                newsdetails:{},
                newsComments:[]
            }
        },
        created:function(){
          this.showNews();
          this.getComments();
        },
        methods:{
            showNews:function(){
                this.$http.post('/api/newsdetails',{newsID:this.id}).then((res) => {
                  this.newsdetails = res.body;
                });
            },
            getComments:function (all) {
              this.$http.post('/api/newscomments',{newsID:this.id,all:all}).then((res) => {
                //没有评论，传给评论组件一个false
                if (res.body === 'null'){
                  this.newsComments = false;
                  return
                }
                this.newsComments = res.body;
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
      padding-bottom:35px;
        #article {
            .head {
                font-weight: 400;
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
    }
</style>
