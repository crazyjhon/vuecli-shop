<template>
    <div></div>
</template>

<script>
    export default {
        name: "logout",
        created :function () {
          //销毁本地保存的用户信息
          this.$store.commit('deleteUserSession');
          this.$http.post('/api/logout').then(function (res) {
            if (res.body.err_code === 1) {
              this.$router.push('/center/login');
            }
          }).catch(function () {
            alert('服务器繁忙，请稍后再试');
          })

        }
    }
</script>

<style scoped>

</style>
