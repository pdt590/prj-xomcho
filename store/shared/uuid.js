export default function (length){
    let uuid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++){
        uuid += possible.charAt(Math.floor(Math.random() * possible.length))
    }    
    return uuid;
}