export const lessThan = (inputValue) => (value) => {
    return value < inputValue ? true : false
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
    const minutesNow = Math.floor(Date.now() / (1000*60))
    return minutesNow + uiid
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
    if(uuid) {
        return title.replace(/\s+/g, '-').toLowerCase() + '-' + uuid
    }else {
        return title.replace(/\s+/g, '-').toLowerCase()
    }
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
    let message = ''
    switch(arg.code) {
        case 'auth/email-already-in-use':
            message = 'Email đã được sử dụng'
            break
        case 'auth/user-not-found':
            message = 'Tài khoản không tồn tại'
            break
        case 'auth/wrong-password':
            message = 'Mật khẩu không chính xác'
            break
        case 'auth/invalid-action-code':
            message = 'Mã xác nhận không hợp lệ'
            break
        default:
            message = arg
    }
    return message
}