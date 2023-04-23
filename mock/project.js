const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    department: '@sentence(1, 2)',
    project: '@sentence(1, 2)',
    updateTime: '@datetime',
    terminal: '@sentence(1, 1)',
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/project/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
