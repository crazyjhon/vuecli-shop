<template>
    <div class="register">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
          <form action="">
              <div class="mui-input-row">
                <input name="name" type="text" v-model="user" placeholder="用户名">
              </div>              
              <div class="mui-input-row">
                <input name="pass" type="password" placeholder="密码" v-model="password" class="mui-input-password">
                <span class="mui-icon mui-icon-eye"></span>
              </div>
              <div class="mui-input-row">
                <input name="passconfirm" type="password" placeholder="确认密码" v-model="passconfirm" class="mui-input-password">
                <span class="mui-icon mui-icon-eye"></span>
              </div>
              <div class="mui-input-row">
                <input name="iphonenumber" type="text" v-model="iphonenumber" placeholder="手机号">
              </div>
              <div class="mui-input-row">
                <input name="code" type="text" v-model="checkcode" placeholder="验证码">           
                <a href="javascript:;" class="mui-btn mui-btn-royal" >获取认证码</a>
              </div>              
              <a href="javascript:;" @click="registerCheck"  class="mui-btn mui-btn-royal btn_login">注册</a>              
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data:function() {
            return {
              user:'',
              password:'',
              passconfirm:'',
              iphonenumber:'',
              checkcode:''
            }
        },
        methods:{
            registerCheck: function () {
              //这里的格式校验以后修改
                if (this.user && this.password && this.iphonenumber && this.checkcode){
                    let submitData = {user:this.user,password:this.password,iphonenumber:this.iphonenumber,checkcode:this.checkcode};
                    let userInfo = {user:this.user};
                    this.$http.post('/api/register',submitData).then(function (res) {
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

<style lang ="scss" scoped>
  [type="text"][name="code"]{
        width: 50%;
        float: left;
    }
  .btn_login{
        width: 100%;
        margin: 10px 0;
    }    
  .mui-input-row .mui-btn {
    line-height: 1.5;
    float: right;
    width: 30%;
    padding: 10px 15px;
  }

</style>
