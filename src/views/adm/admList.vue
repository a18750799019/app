<template>
  <div class="admList">
      <van-nav-bar class="nav" :title="title" left-text="返回" left-arrow   @click-left="$router.go(-1)">
        </van-nav-bar>
      <div class="admHead">
            
            <div>
                <van-field v-model="reportValue" label="查询：" placeholder="请输入地址" />
            </div>
            <van-row  justify="space-between">
                <van-col span="14">
                      <van-field v-model="reportTimeStart" label="上报日期：" @click="showPopupStart"/>
                </van-col>
                <van-col span="1" style="text-align:center;line-height: 46px;">-</van-col>
                <van-col span="9">
                      <van-field v-model="reportTimeEnd"   @click="showPopupEnd"/>
                </van-col>
            </van-row>
                    
                           
                    
      </div>
      <div class="admContent">
        <div class="subPanel" :key="i" v-for="(item,i) in list">
          <van-row>
            <van-col span="18">
              <div class="admSize">序号:{{i+1}}</div>
              <div class="admTime ellipsis-one">文件名称:{{(item[currType]).slice(5,-4)}}</div>
              <div class="admSize">创建时间:{{(item.createDate||"").slice(0,19).replace("T"," ")}}</div>
            </van-col>
            <van-col span="6">
              <van-button @click="showMap(item)" class="dydz" size="small" icon="appimgs/icon-lo.png" type="info">对应地震</van-button>
              <van-button 
              @click="$router.push(`/admdetail/${(item[currType]).slice(5,-4)}/${title}`)" 
              class="showDetail" size="small" type="info">查看详情</van-button>
            </van-col>
          </van-row>
        </div>
      </div>

       <van-popup v-model="showStart" position="bottom" style="min-height:260px">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="onConfirmStart"
                @cancel="showStart = false"
                  :max-date="maxDate"
                />
        </van-popup>
        <van-popup v-model="showEnd" position="bottom" style="min-height:260px">
             <van-datetime-picker
                v-model="currentDate"
                type="date"
                 @confirm="onConfirmEnd"
                 @cancel="showEnd = false"
                   :max-date="maxDate"
                />
        </van-popup>
         <dialog-panel ref="dialogList" :title="dialogTitle">
          <div class="dialog-c">
            <div class="map">
              <ds-map
                class="map"
                @init="initSubMap"
                :center="[119,26]" 
                :options="{ controls:{zoom: false}}"
                :zoom="6"
                providers="Tianditu.Normal"
              ></ds-map>
            </div>

            <div class="dialog-text">{{dialogCtext}}</div>
          </div>
        </dialog-panel>
    </div>
</template>
<script>
import { businessApi } from "@/api";
import dsMap from "@3d-space/ds-map";
import "@3d-space/ds-map/dist/dsMap.css";
import dialogPanel from "@/components/dialog";
export default {
  components:{dsMap, dialogPanel},
  props: {
    title: "",
  },
  data() {
    return {
      currType:"adm",
      maxDate: new Date(),
      reportValue: "", //上报地点
      reportTimeStart: "", //上报开始时间
      reportTimeEnd: "", //上报结束时间
      showStart: false, //时间弹出
      showEnd: false,
      currentDate: new Date(),
      list: [],
      subMap:null,
      dialogTitle:"",
      dialogCtext:"",
      itemLociton:[119,26]
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let type = vm.title == "灾情简报" ? "hbr" : "adm";
      vm.currType = type+"Path";
      businessApi.commonPost4Res({
        url: vm.$api.accessoryList,
        params: {
          type
        }
      }).then(data=>{
        vm.list = data.objects;
      })
    });
  },
  methods: {
    showMap(data={}){
        businessApi.getCommon({
          url: this.$api.ealist,
          params:{id: data.quakesid}
        }).then(iitem => {
          let item = iitem.rows[0];
          this.$refs.dialogList.show = true;
          this.dialogTitle = item.address||"";
          this.dialogCtext = "据中国地震台网测定，北京时间"+this.$moment(item.seismicTime||new Date()).format("YYYY年MM月DD日 hh时:mm分")+"在"+(item.address||"-")+"（北纬"+
          (item.lat||"-")+"度，东经"+(item.lon||"-")+"度）发生"+(item.quakeLevel||"-")+"级地震，震源深度"+(item.depth||"-")+"米";
          this.itemLociton = [item.lon||119, item.lat||26];
          if (this.subMap) {
            this.subMap.removeLayers("point");
            this.subMap.addImagePoint({
              layerName: "point",
              center: this.itemLociton,
              imgUrl: "appimgs/location.png",
              zIndex: 101,
              text:{
                text:""
              }
            });
            this.subMap.getView().setCenter(this.subMap.projFromLonLatTrans({center:this.itemLociton}));
          }

        });



        
    },
    //初始化列表弹窗地图
    //只做地图叠加和中心点打点
    initSubMap(map) {
      this.subMap = map;
      // this.subMap.addLayerWmtsByXYZ("vec_w",this.$config.mapSource.vec_w,0);
      // this.subMap.addLayerWmtsByXYZ("cva_c",this.$config.mapSource.cva_c,100);
      this.subMap.getView().setCenter(this.subMap.projFromLonLatTrans({center:this.itemLociton}));         
      this.subMap.addImagePoint({
        layerName: "point",
        center: this.itemLociton,
        imgUrl: "appimgs/location.png",
        zIndex: 101,
        text:{
          text:""
        }
      });
    },
    // 开始时间
    onConfirmStart(time) {
      this.reportTimeStart = this.$moment(time).format("YYYY-MM-DD");
      this.showStart = false;
    },
    // 结束时间
    onConfirmEnd(time) {
      this.reportTimeEnd = this.$moment(time).format("YYYY-MM-DD");
      this.showEnd = false;
    },
    showPopupStart() {
      this.showStart = true;
    },
    showPopupEnd() {
      this.showEnd = true;
    },
  },
};
</script>
<style lang="scss" scoped>
 .dialog-c {
    padding: 10px;
    padding-top: 0px;
    .dialog-img {
      border-radius: 5px;
      overflow: hidden;
    }
    .dialog-text {
      font-size: 13px;
      line-height: 1.5rem;
      font-weight: 400;
      color: #333;
      text-indent: 2em;
      margin-top:5px;
    }
    .map {
      height: 230px;
    }
  }
.admList {
  .admHead {
    background: #dbe2f1;
    height: 100px;
    ::v-deep .van-cell {
      background-color: inherit;
      padding: 5px 10px;
    }
    ::v-deep .van-field__label {
      padding: 5px 0px;
      width: 80px;
      text-align: right;
    }
    ::v-deep .van-field__control {
      padding: 5px 0px;
      background: rgba(236, 240, 249, 1);
      border-radius: 2px;
      border: 1px solid rgba(181, 181, 181, 1);
    }
  }
  .admContent {
    background: #ecf0fb;
    height: calc(100vh - 146px);
    overflow-y: auto;
    .subPanel {
      margin: 10px;
      padding: 10px;
      height: 90px;
      background: #fff;
      border-radius: 10px;
      line-height: 29px;
      .admTitle {
        color: #979797;
        font-size: 16px;
      }
      .admTime,
      .admSize {
        color: #9a9a9a;
        font-size: 15px;
      }
      .showDetail {
        border-radius: 6px;
        background: #0fabf9;
        border: none;
        padding: 0 13px;
      }
      .dydz {
        background: #c3e0ff;
        color: #066bd4;
        border: none;
        border-radius: 6px;
        margin-bottom: 15px;
        margin-top: 10px;
        padding: 0 6px 0 1px;
      }
    }
  }
}
</style>

