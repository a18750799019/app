<template>
  <div class="earthquakeList">
    <div class="head">
      <van-row>
        <van-col span="3" style="white-space: nowrap;text-align: right;" >震级：</van-col>
        <van-col span="9">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" @change	="onSearch"/>
          </van-dropdown-menu>
        </van-col>
        <van-col span="4" style="white-space: nowrap;text-align: right;">时段：</van-col>
        <van-col span="8">
          <van-dropdown-menu >
            <van-dropdown-item v-model="value2" :options="option2"  @change	="onSearch"/>
          </van-dropdown-menu>
        </van-col>
      </van-row>
    </div>
    
  </div>
</template>
<script>
import { businessApi } from "@/api";
import dialogPanel from "@/components/dialog";
import dsMap from "@3d-space/ds-map";
import "@3d-space/ds-map/dist/dsMap.css";
import { magnitudeStyle } from "@/util/ds.common.js";
export default {
  components: { dialogPanel, dsMap },
  data() {
    return {
      subMap: null,
      data: [],
      list: [],
      maxLeng: "",
      loading: false,
      finished: false,
      refreshing: false,
      dialogShow: true,
      dialogTitle: "福建省莆田市秀屿区A街道",
      dialogItem:{},
      dialogCtext:"",
      value1: "",
      value2: "",
      option1: this.$config.magnitude,
      option2: [
        {
          text: "全部",
          value: ""
        },
        {
          text: "最近24小时",
          value: 0
        },
        {
          text: "最近一周",
          value: 1
        },
        {
          text: "最近一个月",
          value: 2
        },
        {
          text: "一个月以上",
          value: 3
        }
      ], //时段

      itemLociton: []
    };
  },
  mounted() {
     this.onRefresh();
  },
   beforeRouteEnter(to, from, next) {
    next(vm=>{
       vm.onSearch();
    })
  },
  methods: {
    //获取地震列表数据
    getEarthquakeData(params) {
      var thas = this;
      businessApi.getListCommon({
        url:this.$api.ealist,
        params
      }).then(data=>{
        if(data.rows.length>0){
            this.data = data.rows;
             this.data.filter((v, i) => {
                
                let _res = magnitudeStyle( v.quakeLevel || 1, this);
                thas.data[i].baColor = _res.color;
            })
            this.maxLeng = this.data.length;
       
        }
            this.refreshing = true;
            this.finished = false;
            this.onLoad();
      })
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        if (this.finished == true) {
          return;
        }

        for (let i = 0; i < 10; i++) {
          if (this.list.length >= this.maxLeng) {
            this.finished = true;
            return;
          }
          this.list.push(this.data[this.list.length]);
        }
        this.loading = false;
        if (this.list.length >= this.maxLeng) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
 

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 单个列表点击函数
    clickFunItem: function(item) {
      this.$refs.dialogList.show = true;
      this.dialogTitle = item.address;
      this.dialogItem = item;
      this.dialogCtext = "据中国地震台网测定，北京时间"+this.$moment(item.seismicTime).format("YYYY年MM月DD日 hh时:mm分")+"在"+item.address+"（北纬"+
      item.lat+"度，东经"+item.lon+"度）发生"+item.quakeLevel+"级地震，震源深度"+item.depth+"米";
      this.itemLociton = [item.lon, item.lat];
      if (this.subMap) {
        this.subMap.removeLayers("point");
        this.subMap.addImagePoint({
          layerName: "point",
          center: this.itemLociton,
          imgUrl: "appimgs/location.png",
          zIndex: 101
        });
        this.subMap.getView().setCenter([item.lon, item.lat]);
      }
    },
    // 震级：
    onConfirm(value) {
      this.magnitude.value = value;
      this.magnitude.showPicker = false;
    },
    // 时间段
    onConfirmTime(value) {
      this.time.value = value;
      this.time.showPicker = false;
    },
    initSubMap(map) {
      this.subMap = map;
      this.subMap.addLayerWmtsByXYZ("vec_w",this.$config.mapSource.vec_w,0);
      this.subMap.addLayerWmtsByXYZ("cva_c",this.$config.mapSource.cva_c,100);
                
      this.subMap.addImagePoint({
        layerName: "point",
        center: this.itemLociton,
        imgUrl: "appimgs/location.png",
        zIndex: 101
      });
    },
    // 主页查询
    onSearch(){
      var address =  this.$parent.value !=''? {searchCity: this.$parent.value}:{};
      var quakeLevel = this.value1!=''? {quakeLevel:this.value1}:{};
      var searchTimeType = this.value!=''? {searchTimeType:this.value2}:{};//时段
      var params = {
        ...address,
        ...quakeLevel,
        ...searchTimeType
      }
        this.getEarthquakeData(params)
    }

  }
};
</script>
 <style lang="scss" scoped>
.earthquakeList {
  position: relative;
  height: calc(100% - 100px);
  margin-top: 50px;
  background: #efefef;
  .head {
    height: 44px;
    background: rgba(187, 192, 206, 0.6);
    line-height: 44px;
    overflow: hidden;
    padding: 0 8px;
    ::v-deep .van-cell {
      padding: 5px 10px;
      margin-top: 5px;
      border-radius: 2px;
    }
    ::v-deep .van-cell:after {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 10px solid rgba(50, 55, 74, 0.5);
      right: 3px;
      left: auto;
      top: calc(50% - 3px);
    }
    ::v-deep .van-dropdown-menu__bar {
      height: 34px;
      margin-top: 5px;
      border-radius: 2px;
    }
    ::v-deep .van-dropdown-menu__title {
      width: calc(100% - 20px);
    }
  }
  .cent {
    padding: 0 8px;
    height: calc(100% - 44px);
    overflow-y: auto;
    .list-row {
      background: #fff;
      border-radius: 4px;
      padding: 5px;
      font-size: 13px;
      margin-top: 5px;
      line-height: 1.5rem;
      color: #636363;
    }
    .list-row .row-left {
      border-radius: 4px;
      height: 100%;
      text-align: center;
      color: #fff;
      font-size: 25px;
      line-height: 4.5rem;
    }
  }
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
    }
    .map {
      height: 240px;
    }
  }
}
</style>