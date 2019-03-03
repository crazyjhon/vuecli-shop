<template>
    <div id="comments">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="comments-area">
              <h4>发表评论</h4>
              <textarea placeholder="文明评论，不传谣言！" rows="5" v-model="content"></textarea>
              <button type="button" @click="submit" class="mui-btn mui-btn-royal mui-btn-block mui-btn-outlined">发表评论</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <ul class="comments-group">
            <li v-for="item in newsList" :key="item.user" class="comments-list">
                <div>
                    <p class="user">用户：{{ item.user }}</p>
                    <p class="comments-content">{{ item.content }}</p>
                    <p class="date"><span>发表时间：<i>{{ item.date }}</i></span><span><a href="">回复</a></span></p>
                    <hr>
                </div>
            </li>
        </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {Toast } from 'mint-ui';


    export default {
        data:function(){
            return {
                content:''
            }
        },
        methods:{
            submit:function(){
                if(this.content===''){
                    Toast("评论内容不能为空！");
                    return
                }
                var that=this;
                this.$http.get('/api/comments',{data:that.content}).then(function(res){
                    if(res.body.status==="ok"){
                        Toast("发表成功！");
                    }else{
                        Toast("发表失败！");
                    }
                })
            }
        },
        props:['newsList']
    }
</script>

<style lang="scss" scoped>
  #comments{
    .comments-area {
        h4{
            color:#666;
            letter-spacing:1px;
            line-height:20px;
            padding-bottom: 7px;
        }
        textarea {
            margin-bottom: 5px;
            border:1px solid #8a6de9;
            font-size: 13px;
            letter-spacing: 1px;
        }
        .mui-btn-block {
            font-size: 18px;
            display: block;
            width: 100%;
            margin-bottom: 10px;
            padding: 5px 0;
        }
    }
    .comments-group {
        padding: 0;
        margin: 0;
        color: #333;
        li {
            list-style: none;
            padding: 0;
            margin: 0;
            div {
                .user {

                }
                .comments-content {
                    color:#000;
                    letter-spacing:1px;
                }
                .date {
                    display: flex;
                    justify-content: space-between;
                    a{
                        color:#8a6de9;
                    }
                }
                hr{
                    border:1px dashed #8A9295;
                }
            }
        }
    }
}


</style>
