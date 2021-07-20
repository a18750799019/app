<template>
  <div>
    <van-nav-bar class="nav" :title="title" left-text="返回" left-arrow   @click-left="$router.go(-1)">
    </van-nav-bar>
      <div
        v-if="!isError"
        style="height:calc(100vh - 46px);overflow-y:auto;"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell is-link @click="listItem(item)"  v-for="item in list" :key="item.id" :title="item.title" />
      </div>
      <van-loading style="position: absolute;top: 32%;left: 47%;" v-if="isloading" type="spinner" />
      <div class="text-center margin-top-20" v-if="isError">科普服务提供商出现链接错误，请稍后再试</div>
  </div>
</template>
<script>
import {businessApi} from "@/api";
export default {
  props:{
    title:""
  },
  data() {
    return {
      isloading:true,
      isError:false,
      list: [],
      loading: false,
      finished: false,
      page:1
    };
  },
  beforeRouteEnter(to, from, next){
    next(vm=>{
      vm.onLoad();
    })
  },
  methods: {
    listItem(item){
      this.$router.push(`/admArticle/${item.title}/${item.id}`)
    },
    onLoad(){
      if(this.title == "防震知识"){
        this.onLoad_fzzs()
      }else if(this.title == "地震百科") { 
        this.onLoad_dzbk();
      }
    },
    onLoad_fzzs() {
      Promise.all([businessApi.getListCommon({
        url:this.$api.aidDecisionList,
        params:{
          ArticleClassId: 2844,
          NowPage:this.page,
          type:"thrte"
        }
      }),businessApi.getListCommon({
        url:this.$api.aidDecisionList,
        params:{
          ArticleClassId: 2844,
          NowPage:this.page+1,
          type:"thrte"
        }
      })]).then(data=>{
        this.isloading = false;
        this.list = data[0].list;
        this.list.push.apply(this.list, data[1].list);
      }).catch(r=>{
        this.isloading = false;
        this.isError = true;
      })
    },
    onLoad_dzbk() {
      Promise.all([
      businessApi.getListCommon({
        url:this.$api.aidDecisionList,
        params:{
          ArticleClassId: 3020,
          NowPage:this.page,
          type:"ccate"
        }
      }),
      businessApi.getListCommon({
        url:this.$api.aidDecisionList,
        params:{
          ArticleClassId: 3020,
          NowPage:this.page+1,
          type:"ccate"
        }
      })]).then(data=>{
        this.isloading = false;
         this.list = data[0].list;
        this.list.push.apply(this.list, data[1].list);
      }).catch(r=>{
        this.isloading = false;
        this.isError = true;
      })
    }
  },
};
</script>