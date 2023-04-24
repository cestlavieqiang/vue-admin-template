import request from '@/utils/request'

export function getprojectList(params) {
  return request({
    url: '/vue-admin-template/project/list',
    method: 'get',
    params
  })
}


export function createProject(data) {
  return request({
    url: '/vue-element-admin/project/create',
    method: 'post',
    data
  })
}

export function updateProject(data) {
  return request({
    url: '/vue-element-admin/project/update',
    method: 'post',
    data
  })
}

export function deleteProject(data) {
  return request({
    url: '/vue-element-admin/project/delete',
    method: 'post',
    data
  })
}
