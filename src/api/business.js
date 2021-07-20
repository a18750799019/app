import axios from './config.js'

export const getXXX = area => {
  return axios(
    `../data/area/${area}/areacount.json`,
    {
      param1: 'xxx1'
    },
    'get'
  )
}

export const getYYY = area => {
  return axios(
    `../data/area/${area}/areacount.json`,
    {
      param1: 'xxx1'
    },
    'get'
  )
}

// 地震列表
export const getEarthquakeList = () => {
  return axios(`/mock/getEarthquakeList.json`)
}

export const getDeptList = ({ url }) => {
  return axios(url, {}, 'post')
}

export const commonPost4Res = ({ url, params }) => {
  return axios(url, params, 'post', true)
}
// 地震采集列表
// export const getCollentionList = ({url, params}) => {
//   return axios(url, params, "post");
// }

export const getListCommon = ({ url, params }) => {
  return axios(url, params, 'post')
}

export const getCommon = ({ url, params }) => {
  return axios(url, params, 'post')
}

export const getCommon2GET = ({ url, params }) => {
  return axios(url, params)
}

export const changePwd = ({ url, params }) => {
  return axios(url, params, 'post', true)
}

export const getCommonAdd = ({ url, params }) => {
  return axios(url, params, 'post', null, true)
}

export const getVersion = ({ url, params }) => {
  return axios(url, params, 'post')
}

//删除附件
export const delAccessories = ({ url, params }) => {
  return axios(url, params)
}
