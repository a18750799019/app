<template>
<div class="aidDecision">
  <van-nav-bar class="nav" title="辅助决策" >
  </van-nav-bar>
  <div class="aidPanel" @click="toggle(i,item)" :key="item.title" v-for="(item,i) in baseData">
    <div><img :src="item.icon" alt="" height="93px"></div>
    <div class="aidText">{{item.title}}</div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      baseData:this.$config.aidDecision
    }
  },
  methods:{
    toggle(i,item){
      switch (i) {
        case 0:
        case 1:
          this.$router.push(`/admlist/${item.title}`);
          break;
        case 2:
        case 3:
          this.$router.push(`/admmanual/${item.title}`);
          break;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.aidDecision{
  .aidPanel{
    width: calc(50% - 40px);
    display: inline-block;
    text-align: center;
    background: #F7F8FE;
    border-radius: 10px;
    padding:20px 10px;
    vertical-align: top;
    margin: 20px 10px 0px;
    .aidText{
      margin-top: 10px;
    }
  }
}
</style>
