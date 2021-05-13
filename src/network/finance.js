import {request} from "@/network/request";

export function financeList(current, size){
    return request({
        url:'/financeList',
        method:'GET',
        params: {
            current,
            size
        }
    })
}


export function clubFianceSetting(club){
    return request({
        url:'/clubFianceSetting',
        method:'PUT',
        data: {
            id:club.id,
            period:club.period,
            financeStartTime:club.financeStartTime,
            money:club.money
        }
    })
}



export function proprieterApplyFinance(stuNo,finance){
    return request({
        url:'/proprieterApplyFinance',
        method:'POST',
        data: {
            stuNo:stuNo,
            purpose:finance.purpose,
            money:finance.money
        }
    })
}



export function proprieterGetFinanceList(no,current,size){
    return request({
        url:'/proprieterGetFinanceList',
        method:'GET',
        params: {
            no,
            current,
            size
        }
    })
}


export function changeFinanceStatus(financeId,status) {
    return request({
        url: '/changeFinanceStatus',
        method: 'PUT',
        data: {
            id:financeId,
            status:status
        }
    })
}
