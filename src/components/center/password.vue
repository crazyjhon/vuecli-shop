<template>
    <div class="password">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
              <div class="mui-input-row">
                <input name="oldPassword" type="password" placeholder="原密码" class="mui-input-password">
                <span class="mui-icon mui-icon-eye"></span>
              </div>
              <div class="mui-input-row">
                <input name="newPassword" type="password" placeholder="新密码" class="mui-input-password">
                <span class="mui-icon mui-icon-eye"></span>
              </div>
              <div class="mui-input-row">
                <input name="reNewPassword" type="password" placeholder="确认新密码" class="mui-input-password">
                <span class="mui-icon mui-icon-eye"></span>
              </div>
              <div class="mui-input-row">
                <input name="code" type="text" placeholder="认证码">
                <a href="javascript:;" class="mui-btn mui-btn-royal" >获取认证码</a>
              </div>
              <a href="javascript:;" class="mui-btn mui-btn-royal btn_updatePass">确认修改</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    [type="text"][name="code"]{
        width: 60%;
        float: left;
    }
    .btn_updatePass {
        width: 100%;
        padding:8px;
    }
    .mui-input-row .mui-btn {
      line-height: 1.1;
      float: right;
      width: 30%;
      padding: 10px 15px;
    }

</style>
