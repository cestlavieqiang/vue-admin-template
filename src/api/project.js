import request from '@/utils/request'

export function getprojectList(params) {
  return request({
    url: '/vue-admin-template/project/list',
    method: 'get',
    params
  })
}

export function delproject(params) {
  return request({
    url: '/vue-admin-template/project/delproj',
    method: 'get',
    params
  })
}
