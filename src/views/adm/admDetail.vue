<template>
  <div class="admList">
      <van-nav-bar class="nav" :title="title" left-text="返回" left-arrow   @click-left="goback">
      </van-nav-bar>
      <pdf-box class="pdfbox" v-if="pdfurl" :src="pdfurl"></pdf-box>
  </div>
</template>
<script>
 
import pdfBox from "@/components/pdfBox"
// import pdfZoomed from '@/components/pdfZoomed'
export default {
  props:{
    title:"",
    types:""
  },
  components: {pdfBox},
  data () {
    return {
      pdfurl: null
    }
  },
  beforeRouteEnter(to,form,next){
    next((vm)=>{ 
      vm.pdfurl = vm.$config.apiFileUrl + vm.title+".pdf"
    })
  },
  methods:{
    goback(){
      this.pdfurl = null;
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
.admList{
  .admHead{
    background: #DBE2F1;
    height:100px;
  }
  .admContent{
    background: #ECF0FB;
    height: calc(100% - 100px);
    overflow-y: auto;
  }
}
.pdfbox {
    height: calc(100vh - 46px);
    overflow: auto;

}
</style>

