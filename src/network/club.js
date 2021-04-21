import {request} from "@/network/request";

export function clubList(current,size){
    return request({
        url:'/clubList',
        method: 'GET',
        params:{
            current,
            size
        }
    })
}


export function getClubById(id){
    return request({
        url: '/club/' + id ,
        method: 'GET'
    })
}


export function updateClubById(club){
    return request({
        method:'PUT',
        url:'/club',
        data: {
            id:club.id,
            name:club.name,
        }
    })
}


export function addClub(club){
    return request({
        url:'/club',
        method:'POST',
        data: {
            name:club.name,
            description:club.description,
            starLevel:0
        }
    })
}

export function deleteClubById(id){
    return request({
        url:'/club/' + id,
        method:'DELETE'
    })
}
