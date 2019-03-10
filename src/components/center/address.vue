<template>
  <div class="address">
  <div class="mui-card">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <router-link to="address_editor/123" class="mui-media-object mui-pull-right editor">编辑</router-link>
        <div class="mui-media-body">
          行尽江南 <span>13512128907</span>
          <p><span class="moren">默认</span>陕西省&nbsp;汉中市&nbsp;汉台区&nbsp;高祖庙街道&nbsp;泗水街3号</p>
        </div>
      </li>
    </ul>
  </div>
  <div class="mui-card">
    <router-link to="address_add" class="address_add">添加新地址</router-link>
  </div>
</div>

</template>

<script>
    export default {

    }
</script>

<style scoped>
  .mui-table-view-cell > a:not(.mui-btn) {
    margin-right: 5px;
    color:#6F56A1;
  }
  .moren{
    padding:2px 8px;
    margin-right:5px;
    color:#6F56A1;
    background-color:#eee;
  }
  .address_add{
    text-align:center;
    height:35px;
    line-height:35px;
    display: block;
    color:#6F56A1;
  }
</style>
