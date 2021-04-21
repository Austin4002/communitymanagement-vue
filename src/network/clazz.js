import {request} from "@/network/request";

export function classList(current,size){
    return request({
        url:'/classList',
        method: 'GET',
        params:{
            current,
            size
        }
    })
}


export function getClassById(id){
    return request({
        url: '/class/' + id ,
        method: 'GET'
    })
}


export function updateClassById(clazz){
    return request({
        method:'PUT',
        url:'/class',
        data: {
            id:clazz.id,
            name:clazz.name,
        }
    })
}


export function addClass(clazz){
    return request({
        url:'/class',
        method:'POST',
        data: {
            name:clazz.name
        }
    })
}

export function deleteClassById(id){
    return request({
        url:'/class/' + id,
        method:'DELETE'
    })
}
