import request from '@/utils/request'

const api_name = '/manageservice/xpcAttr'

export default {
  getXpcAttrPage(page,limit,searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  getXpcAttrByid(id){
      return request({
          url:`${api_name}/getAttr/${id}`,
          method: 'get'
      })
  },
  removeById(id){
    return request({
        url:`${api_name}/deleteAttr/${id}`,
        method: 'delete'
    })
  },
  addXpcAttr(xpcAttr) {
    return request({
      url: `${api_name}/addAttr`,
      method: 'post',
      data: xpcAttr
    })
  },
  UpdatXpcAttr(xpcAttr) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: xpcAttr
    })
  },
  
}