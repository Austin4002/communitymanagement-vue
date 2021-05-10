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


export function proprieterEventList(current, size) {
    return request({
        url: '/proprieterGetEventList',
        method: 'GET',
        params: {
            current,
            size
        }
    })
}

export function getEventInfoById(eventId) {
    return request({
        url: '/getEventInfoById',
        method: 'GET',
        params: {
            eventId
        }
    })
}


export function changeEventStatus(eventId,status) {
    return request({
        url: '/changeEventStatus',
        method: 'PUT',
        data: {
            id:eventId,
            status:status
        }
    })
}


export function proprieterJoinInEvent(stuNo,eventId) {
    return request({
        url: '/proprieterJoinInEvent',
        method: 'GET',
        params: {
            stuNo,
            eventId
        }
    })
}




export function studentEventList(stuNo) {
    return request({
        url: '/studentGetEventList',
        method: 'GET',
        params: {
            stuNo
        }
    })
}


export function studentSignInEvent(stuNo,eventId) {
    return request({
        url: '/studentSignInEvent',
        method: 'POST',
        data: {
            userNo:stuNo,
            eventId:eventId
        }
    })
}
