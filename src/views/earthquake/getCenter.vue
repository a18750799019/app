<template>
  <div id="getamap">
    <van-button type="primary" class="submitlanlat">完成</van-button>
  </div>
</template>
<script>
export default {
  props:["lng","lat"],
  data(){
    return {
      amap:null
    }
  },
  mounted(){
    this.amap = new AMap.Map('getamap', {
      resizeEnable: true,
      zoom: 6,
      center: [this.lng||"119", this.lat||"26"],
    });
  }
}
</script>
<style lang="scss" scoped>
.getamap{
  height: 100vh;
  width:100%;
  .submitlanlat{
    position: absolute;
    top:10px;
    right:10px;

  }
}
</style>
