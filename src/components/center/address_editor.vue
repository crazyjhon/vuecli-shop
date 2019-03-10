<template>
  <div class="address_editor">
    <div class="mui-card">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <input type="text" value="zhangsan" placeholder="收货人">
        </div>
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear" value="11111111111" placeholder="手机号码">
        </div>
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear" value="陕西省汉中市汉台区高祖庙街道泗水街3号" placeholder="收货地址">
        </div>
        <router-link to="address_save" class="address_save">保存</router-link>
      </form>
    </div>
    <div class="mui-card">
      <router-link to="address_delete" class="address_delete">删除收货地址</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "address-add"
    }
</script>

<style scoped>
  .address_delete,.address_save{
    text-align:center;
    height:35px;
    line-height:35px;
    display: block;
    color:#6F56A1;
  }
  input{
    color:#333;
    font-size:14px;
  }

</style>
