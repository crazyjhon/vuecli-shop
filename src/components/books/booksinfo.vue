<template>
    <div class="bookinfo-container">
        <!--轮播图区域-->
        <div class="mui-card">
            <swipe :goodsId="$route.params.id" :isfull="false"></swipe>
        </div>
        <!--购物车区域-->
        <div id="ball_parents" class="mui-card">
            <!--小球-->
            <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
                <div class="ball" ref="ball" v-show="ball_status"></div>
            </transition>
            <div class="mui-card-header">{{ goodsData.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                    市场价：<del>￥{{ goodsData.oprice}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsData.price}}</span>
                    </p>

                    <p >购买数量：&nbsp; <numbox @func="getCount" :counts="goodsData.store"></numbox>
                        <span>(库存：{{ goodsData.store}}件)</span>

                    </p>

                    <p>
                        <mt-button type="primary"  size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" :disabled="isDisable" @click="addToShopCar()">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--简介区域-->
        <div class="mui-card">
            <div  @click="tabshow" class="mui-card-header">
                <nav class="tab-details">
                    <div  class="sub-tab">
                        <span :class="{color:jj_status}">商品简介</span>
                    </div>
                    <div  class="sub-tab" >
                        <span :class="{color:pl_status}">评论</span>
                    </div>
                    <div class="sub-tab">
                        <span :class="{color:xq_status}">详情</span>
                    </div>
                </nav>
            </div>
            <div class="mui-card-content" v-show="jj_status">
                <div class="mui-card-content-inner">
                    《明朝那些事儿》源自历史记载书籍《明史》。当年明月在反复研究《明史》等正史史料的基础上，探寻晚明三大著名疑案等历史真相并使用现代的方式阐述了明朝发生的事，它结合着一些档案、笔记、野史、碑刻等，以各地发现的墓志而论对历史的空白进行填充。 [19-20]
                    在网络和出版界，有关明朝历史的图书和话题接连不断：张宏杰的《大明王朝的七张面孔》，十年砍柴的《皇帝、太监和文臣：明朝政局的三角恋》；在央视“百家讲坛”讲述《明十七帝疑案》的毛佩琦也出版了《明朝顶级文臣》、《毛佩琦正说永乐大帝朱棣》等书籍，甚至在2006年8月份举办的北京书展上，毛佩琦、当年明月、十年砍柴三位作家联手举办中国人需要重新认识明朝主题活动，详细解读明朝。大量明史图书的出版，使2006年被人们称为“明”年，而进入2007年后，明史热继续持续，在这样的文化的背景下以明朝历史为题材的小说和影视剧颇受人们的青睐，因此《明朝那些事儿》走红于天涯网的一个小众论坛“煮酒论史”也并不奇怪。 [21-24]
                    《明朝那些事儿》问世多年来一直是最畅销的史学读本,如今它的漫画版也推出了。漫画版在《明朝那些事儿》史实性、趣味性基础上,用超萌的绘画风格讲述了明朝开国皇帝朱元璋跌宕起伏的人生。 [25]
                </div>
            </div>
        </div>
        <comments :newsList="newsList" v-show="pl_status"></comments>
        <bookdetails v-show="xq_status">11</bookdetails>
    </div>
</template>

<script>
    import swipe from '../subcomponents/swipe.vue';
    import numbox from '../subcomponents/numbox.vue';
    import comments from '../subcomponents/comments.vue';
    import bookdetails from '../subcomponents/details_book.vue';
    export default {
        data:function(){
          return {
              goodsData:{},//商品信息对象
              count:1,//选中的商品个数
              isDisable:false,
              pl_status:false,
              xq_status:false,
              jj_status:true,
              ball_status:false,
              newsList:[
                  {user:'四代歼机',content:'读史可以省身，读史可以明志。《明朝那些事儿》这本书，它一部纯粹草根的作品 [26]  ，能激发广大读者对中华民族五千年历史文化的兴趣，在读史的过程中瞻仰先贤们的风采，领悟先贤们的道理。！',date:'2019-01-31 06:31:00'},
                  {user:'行尽江南',content:'《明朝那些事儿》主要讲述的是从1344年到1644年这三百年间关于明朝的一些事情，以史料为基础，以年代和具体人物为主线，并加入了小说的笔法，对明朝十七帝和其他王公权贵和小人物的命运进行全景展示，尤其对官场政治、战争、帝王心术着墨最多，并加入对当时政治经济制度、人伦道德的演义。',date:'2019-01-31 9:00:00'},
                  {user:'于斯为盛',content:'这部书与一般的历史书不同，重点刻画了历史人物的心理描写，令人看后回味无穷。该书涉及人物众多，线索繁杂，没有一个中心人物可以贯穿起来，加上明朝是一个十分强盛的朝代，期间出现了各种各样的名人，除了皇帝、大臣外，还有王守仁、唐伯虎等各界的名人。',date:'2019-01-31 22:31:00'},
                  {user:'杜预',content:'路过，看看评论先',date:'2019-01-31 13:31:00'},
                  {user:'湾仔',content:'很厉害的样子',date:'2019-01-31 15:31:00'}
              ]
          }
        },
        created:function(){
            this.show();
        },
        mounted:function(){
            //修改bug，为了让小球能飘到购物车不受padding的限制
            document.querySelector(".app-container").style.paddingBottom="0px";
        },
        methods:{
            //给numbox传递的函数，通过给过去的函数把numbox的数量拿过来
            getCount:function(num){
                this.count=num;
            },
            //添加商品到购物车
            addToShopCar:function(){
                this.isDisable=true;
                this.ball_status=!this.ball_status;
                //将要保存到store状态管理器里面的数据
                var goodsinfo={
                    id:parseInt(this.goodsData.id),
                    url:this.goodsData.url,
                    title:this.goodsData.title,
                    count:this.count,
                    price:this.goodsData.price,
                    selected:true
                };
                //调用store状态管理器中定义的方法,这里加一个延迟，等动画结束后（动画结束是1.2s)，再赋值
                var that=this;
                setTimeout(function(){
                    that.$store.commit('addTocar',goodsinfo);
                },1200)

            },
            //简介、详情等切换
            tabshow:function(e){
                switch(e.target.innerHTML){
                    case '评论':
                        this.pl_status=true;
                        this.xq_status=false;
                        this.jj_status=false;
                        break;
                    case '详情':
                        this.pl_status=false;
                        this.xq_status=true;
                        this.jj_status=false;
                        break;
                    case '商品简介':
                        this.pl_status=false;
                        this.xq_status=false;
                        this.jj_status=true;
                        break;
                    default:
                        this.pl_status=false;
                        this.xq_status=false;
                        this.jj_status=true;
                }
            },
            //获取
            beforeEnter:function(el){
                //每次开始的时候回到初始位置
                el.style.transform="translate(0,0)";
            },
            enter:function(el,done){
                var navPostion=document.querySelector('#nav').getBoundingClientRect();
                var ballPostion=this.$refs.ball.getBoundingClientRect();
                var distX=navPostion.left-ballPostion.left+'px';
                var distY=navPostion.top-ballPostion.top+'px';
                el.offsetWidth;
                el.style.transform="translate("+distX+","+distY+")";
                el.style.transition="all 1.2s cubic-bezier(.03,0,.27,.58)";
                done();
            },
            afterEnter:function(el){
                var that=this;
                setTimeout(function(){
                    that.isDisable=false;
                },1200);
                this.ball_status=!this.ball_status;
            },
            //获取数据
            show:function(){
                this.$http.get('/api/booklist').then((res) => {
                    //    这里需要自己做后台页面，来根据参数返回一个数据，因为这里传了参数，有逻辑处理
                    res.body.some((item,index) => {
                        if(parseInt(this.$route.params.id)===item.id){
                            this.goodsData=res.body[index];
                            return true
                        }
                    })

                });
            }
        },
        components:{
            swipe,
            numbox,
            comments,
            bookdetails
        }
    }
</script>

<style lang="scss" scoped>
    .bookinfo-container{
        padding-bottom: 60px;
    }

        .mui-card {
            overflow: visible;
            .imageBox{
                text-align: center;
            }
            border-top: 1px solid #ddd;
            .tab-details{
                min-width:180px;
                width:220px;
                .sub-tab {
                    display: table-cell;
                    overflow: hidden;
                    width: 1%;
                    text-align: center;
                    vertical-align: middle;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
        .color{
            color: #6F56A1;
        }
        .ball{
            width:17px;
            height:17px;
            border-radius: 50%;
            background-color:red;
            position: absolute;
            z-index: 10000000;
            top: 90px;
            left: 144px;
        }




</style>
