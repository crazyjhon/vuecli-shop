<template>
    <div class="mui-content-padded">
        <p v-for="item in imgSrc" :key="item">
            <img :src="item" :data-preview-src="item" data-preview-group="1" />
        </p>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                imgSrc:null
            }
        },
        created:function(){
            this.getinfo();
        },
        methods:{
            getinfo:function(){
                var that=this;
                this.$http.get('public/static/mock/bookdetailsimage.json').then(function(res){
                    that.imgSrc=res.body;
                });
            }
        },


    }
</script>

<style scoped>
    img{
        width:100%;
    }

</style>
