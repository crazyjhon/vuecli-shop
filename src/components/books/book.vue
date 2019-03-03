<template>
    <div class="book-container">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="book-list">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="item in booklist" :key="item.url" @click="godetails(item.id)"  class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-6">
                    <a href="javascript:" class="abox">
                        <img :src="item.url" alt="">
                        <div>
                            <p class="descri">{{ item.description }}</p>
                            <p class="author">带渲染</p>
                            <p class="type">平装</p>
                            <p class="price">￥{{ item.price}}</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
      </mescroll-vue>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
              booklist:[],
              mescroll: null, // mescroll实例对象
              mescrollDown:{
                textOutOffset:'释放刷新',
                textLoading:'加载中...',
                htmlContent:'<p class="downwarp-progress" ></p><p class="downwarp-tip"></p>'
              }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
              mescrollUp: { // 上拉加载的配置.
                callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
                page: {
                  num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                  size: 4 //每页数据条数,默认10
                },
                htmlNodata: '<p class="upwarp-nodata">--&nbsp; 已经到底了 &nbsp; --</p>',
                toTop: {
                  // //回到顶部按钮
                  src: "./public/static/images/mescroll/totop.png", //图片路径,默认null,支持网络图
                  offset: 800 //列表滚动1000px才显示回到顶部按钮
                },
                htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中...</p>',
                lazyLoad: {
                  use: true, // 是否开启懒加载,默认false
                }
              }

            }
        },
        beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
          next(vm => {
            // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
            vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
          })
        },
        beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
          // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
          this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
          next()
        },
        methods:{
            godetails:function(id){
                //js形式编程式导航
                this.$router.push('/home/booksinfo/'+id);
            },
            getMessage:function(page) {
              this.$http.post('/api/book', {page: page.num, pagesize: page.size}).then((res) => {
                if (page.num === 1) this.booklist = [];
                this.booklist = this.booklist.concat(res.body);
                this.$nextTick(() => {
                  this.mescroll.endSuccess(res.body.length);
                })
              })
            },
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit (mescroll) {
              this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            upCallback (page) {
              this.getMessage(page);
            }
        }
    }

</script>

<style lang="scss">
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
      .mescroll {
        position: fixed;
        top: 35px;
        bottom: 50px;
        height: auto;
      }
      .mescroll-downwarp .downwarp-tip,
      .mescroll-upwarp .upwarp-tip,
      .mescroll-upwarp .upwarp-nodata{
        color:#6F56A1;
        letter-spacing: 2px;
        font-size: 13px;
      }
      .mescroll-downwarp .downwarp-progress,
      .mescroll-upwarp .upwarp-progress{
        border: 1px solid #6F56A1;
        border-bottom-color: transparent
      }
    }
    .mescroll-totop {
      bottom: 67px;
    }
</style>
