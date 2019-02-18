<template>
    <div class="form_box">
        <form action="">
            <div class="mui-input-row">
                <input name="name" type="text" v-model="user" placeholder="用户名/手机号">
            </div>
            <div class="mui-input-row">
                <input name="pass" type="password" placeholder="密码" v-model="password" class="mui-input-password">
                <span class="mui-icon mui-icon-eye"></span>
            </div>
            <a href="javascript:;" @click="userCheck"  class="mui-btn mui-btn-primary btn_login">登录</a>
            <div class="mui-input-row ">
                <router-link to="/center/register">免费注册</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "index.vue",
        data:function (){
            return {
                user:'',
                password:''
            }
        },
        created:function () {
          //如果本地没有存储用户信息就代表没登陆，就直接跳转到登陆页面
          if (!this.$store.getters.getUserSession.user) {
            this.$router.push('/center/login');
          } else {
            //跳转me页面
            this.$router.push('/center/me');
          }
        },
        methods:{
            userCheck: function () {
              //这里的格式校验以后修改
                if (this.user && this.password){
                    let submitData = {user:this.user,password:this.password};
                    let userInfo = {user:this.user};
                    this.$http.post('/api/login',submitData).then(function (res) {
                      if (res.body.err_code === 1) {
                        //如果服务端验证成功就保存用户的信息,这里仅仅保存了用户名，如果需要别的用户信息，这里还可以在服务端请求
                        this.$store.commit('addUserSession',userInfo);
                        this.$router.push('/center/me');

                      } else if(res.body.err_code ===0) {
                        console.log(res.body.message);
                      }

                    })
                } else{
                  alert('用户名或者密码为空');
                }
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
