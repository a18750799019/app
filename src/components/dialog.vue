<template>
    <van-dialog v-model="show" title="标题" show-cancel-button  :showConfirmButton="showConfirmButton||false" :showCancelButton="showCancelButton||false"
            @close="close"
            width="80%">
            <div slot="title" class="head">
              {{title}}
              <van-icon name="cross" color="#D0D1D5" size="22" style="float:right" @click='close'/>
              </div>
            <slot></slot>  
    </van-dialog>
 
  
</template>
<script>
export default {
  name:"Test",
  props: ["title","dialogVisible","showConfirmButton","showCancelButton"],
  methods:{
    close(){
      this.show=false;
      this.$emit("close");
    }
  },
  data(){
    return{
      show:false
    }
  }
}
</script>
<style lang="scss" scoped>

   ::v-deep .el-dialog{
     border-radius: 7px;
     .el-dialog__header{
      background: #E4F1FF;
     border-radius: 7px 7px 0 0;
      color: #000000;
      height: 40px;
      line-height: 40px;
      padding:0 0 0 10px;
      text-align: left;
      border-bottom: 1px solid #A6E1FF;
      .el-dialog__headerbtn{
        top:13px;
        .el-dialog__close{
          color:#000000;
          top:10px;
        }
      }
    }
  }
  ::v-deep .el-dialog__wrapper{
  overflow: hidden;
}
::v-deep .van-dialog__header{
  padding: 15px 10px;
}

.head{
  text-align: left;
  color: #057FD2;
  font-size: 15px;
  line-height: 1.5rem;
  font-weight:bold;
}
</style>
