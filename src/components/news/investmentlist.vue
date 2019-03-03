<template>
    <div class="news">
      <!--mescroll滚动区域的基本结构-->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <!--内容...-->
        <ul class="mui-table-view">
              <li v-for="item in news" :key="item.docid" class="mui-table-view-cell mui-media">
                  <router-link :to="'/home/news/newsdetails/'+item.docid">
                      <img class="mui-media-object mui-pull-left" :src="item.imgsrc">
                      <div class="mui-media-body">
                          <p class='mui-ellipsis'>{{ item.title }}</p>
                          <p class="date_count"><span>发表时间：<i>{{ item.lmodify }}</i></span><span>浏览:<i>{{ item.votecount }}</i>次</span></p>
                      </div>
                  </router-link>
              </li>
        </ul>
      </mescroll-vue>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                news:[],
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
                    size: 10 //每页数据条数,默认10
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
            getNews:function(page){
              this.$http.post('/api/news',{page:page.num,pagesize:page.size}).then((res) => {
                if (page.num === 1) this.news = [];
                this.news = this.news.concat(res.body);
                    this.$nextTick(() => {
                      this.mescroll.endSuccess(res.body.length);
                    })
               });
            },
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit (mescroll) {
              this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            upCallback (page) {
              this.getNews(page);
            }
        }
    }
</script>

<style lang="scss">
    .news{
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
      .mescroll {
        position: fixed;
        top: 44px;
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
