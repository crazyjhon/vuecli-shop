import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//本地数据持久化，刷新或者打开页面的时候先获取localStorage数据，如果没有，则空
var  car = JSON.parse(localStorage.getItem('car') || '[]');
var  userSession = JSON.parse(localStorage.getItem('userSession') || '{}');

//状态管理对象
export default new Vuex.Store({
    state:{//类似data的功能,this.$store.state.***
        car:car,//购物车的商品的数据[{id:商品id,count:商品数量，price:单价,selected:true}]
        userSession:userSession//从服务器获取的session信息
        //比如在打开购物车的时候，有些商品默认是被勾选的，有些不被勾选，这里默认是勾选的，用selected代表
    },
    mutations:{//类似方法的功能,this.$store.commit(方法名，参数),函数不能有返回值，有也接收不到
        addUserSession:function (state,session) {//登陆成功就添加用户信息
          state.userSession = session;
          // console.log(this.state.userSession);
          //将数据保存到本地localStorage
          localStorage.setItem('userSession',JSON.stringify(state.userSession));
        },
        deleteUserSession:function (state) {
          state.userSession = {};
          localStorage.setItem('userSession',JSON.stringify(state.userSession));
        },
        addTocar:function(state,goodsinfo){
            //假设 在购物车中，没有找到现在要加入到购物车的商品
            var flag=false;
            state.car.some(function(item,index,array){
                if(item.id===goodsinfo.id){
                    item.count=item.count+parseInt(goodsinfo.count);
                    flag=true;
                    return true
                }
            });
            //如果购物车中没有添加过该商品，那么就直接加进去
            if(!flag){
                state.car.push(goodsinfo);
            }
            //将数据保存到本地localStorage
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        removeFromCart:function(state,id){
            state.car.some(function(item,index){
                if(id===item.id){
                    state.car.splice(index,1);
                    return true
                }
            });
            //将删除后的最新的数据保存到本地localStorage
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsStatus:function(state,info){
            state.car.some(function(item,index){
                if(info.id===item.id){
                    item.selected=info.selected;
                    return true
                }
            });
            //将更新后的最新的数据保存到本地localStorage
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        //更新购物车里面每个商品个数的改变
        updateCarListCount:function(state,obj){
            state.car.some(function(item,){
                if(obj.id===item.id){
                    item.count=obj.count;
                    return true
                }
            });
            //将更新后的最新的数据保存到本地localStorage
            localStorage.setItem('car',JSON.stringify(state.car));
        }

    },
    getters:{//包装state后的值，this.$store.getters.***
        //获取用户信息
        getUserSession:function (state) {
          return state.userSession
        },
        //购物车总数
        getAllCount:function(state) {
            var c = 0;
            state.car.forEach(function (item, index, array) {
                c += item.count;
            });
            return c
        },
        //获取购物车里面每个商品的个数
        getCarEachCount:function(state){
            var o={};
            state.car.some(function(item){
                o[item.id]=item.count;
            });
            return o;
        },
        //获取商品总数量和总价格
        getCountAndPrice:function(state){
            var o={
                count:0,
                amount:0
            };
            state.car.forEach(function(item){
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price * item.count;
                }
            })
            return o
        }

    }


});
