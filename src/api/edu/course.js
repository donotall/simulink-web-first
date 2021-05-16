import request from '@/utils/request'

const api_name = '/manageservice/educourse'

export default {
  getCoursePage(page,limit,searchObj) {
    return request({
      url: `${api_name}/client/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id){
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  addcourse(eduCourse){
    return request({
      url: `${api_name}`,
      method: 'post',
      data: eduCourse
    })
  },
  getCourseById(id){
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  updateCourseById(eduCourse){
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: eduCourse
    })
  },
  getTeacherCourse(){
    return request({
      url: `${api_name}/teachercourse`,
      method: 'get'
    })
  }
}
