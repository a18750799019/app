import { localStorageSetting } from "@/util/ds.common";
export default {
  data(){
    return {
      lastTime: null, // 最后一次点击的时间
      currentTime: null, // 当前点击的时间
      timeOut: this.$config.timeOut * 60 * 1000 // 设置超时时间:30分钟
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      vm.lastTime = new Date().getTime()
      let userid = localStorageSetting("userid");
      if(!userid){
        vm.$router.push("/login")
        return;
      }
      document.addEventListener("deviceready", ()=>{
        document.addEventListener("jpush.receiveRegistrationId", (event)=> {
          // console.log("receiveRegistrationId" + JSON.stringify(event));
        }, false);
        vm.initJPush();
      }, false);      
    })},
  methods: {
    initJPush(){
      if ('JPush' in window) {
        // console.log(11111)
        try {
            window.JPush.init();
            window.JPush.setDebugMode(false);
            window.JPush.getRegistrationID(function(data) {
              // console.log(22222);
              // console.log(data)
            });
            //设置别名
            let userid = localStorageSetting("userid");
            let arr = [userid];

          window.setTimeout(function(){
           try {
            window.JPush.setAlias({ sequence: 2, alias: userid },(result)=>{
              // console.log(result)
              // console.log("设置成功别名")
            },(error)=>{
              // console.log(error)
              // console.log("设置失败")
            })
            window.JPush.setTags({ sequence: 1, tags: arr},(result)=>{
              // console.log(result)
              // console.log("设置成功")
            },(error)=>{
              // console.log(error)
              // console.log("设置失败")
            })
           
           } catch (error) {
            //  console.log(57)
            //  console.log(error)
           }
          },3000)
           
           
           
            document.addEventListener("jpush.openNotification", function(event){
              // console.log(event)
              // console.log(333333)
              // navigator.notification.alert(event.msg);
            }, false);
            document.addEventListener("jpush.receiveNotification", function(event){
              //收到通知
              try {

                /**
                 * 
                 * const link = document.createElement('a')
                  link.setAttribute('href', src)
                  link.setAttribute('target', '_blank')
                 */
                
                if(event.alert.length==11){
                  window.location.href = "tel:"+event.alert;
                }
                  //相应的动作
              } catch (exception) {
                 // console.log("JPushPlugin:onReceiveNotification" + exception);
              }
          }, false);    
        } catch (exception) {
            //console.log(exception);
        }
      } else {
          //console.error('JPush is not exist...');
      }
    },
    isTimeOut(){
      this.currentTime = new Date().getTime() // 记录这次点击的时间
      if (this.currentTime - this.lastTime > this.timeOut) { // 判断上次最后一次点击的时间和这次点击的时间间隔是否大于30分钟
        if (localStorageSetting("userid")) { // 如果是登录状态
          localStorageSetting("userid", "remove")
          this.$router.push({name: 'login'})
        } else {
          this.lastTime = new Date().getTime()
        }
      } else {
        this.lastTime = new Date().getTime() // 如果在30分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    }
  },
};
