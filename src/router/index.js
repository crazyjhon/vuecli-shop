import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue';
import message from '@/components/message.vue';
import cart from '@/components/cart.vue';
import center from '@/components/center.vue';
import password from '@/components/center/password.vue';
import me from '@/components/center/me.vue';
import address from '@/components/center/address.vue';
import register from '@/components/center/register.vue';
import login from '@/components/center/login.vue';
import logout from '@/components/center/logout.vue';
import investmentList from '@/components/news/investmentList.vue';
import newsdetails from '@/components/news/newsDetails.vue';
import books from '@/components/books/book.vue';
import booksinfo from '@/components/books/booksinfo.vue';
import photos from '@/components/photos/photos.vue';

Vue.use(Router)

export default new Router({
  routes:[
        {path:'/',component:home,name:'唯心维新自营店'},
        {path:'/home',component:home,name:'唯心维新-首页'},
        {path:'/message',component:message,name:'唯心维新-消息'},
        {path:'/cart',component:cart,name:'唯心维新-购物车'},
        {path:'/center',component:center,name:'我的'},
        {path:'/center/me',component:me,name:'用户中心'},
        {path:'/center/password',component:password,name:'账户安全'},
        {path:'/center/address',component:address,name:'收货地址管理'},
        {path:'/center/register',component:register,name:'用户注册'},
        {path:'/center/login',component:login,name:'用户登陆'},
        {path:'/center/logout',component:logout,name:'退出登陆'},
        {path:'/home/news',component:investmentList,name:'时事新闻'},
        {path:'/home/news/newsdetails/:id',component:newsdetails,name:'新闻详情'},
        {path:'/home/books',component:books,name:'书籍'},
        {path:'/home/booksinfo/:id',component:booksinfo,name:'商品详情'},
        {path:'/home/photos',component:photos,name:'图片浏览'}
    ]
})
