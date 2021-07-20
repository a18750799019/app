<template>
  <van-popup v-model="show"   :position="position" :style="{height:height,'width':width ? width:'100px'} ">
      <div class="head">{{title}}</div>
      <slot></slot>
    </van-popup>
  </template>
<script>
export default {
  name:"popup",
  props: ["title","position",'width','height'],
  data(){
    return {
      show:false,
    }
  },
  methods:{
   ifShow(){
         this.show = true;
      }
  }
}
</script>
<style lang="scss" scoped>
    .head{
      width:calc(100% - 20px);
      height:30px;
      background:rgba(5,107,211,1);
      padding: 0 10px;
      line-height: 30px;
      color: #fff;
      font-size: 14px;
    }
</style>
