<template>
  <div class="address_editor">
    <div class="mui-card">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <input type="text" placeholder="收货人">
        </div>
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear"  placeholder="手机号码">
        </div>
        <div class="mui-input-row">
          <input type="text" class="mui-input-clear"  placeholder="收货地址">
        </div>
        <router-link to="address_save" class="address_save">保存</router-link>
      </form>
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
