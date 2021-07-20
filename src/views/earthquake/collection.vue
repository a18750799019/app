<template>
  <div class="collection">
    <van-nav-bar class="nav"
                 title="灾情采集"
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)">
      <template #right>
        <router-link to="/addCollection">
          <van-image src="appimgs/icon-add.png"
                     style=" width: 1rem;vertical-align: middle;"></van-image>
          <span style="padding-left:0.1rem;color:#fff;vertical-align: middle;">新增</span>
        </router-link>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active"
              color="#066BD4"
              class="sub-nav">
      <!-- 地震现场 -->
      <van-tab title="地震现场"
               v-if="!isTourists">
        <div class="div-scene">
          <div class="head">
            <div>
              <van-field @input="getCollentionListAll"
                         v-model="collectionAll.reportValue"
                         label="上报地点："
                         placeholder="请输入地址" />
            </div>
            <van-row justify="space-between">
              <van-col span="14">
                <van-field v-model="collectionAll.reportTimeStart"
                           label="上报日期："
                           @click="collectionAll.showStart=true" />
              </van-col>
              <van-col span="1"
                       style="text-align:center;line-height: 46px;">-</van-col>
              <van-col span="9">
                <van-field v-model="collectionAll.reportTimeEnd"
                           @click="collectionAll.showEnd = true" />
              </van-col>
            </van-row>
            <div class="list">
              <span class="list-left"
                    style=" text-align: left;">地震标识：</span>
              <span class="list-cent">
                <van-dropdown-menu class="list-dropdown">
                  <van-dropdown-item v-model="collectionAll.quakeid"
                                     :options="equiListOption"
                                     @change="getCollentionListAll({page:1,rows:10})"></van-dropdown-item>
                </van-dropdown-menu>
              </span>
            </div>
          </div>
          <div class="cent">
            <van-list :immediate-check="false"
                      v-model="collectionAll.loading"
                      :finished="collectionAll.finished"
                      finished-text="没有更多了"
                      @load="allonLoad">
              <van-row v-for="(item,index) in collectionAll.list"
                       :key="index"
                       gutter="10"
                       class="list-row"
                       @click="clickFunDetails(item)">
                <van-col span="7"
                         class="row-left">
                  <van-image v-if="item.accessory && item.accessory.length >0 && item.accessory[0].type==0"
                             :src="`${relativePath}api/static/image/${item.accessory[0].fileName}`"
                             class="img">
                    <template v-slot:error>暂无图片</template>
                  </van-image>

                </van-col>
                <van-col span="17">
                  <div class="text">
                    <span>&nbsp;&nbsp;烈度： {{item.intensity}}度</span>
                    <span style="float:right">
                      <van-tag v-if="item.isDraft == '草稿'"
                               round
                               type="success"
                               style=" padding: .2em .8em;">{{item.isDraft}}</van-tag>
                      <van-tag v-if="item.isDraft == '已上报'"
                               round
                               style=" padding: .2em .8em;">{{item.isDraft}}</van-tag>
                    </span>
                  </div>
                  <div class="text">
                    <span>上报地点： {{item.reportAddress}}</span>
                  </div>
                  <div class="text">
                    <span>发震时间： {{item.reportTime}}</span>
                  </div>
                  <div class="text">
                    <span v-if="item.quakes">地震标识: {{item.quakes.address}}</span>
                  </div>
                </van-col>
              </van-row>
            </van-list>
          </div>
        </div>
      </van-tab>
      <!-- 我的采集 -->
      <van-tab title="我的采集">
        <div class="div-collection">
          <div class="head">
            <div>
              <van-field @input="getCollentionListMy"
                         v-model="collectionMy.reportValue"
                         label="上报地点："
                         placeholder="请输入地址" />
            </div>
            <van-row justify="space-between">
              <van-col span="14">
                <van-field v-model="collectionMy.reportTimeStart"
                           label="上报日期："
                           @click="collectionMy.showStart=true" />
              </van-col>
              <van-col span="1"
                       style="text-align:center; line-height: 46px;">-</van-col>
              <van-col span="9">
                <van-field v-model="collectionMy.reportTimeEnd"
                           @click="collectionMy.showEnd = true" />
              </van-col>
            </van-row>
            <div class="list">
              <span class="list-left"
                    style=" text-align: left;">地震标识：</span>
              <span class="list-cent">
                <van-dropdown-menu class="list-dropdown">
                  <van-dropdown-item v-model="collectionMy.quakeid"
                                     :options="equiListOption"
                                     @change="getCollentionListMy({page:1,rows:10})"></van-dropdown-item>
                </van-dropdown-menu>
              </span>
            </div>
          </div>
          <div class="cent">
            <van-list :immediate-check="false"
                      v-model="collectionMy.loading"
                      :finished="collectionMy.finished"
                      finished-text="没有更多了"
                      @load="myonLoad">
              <van-row v-for="(item,index) in collectionMy.list"
                       :key="index"
                       gutter="10"
                       class="list-row"
                       @click="clickFunDetails(item)">
                <van-col span="7"
                         class="row-left">
                  <van-image v-if="item.accessory && item.accessory.length >0 && item.accessory[0].type==0"
                             :src="`${relativePath}api/static/image/${item.accessory[0].fileName}`"
                             class="img">
                    <template v-slot:error>暂无图片</template>
                  </van-image>

                </van-col>
                <van-col span="17">
                  <div class="text">
                    <span>&nbsp;&nbsp;烈度： {{item.intensity}}度</span>
                    <span style="float:right">
                      <van-tag v-if="item.isDraft == '草稿'"
                               round
                               type="success"
                               style=" padding: .2em .8em;">{{item.isDraft}}</van-tag>
                      <van-tag v-if="item.isDraft == '已上报'"
                               round
                               style=" padding: .2em .8em;">{{item.isDraft}}</van-tag>
                    </span>
                  </div>
                  <div class="text">
                    <span>上报地点： {{item.reportAddress}}</span>
                  </div>
                  <div class="text">
                    <span>发震时间： {{item.reportTime}}</span>
                  </div>
                  <div class="text">
                    <span v-if="item.quakes">地震标识: {{item.quakes.address}}</span>
                  </div>
                </van-col>
              </van-row>
            </van-list>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup v-model="collectionAll.showStart"
               position="bottom"
               style="min-height:260px">
      <van-datetime-picker v-model="collectionAll.currentDate"
                           type="date"
                           @confirm="onConfirmStartAll"
                           @cancel="collectionAll.showStart = false"
                           :max-date="maxDate" />
    </van-popup>
    <van-popup v-model="collectionAll.showEnd"
               position="bottom"
               style="min-height:260px">
      <van-datetime-picker v-model="collectionAll.currentDate"
                           type="date"
                           @confirm="onConfirmEndAll"
                           @cancel="collectionAll.showEnd = false"
                           :max-date="maxDate" />
    </van-popup>
    <!-- 我的模块时间选择 -->
    <van-popup v-model="collectionMy.showStart"
               position="bottom"
               style="min-height:260px">
      <van-datetime-picker v-model="collectionMy.currentDate"
                           type="date"
                           @confirm="onConfirmStartMy"
                           @cancel="collectionMy.showStart = false"
                           :max-date="maxDate" />
    </van-popup>
    <van-popup v-model="collectionMy.showEnd"
               position="bottom"
               style="min-height:260px">
      <van-datetime-picker v-model="collectionMy.currentDate"
                           type="date"
                           @confirm="onConfirmEndMy"
                           @cancel="collectionMy.showEnd = false"
                           :max-date="maxDate" />
    </van-popup>
  </div>
