import Compressor from 'compressorjs'

export function compressImage (image) {
    let quality = 0.4
    if(image.size > 1000000) {
        quality = 0.2
    }
    return new Promise((resolve, reject)=>{
        new Compressor(image, {
            quality: quality,
            convertSize: 1000000,
            checkOrientation: false,
            success(result) {
                resolve(result)
            },
            error(e) {
                console.log(e.message)
                reject(e)
            },
        });
    })
}

export const lessThan = (inputValue) => (value) => {
    return value < inputValue ? true : false
}

export const isImage = (value) => {
    if(Array.isArray(value)) {
        for(let file of value) {
            if(!checkImage(file)) return false
        }
    }else if(value) {
        const file = value
        if(!checkImage(file)) return false
    }
    return true
}

const checkImage = (file) => {
    const acceptedFiles = ['.png', '.PNG', '.jpeg', '.JPEG', '.jpg', '.JPG']
    const ext = file.name.slice(file.name.lastIndexOf('.'))
    if(!acceptedFiles.includes(ext)) return false
    return true
}

// export const isImage = (maxFileSize) => (value) => {
//     if(Array.isArray(value)) {
//         for(let file of value) {
//             if(!checkImage(file, maxFileSize)) return false
//         }
//     }else if(value) {
//         const file = value
//         if(!checkImage(file, maxFileSize)) return false
//     }
//     return true
// }

// const checkImage = (file, maxFileSize) => {
//     const acceptedFiles = ['.png', '.PNG', '.jpeg', '.JPEG', '.jpg', '.JPG']
//     const ext = file.name.slice(file.name.lastIndexOf('.'))
//     if(!acceptedFiles.includes(ext)) return false
//     if(file.size > maxFileSize) return false
//     return true
// }

// universally unique identifier
export function genId(length) {
    let uiid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    for (let i = 0; i < length; i++){
        uiid += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    const minutesNow = Math.floor(Date.now() / (1000*60))
    return minutesNow + uiid
}

// universally unique identifier
export function genId_(length) {
    let uiid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    for (let i = 0; i < length; i++){
        uiid += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    const secondsNow = Math.floor(Date.now() / 1000)
    return secondsNow + uiid
}


// export function _genId(title, length) {
//     let uuid = "";
//     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

//     for (let i = 0; i < length; i++){
//         uuid += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return title.replace(/\s+/g, '-').toLowerCase() + '-' + uuid
// }

export function genUrl(title, uuid) {
    if(uuid) {
        return title.replace(/\s+|[,\/?]/g, '-').toLowerCase() + '-' + uuid
    }else {
        return title.replace(/\s+|[,\/?]/g, '-').toLowerCase()
    }
}

export function fetchId(url) {
    return url.split('-').pop()
}

// TODO:
export function fetchTitle(url) {
    url.split('-').pop()
    return url.join('')
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
            message = 'Có lỗi xảy ra'
    }
    return message
}