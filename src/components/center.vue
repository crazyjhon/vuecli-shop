<template>
    <div></div>
</template>

<script>
    export default {
        name: "center",
        created:function () {
          //如果本地没有存储用户信息就代表没登陆，就直接跳转到登陆页面
          if (!this.$store.getters.getUserSession.user) {
            this.$router.push('/center/login');
          } else {
            //跳转me页面
            this.$router.push('/center/me');
          }
        }
    }
</script>

<style scoped>

</style>
