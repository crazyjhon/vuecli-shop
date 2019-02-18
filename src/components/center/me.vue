<template>
    <div class="form_box">
      <div v-show="loginStatus">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell mui-media">
            <a class="mui-navigate-right" href="#account">
              <img class="mui-media-object mui-pull-left head-img" id="head-img" src="public/static/images/user.jpg">
              <div class="mui-media-body">用户 : {{ $store.getters.getUserSession.user }}<p class="mui-ellipsis">绑定手机 : 15339069115</p></div>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a href="#" class="mui-navigate-right">账号与安全</a>
          </li>
          <li class="mui-table-view-cell">
            <router-link to="/cart" class="mui-navigate-right">我的购物车</router-link>
          </li>
          <li class="mui-table-view-cell">
            <a href="#" class="mui-navigate-right">收货地址管理</a>
          </li>
        </ul>
        <div class="p10">
          <router-link to="/center/logout" class="mui-btn mui-block">退出</router-link>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data:function (){
            return {
              loginStatus:false
            }
        },
        created:function () {
          //如果本地没有存储用户信息就代表没登陆，就直接跳转到登陆页面
          if (!this.$store.getters.getUserSession.user) {
            this.$router.push('/center/login');
          } else {
            //显示用户界面
            this.loginStatus = true;
          }
        }
    }

</script>

<style lang="scss" scoped>
    .form_box{
        padding: 10px;
    }
    .btn_login{
        width: 100%;
        margin: 10px 0;
    }
    .mui-input-row{
        a{
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            float: right;
            letter-spacing: 2px;
        }
    }
</style>
