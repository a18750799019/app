<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
html,body,#app{
  height: 100%;
  width: 100%;
}
#app {
  font-family: "MicrosoftYaHei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow:hidden;
  box-sizing: border-box;
}

#nprogress .bar {
  background: #7db6be !important; 
  height: 4px !important;
}

.nav{
  background: #066BD4 !important;
  .van-icon{
      color: #fff  !important;
  }
  .van-nav-bar__title{
      color: #fff 
  }
 .van-nav-bar__text{
      color: #fff;
  }

}

  
</style>


