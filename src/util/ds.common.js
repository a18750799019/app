
// import isdev from "@/util/ds.is-dev";
import { loadConfig } from "@/api";
import differenceInHours from 'date-fns/differenceInHours'
import aes from "./ds.aes"

const loadInitConf = function(type) {
  return loadConfig(`./config/${type}.json`);
};

const localStorageSetting = function(key, value) {
  let res = null;
  if(value=="remove"){
    localStorage.removeItem(key);
    return;
  }
  if(value) {
    res = localStorage.setItem(key, JSON.stringify(value));
  } else {
    res = localStorage.getItem(key);
    try {
      res = JSON.parse(res);
    } catch (error) {
      /** ignore */
    }
  }
  return res;
}

const setMapPointStyle = function(time, level){
  let _color = "#FF0000";
  let _diameter = 10;
  let _pixelOffset = [-10,18];
  let _currDate = new Date();
  let _monthDays = new Date(_currDate.getFullYear(),_currDate.getMonth()+1,0);
  let num = differenceInHours( _currDate,new Date(time));
  if (num<24){
    _color = "#F03535";
  } else if(num >= 24 && num< 168)  {
    _color = "#FEB125";
  } else if(num >= 168 && num< 24* _monthDays.getDate())  {
    _color = "#F2E121";
  }  else if(num >= 24* _monthDays.getDate() && num < 24* 365) {
    _color = "##91DE4B";
  } else {
    _color = "#E5E5E5";
  }
  if(level<3){
    _diameter = 2;
  } else if(level <5) {
    _diameter = 4
  } else if(level <7) {
    _diameter = 5
  } else {
    _diameter = 6
    _pixelOffset = [-13,26];
  }
  return {
    color: _color,
    diameter: _diameter,
    pixelOffset:_pixelOffset
  }
}

const magnitudeStyle = function(level,vm){
  let _color = "#4abde2";
  if( Number.parseFloat(level)){
    vm.$config.earthquakeLevelType.filter(x=>{
      if(Number.parseFloat(level)>=x.min&& Number.parseFloat(level)<=x.max){
         _color = x.color;
      }
    })
  }
  
  return {
    color: _color
  }
}

/**
 * 密码加密
 * @param {*} pwd 
 */
const pwdEncrypt = (pwd,oldPwd)=>{
  if(pwd.length==18){
    return oldPwd
  }
  let encryptPassword = aes.encrypt(pwd);
  let decryptPassword = aes.decrypt(encryptPassword);
  return decryptPassword;
}

export {
  loadInitConf,
  localStorageSetting,
  setMapPointStyle,
  magnitudeStyle,
  pwdEncrypt
}