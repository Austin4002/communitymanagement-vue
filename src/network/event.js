import {request} from "@/network/request";

export function adminAddEvent(event) {
    return request({
        url: '/addEvent',
        method: 'POST',
        data: {
            name: event.name,
            place: event.place,
            type1: event.type1,
            type2: event.type2,
            startAndEndTime: event.startAndEndTime,
            clubIds: event.value
        }
    })
}

export function eventList(current, size) {
    return request({
        url: '/eventList',
        method: 'GET',
        params: {
            current,
            size
        }
    })
}


export function proprieterAddEvent(event,clubId) {
    return request({
        url: '/proprieterAddEvent',
        method: 'POST',
        data: {
            name: event.name,
            place: event.place,
            type1: event.type1,
            type2: event.type2,
            startAndEndTime: event.startAndEndTime,
            clubId:clubId
        }
    })
}