</template>
<script>
import { businessApi } from "@/api";
import { localStorageSetting } from "@/util/ds.common";
export default {
  name: "collection",
  data () {
    return {
      maxDate: new Date(),
      relativePath: this.$config.relativePath, //视频和路径的相对
      active: 1,
      showStart: false, //时间弹出
      showEnd: false,
      currentDate: new Date(),
      equiListOption: [],
      collectionAll: {
        list: [], //地震现场列表数据
        finished: false,
        loading: false,
        pagesize: 1,
        rows: 10,
        reportValue: "", //上报地点
        reportTimeStart: "", //上报开始时间
        reportTimeEnd: "",//上报结束时间
        quakeid: "",  //地震id
        currentDate: new Date(),
        showStart: false,
        showEnd: false,
      },
      collectionMy: {
        list: [], //地震现场列表数据
        finished: false,
        loading: false,
        pagesize: 1,
        rows: 10,
        reportValue: "", //上报地点
        reportTimeStart: "", //上报开始时间
        reportTimeEnd: "", //上报结束时间
        quakeid: "",  //地震id
        currentDate: new Date(),
        showStart: false,
        showEnd: false,
      },
      isTourists: false, //不是游客
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isTourists =
        localStorage.getItem("_tourists") == "true" ? true : false;
      vm.collectionAll.reportTimeStart = "";
      vm.collectionAll.reportTimeEnd = "";
      vm.collectionAll.reportValue = ""
      vm.collectionMy.reportTimeStart = "";
      vm.collectionMy.reportTimeEnd = "";
      vm.collectionMy.reportValue = ""
    });
  },
  mounted () {
    this.getEarthquakeData()
    this.getCollentionListMy({
      page: 1,
      rows: 10
    });
    if (!this.isTourists) {
      this.getCollentionListAll({
        page: 1,
        rows: 10
      });
    }
  },
  methods: {
    //获取数据
    getCollentionListAll (params, isonload) {
      let reportAddress = this.collectionAll.reportValue != "" ? { searchAddress: this.collectionAll.reportValue } : {}
      let reportTimeBegin = this.collectionAll.reportTimeStart != "" ? { reportTimeBegin: this.collectionAll.reportTimeStart } : {}
      let reportTimeEnd = this.collectionAll.reportTimeEnd != "" ? { reportTimeEnd: this.collectionAll.reportTimeEnd } : {}
      let quakeid = this.collectionAll.quakeid != "" ? { quakeid: this.collectionAll.quakeid } : {}
      businessApi.getCommon({
        url: this.$api.collentionList,
        params: {
          ...params,
          ...reportAddress,
          ...reportTimeBegin,
          ...reportTimeEnd,
          ...quakeid,
          isDraft: "已上报"
        }
      }).then(data => {
        if (isonload) {
          this.collectionAll.list.push(...data.row);
          return;
        }
        // var listDraft = JSON.parse(
        //   localStorage.getItem("earthquakeListCache") || "[]"
        // );
        // listDraft.push(...data.rows);
        this.collectionAll.list = data.rows; //所有的
        this.collectionAll.loading = false;
        if (data.rows.length < 10) {
          this.collectionAll.finished = true;
        }
      });

    },
    // 获取我的采集
    getCollentionListMy (params, isonload) {
      let user = localStorageSetting("userCount");
      let userid = localStorageSetting("userid");
      let reportAddress = this.collectionMy.reportValue != "" ? { searchAddress: this.collectionMy.reportValue } : {}
      var reportUserid = { reportUserid: user ? user.id : userid };
      let reportTimeBegin = this.collectionMy.reportTimeStart != "" ? { reportTimeBegin: this.collectionMy.reportTimeStart } : {}
      let reportTimeEnd = this.collectionMy.reportTimeEnd != "" ? { reportTimeEnd: this.collectionMy.reportTimeEnd } : {}
      let quakeid = this.collectionMy.quakeid != "" ? { quakeid: this.collectionMy.quakeid } : {}
      if (this.isTourists) {
        reportUserid = { reportUserPhone: userid };
      }
      businessApi
        .getCommon({
          url: this.$api.collentionList,
          params: {
            ...params,
            ...reportUserid,
            ...reportAddress,
            ...reportTimeBegin,
            ...reportTimeEnd,
            ...quakeid
          }
        })
        .then(data => {

          if (isonload) {
            this.collectionMy.list.push(...data.row);
            return;
          }
          var listDraft = JSON.parse(
            localStorage.getItem("earthquakeListCache") || "[]"
          );
          listDraft.push(...data.rows);
          this.collectionMy.list = listDraft;
          this.collectionMy.loading = false;
          if (data.rows.length < 10) {
            this.collectionMy.finished = true;
          }
        });
    },
    myonLoad () {
      this.collectionMy.pagesize += 1;
      this.getCollentionListMy({
        page: this.collectionMy.pagesize,
        rows: this.collectionMy.rows
      }, true);
    },
    allonLoad () {
      this.collectionAll.pagesize += 1;
      this.getCollentionListAll({
        page: this.collectionAll.pagesize,
        rows: this.collectionAll.rows
      }, true);
    },
    // 开始时间
    onConfirmStartMy (time) {
      this.collectionMy.reportTimeStart = this.$moment(time).format("YYYY-MM-DD");
      this.collectionMy.showStart = false;
      this.getCollentionListMy({
        reportTimeBegin: this.collectionMy.reportTimeStart
      })
    },
    // 结束时间
    onConfirmEndMy (time) {
      this.collectionMy.reportTimeEnd = this.$moment(time).format("YYYY-MM-DD");
      this.collectionMy.showEnd = false;
      this.getCollentionListMy({
        reportTimeEnd: this.collectionMy.reportTimeEnd
      })
    },

    // 开始时间
    onConfirmStartAll (time) {
      this.collectionAll.reportTimeStart = this.$moment(time).format("YYYY-MM-DD");
      this.collectionAll.showStart = false;
      this.getCollentionListAll({
        reportTimeBegin: this.collectionAll.reportTimeStart
      })
    },
    // 结束时间
    onConfirmEndAll (time) {
      this.collectionAll.reportTimeEnd = this.$moment(time).format("YYYY-MM-DD");
      this.collectionAll.showEnd = false;
      this.getCollentionListAll({
        reportTimeEnd: this.collectionAll.reportTimeEnd
      })
    },
    // 编辑
    clickFunDetails (item) {
      this.$router.push({
        path: `/addCollection`,
        query: { id: item.id, title: "编辑采集" }
      });
    },
    //获取地震列表
    getEarthquakeData () {
      var thas = this;
      businessApi.getCommon({
        url: this.$api.ealist
      }).then(data => {
        if (data.rows.length > 0) {
          this.equiListOption = data.rows.filter(v => {
            v.value = v.id;
            v.text = `${v.address}[${v.quakeLevel}级]`;
            return v;
          });
          if (thas.quakeid == '') {
            thas.quakeid = thas.equiListOption[0].value;
          }
        }
      });
    },
  }
};
</script>
 <style lang="scss" scoped>
