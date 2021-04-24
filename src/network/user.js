import {request} from "@/network/request";

export function login(no,password){
  return request({
    url:'/login',
    method:'POST',
    data:{
      no:no,
      password:password
    }
  })
}

export function menuList(role){
  return request({
    url: '/menu',
    method: 'GET',
    params: {
      role
    }
  })
}

export function userList(current,size){
  return request({
    url:'/userList',
    params:{
      current,
      size
    }
  })
}

export function getUserInfo(no){
  return request({
    url: '/user/' + no,
    method: 'GET'
  })
}

export function updateUserInfo(user){
  return request({
    url:'/updateUser',
    method:'PUT',
    data:{
      no:user.no,
      password:user.password,
      phone:user.phone
    }

  })
}




