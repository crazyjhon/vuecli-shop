<template>
    <div id="photos">
        <div class="mui-scroll-wrapper  mui-segmented-control mui-segmented-control-inverted">
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
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
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
        </mescroll-vue>
    </div>
</template>

<script>

    export default {
        data: function(){
            return {
              images:[],
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
                  size: 2 //每页数据条数,默认10
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
        mounted:function(){//vue将元素渲染完毕的时候再操作元素
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
                scrollY: false,//是否竖向滚动
                scrollX: false, //是否横向滚动
            });
        },
        methods:{
            getPhotoList:function(page){
              this.$http.post('/api/photos',{page:page.num,pagesize:page.size}).then((res) => {
                if (page.num === 1) this.images = [];
                this.images = this.images.concat(res.body);
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
            this.getPhotoList(page);
          }
        },

    }
</script>

<style lang="scss">
    /*谷歌浏览器为了滑动流畅的设置*/
    *{
        touch-action:pan-y;
    }

    #photos{
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
      .mescroll {
        position: fixed;
        top: 75px;
        bottom: 50px;
        height: auto;
      }
      .mescroll-totop {
        bottom: 67px;
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




</style>
