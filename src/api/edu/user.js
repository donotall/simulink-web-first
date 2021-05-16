import request from '@/utils/request'

const api_name = '/educenter/member'

export default {
  getUserPage(page,limit,searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  changeDisabled(changeDisable){
      return request({
          url:`${api_name}/changeDisable`,
          method:'put',
          data: changeDisable
      })
  },
  getUserByCourseId(page,limit,courseId){
    return request({
      url:`${api_name}/course/${courseId}/${page}/${limit}`,
      method:'get'
  })
  },
  getImgUrl(userId,exId){
    return request({
      url:`/manageservice/img/img/${userId}/${exId}`,
      method:'get'
  })
  }
}