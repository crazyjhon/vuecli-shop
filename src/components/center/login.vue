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
        methods:{
            userCheck: function () {
                if (this.user && this.password){
                    console.log(this.user);
                    this.$http.post('localhost:3000/login',{user:this.user,password:this.password}).then(function () {

                    })
                    // this.$http.post({
                    //     url:'baidu.com',
                    //     data:this.user
                    // }).then(function () {
                    //
                    // })
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