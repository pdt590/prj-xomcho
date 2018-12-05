// TODO:
export const cleanObject = payload => {
    Object.keys(payload).forEach( key =>  {
        if(Array.isArray(payload[key]) && !payload[key].length ) delete payload[key]
        if(typeof payload[key] === 'object' && Object.keys(payload[key]).length === 0) delete payload[key]
        if(payload[key] === "") delete payload[key]
        if(!payload[key]) delete payload[key]
    })
}

// https://monterail.github.io/vuelidate/#sub-simplest-example
export const isImage = (maxFileSize) => (value) => {
    if(Array.isArray(value)) {
        for(let file of value) {
            if(!checkImage(file, maxFileSize)) return false
        }
    }else if(value) {
        const file = value
        if(!checkImage(file, maxFileSize)) return false
    }
    return true
}

const checkImage = (file, maxFileSize) => {
    const acceptedFiles = ['.png', '.PNG', '.jpeg', '.JPEG', '.jpg', '.JPG']
    const ext = file.name.slice(file.name.lastIndexOf('.'))
    if(!acceptedFiles.includes(ext)) return false
    if(file.size > maxFileSize) return false
    return true
}

// universally unique identifier
export function genId(length) {
    let uiid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++){
        uiid += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    
    return uiid
}

/*
export function _genId(title, length) {
    let uuid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++){
        uuid += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    
    return title.replace(/\s+/g, '-').toLowerCase() + '-' + uuid
}*/

export function genUrl(title, uuid) {
    return title.replace(/\s+/g, '-').toLowerCase() + '-' + uuid
}

export function fetchId(url) {
    return url.split("-").pop();
}

export function fetchKey(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}

export function deepCopy(arg) {
    return JSON.parse(JSON.stringify(arg))
}

export function authMessage(arg) {
    if(arg.message.includes('The email address is already in use')) {
        return 'InvalEmail'
    }else if(arg.message.includes('There is no user record')) {
        return 'WrongUser'
    }else if(arg.message.includes('The password is invalid')) {
        return 'WrongPass'
    }
}