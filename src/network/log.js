import {request} from "@/network/request";

export function logList(current,size){
    return request({
        url:'/logList',
        method: 'GET',
        params:{
            current,
            size
        }
    })
}
