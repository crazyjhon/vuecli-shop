// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './mock'

//自定义函数
import util from './utils/checkSession'
Vue.prototype.util = util;

import resource from 'vue-resource';
Vue.use(resource);
//下拉加载插件
import Mescroll from 'mescroll.js/mescroll.vue'
Vue.component('mescroll-vue',Mescroll);

import store from './vuex/store';
//mintUI包
import mintUI from 'mint-ui';
import 'mint-ui/lib/style.min.css'

Vue.use(mintUI, {
    lazyload: {
        preLoad: 1.3,
        error: './images/icon2.png',
        // loading: './images/icon1.png',
        attempt: 1
    }
});

//导入MUI包

import Mui from 'vue-awesome-mui';
import 'vue-awesome-mui/mui/dist/css/mui.min.css'
import 'vue-awesome-mui/mui/dist/css/icons-extra.css'
Vue.use(Mui);

Vue.config.productionTip = false
// console.log(MescrollVue);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:function(cr){
        return cr(App);
    },
  router,
  store
});

