<template>
  <div>
    <van-nav-bar class="nav" :title="title" left-text="返回" left-arrow   @click-left="$router.go(-1)">
    </van-nav-bar>
    <div v-html="data"  style="height:calc(100vh - 65px);overflow-y:auto;" class="padding-10 dddd padding-bottom-10"></div>
    <van-overlay style="background:rgba(0,0,0,0.4)" :show="show"><van-loading style="height:100%;display:flex;align-items: center;justify-content: center;" type="spinner" color="#1989fa" /></van-overlay>
  </div>
</template>
<script>
import {businessApi} from "@/api";
export default {
  props:["title","id"],
  data(){
    return{
      show:false,
      data:"",
      ctitle:""
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.data = "";
      vm.show=true;
      businessApi.getListCommon({
        url:vm.$api.aidDecisionDetail,
        params:{
          ArticleId: vm.id
        }
      }).then(data=>{
        vm.data = data.content
        .replace(/\/attachment/g,"http://www.dizhen.ac.cn/attachment")
        .replace(/\/zfzxx/g,"http://www.dizhen.ac.cn/zfzxx")
        .replace(/http:\/\/www.dizhen.ac.cnhttp:\/\/www.dizhen.ac.cn/g,"http://www.dizhen.ac.cn");
        vm.ctitle = data.title;
        vm.show = false;
      })
  })
    }
  
    
}
</script>
<style lang="scss" scoped>
.dddd{
  ::v-deep img{width: 100%}
}

</style>
