import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/work/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}
//vv