.collection {
  background: #ecf0fb;
  height: 100%;
  .sub-nav {
    ::v-deep .van-tab--active {
      color: #066bd4;
    }
  }
  .div-scene {
    .head {
      height: 150px;
      background: rgba(219, 226, 241, 1);
      ::v-deep .van-cell {
        background-color: inherit;
        padding: 5px 10px;
      }
      ::v-deep .van-field__label {
        padding: 5px 0px;
        width: 80px;
      }
      ::v-deep .van-field__control {
        padding: 5px 0px;
        background: rgba(236, 240, 249, 1);
        border-radius: 2px;
        border: 1px solid rgba(181, 181, 181, 1);
      }
      .list {
        padding: 5px 10px;
        .list-left {
          height: 35px;
          font-size: 13px;
          line-height: 35px;
          font-weight: 400;
          color: #323233;
          display: inline-block;
          width: 5rem;
          text-align: right;
          vertical-align: middle;
        }
        .list-cent {
          display: inline-block;
          width: calc(100% - 5rem);
          vertical-align: middle;
        }
        .list-dropdown {
          height: 35px;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          ::v-deep .van-dropdown-menu__bar {
            height: 35px;
            border-radius: 2px;
            background-color: #ecf0f9;
            border: 1px solid #b5b5b5;
          }
          ::v-deep .van-dropdown-menu__title {
            width: calc(100% - 20px);
            padding: 0px;
          }
        }
        ::v-deep .van-cell__value--alone {
          border-radius: 4px;
          border: 1px solid #dcdcdc;
        }
      }
    }
    .cent {
      padding: 5px 8px;
      overflow-y: auto;
      height: calc(100vh - 200px);
      .list-row {
        background: #fff;
        border-radius: 4px;
        padding: 5px;
        font-size: 13px;
        margin-top: 5px;
        line-height: 1.5rem;
        color: #636363;
        .text {
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
          height: 1.5rem;
        }
        .row-left {
          border-radius: 4px;
          height: 100%;
          text-align: center;
          color: #fff;
          font-size: 25px;
          border-radius: 4px;
          overflow: hidden;
          .img {
            // height: 5.5rem;
            border-radius: 10px;
            overflow: hidden;
          }
        }
      }
    }
  }
  .div-collection {
    .head {
      height: 150px;
      background: rgba(219, 226, 241, 1);
      ::v-deep .van-cell {
        background-color: inherit;
        padding: 5px 10px;
      }
      ::v-deep .van-field__label {
        padding: 5px 0px;
        width: 80px;
      }
      ::v-deep .van-field__control {
        padding: 5px 0px;
        background: rgba(236, 240, 249, 1);
        border-radius: 2px;
        border: 1px solid rgba(181, 181, 181, 1);
      }
      .list {
        padding: 5px 10px;
        .list-left {
          height: 35px;
          font-size: 13px;
          line-height: 35px;
          font-weight: 400;
          color: #323233;
          display: inline-block;
          width: 5rem;
          text-align: right;
          vertical-align: middle;
        }
        .list-cent {
          display: inline-block;
          width: calc(100% - 5rem);
          vertical-align: middle;
        }
        .list-dropdown {
          height: 35px;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          ::v-deep .van-dropdown-menu__bar {
            height: 35px;
            border-radius: 2px;
            background-color: #ecf0f9;
            border: 1px solid #b5b5b5;
          }
          ::v-deep .van-dropdown-menu__title {
            width: calc(100% - 20px);
            padding: 0px;
          }
        }
        ::v-deep .van-cell__value--alone {
          border-radius: 4px;
          border: 1px solid #dcdcdc;
        }
      }
    }
    .cent {
      padding: 5px 8px;
      overflow-y: auto;
      height: calc(100vh - 200px);
      .list-row {
        background: #fff;
        border-radius: 4px;
        padding: 5px;
        font-size: 13px;
        margin-top: 5px;
        line-height: 1.5rem;
        color: #636363;
        .text {
          overflow: hidden;
          white-space: normal;
          text-overflow: ellipsis;
          height: 1.5rem;
        }

        .row-left {
          border-radius: 4px;
          height: 100%;
          text-align: center;
          color: #fff;
          font-size: 25px;
          border-radius: 4px;
          overflow: hidden;
          .img {
            // height:5.5rem;
            border-radius: 10px;
            overflow: hidden;
            max-height: 5.5rem;
          }
        }
      }
    }
  }
}
</style>