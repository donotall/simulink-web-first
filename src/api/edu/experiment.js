import request from '@/utils/request'

const api_name = '/manageservice/eduexperiment'

export default {
  getExperimentPage(page,limit,searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  getExperimentByExperimentId(couseId) {
    return request({
      url: `${api_name}/list/${couseId}`,
      method: 'get'
    })
  },
  removeById(id){
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  addExperiment(eduExperiment){
    return request({
      url: `${api_name}/addExperiment`,
      method: 'post',
      data: eduExperiment
    })
  },
  getExperimentById(experimentId){
    return request({
      url: `${api_name}/detailed/${experimentId}`,
      method: 'get'
    })
  },
  updateExperimentById(eduExperiment){
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: eduExperiment
    })
  },
  getExperiment(id){
    return request({
      url: `${api_name}/getEx/${id}`,
      method: 'get'
    })
  },
  getExperimentScore(page,limit,name){
    return request({
      url: `${api_name}/page/${page}/${limit}`,
      method: 'get',
      params:{name}
    })
  }
}
