import {request} from "@/network/request";

export function roleList(current,size){
    return request({
        url:'/roleList',
        params:{
            current,
            size
        }
    })
}

export function getRoleById(id){
    return request({
        url:'/role/'+ id
    })
}



export function updateRoleById(role){
    return request({
        method:'PUT',
        url:'/role',
        data: {
            id:role.id,
            // name:role.name,
            description:role.description
        }
    })
}

export function addRole(role){
    return request({
        url:'/role',
        method:'POST',
        data: {
            name:role.name,
            description:role.description
        }
    })
}

export function deleteRoleById(id){
    return request({
        url:'/role/' + id,
        method:'DELETE'
    })
}


export function changeUserRole(no,roleIds){
    return request({
        url:'/changeRole',
        method:'POST',
        data:{
            no:no,
            roleIds:roleIds
        }
    })
}
