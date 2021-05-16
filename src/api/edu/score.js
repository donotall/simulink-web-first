import request from '@/utils/request'

const api_name = '/manageservice/studentScore'

export default {
  getScorePage(id,page,limit) {
    return request({
      url: `${api_name}/client/${id}/${page}/${limit}`,
      method: 'get'
    })
  },
  setScore(id,score){
    return request({
        url: `${api_name}/setScore/${id}/${score}`,
        method: 'put'
      })
  }
}