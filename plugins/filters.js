import Vue from 'vue'

// bytes
const bytesFilter = value => {
    return formatBytes(value, 2);
};

function formatBytes(bytes, decimals) {
    if(bytes == 0) return '0 Bytes';
    let k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// date
/*
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
*/
const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
];

const dateFilter = value => {
    return formatDate(value);
};

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const formattedDate = day + ". " + months[month] + ". " + year;
    return formattedDate;
}

// facebook
const fbFilter = value => {
    return formatFb(value);
};

function formatFb(inputLink) {
    return inputLink.replace('https://www.facebook.com/','');
}

// price
const priceFilter = value => {
    return formatPrice(value);
};

function formatPrice(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// string
const strFilter = (value, length) => {
    return formatString(value, length);
};

function formatString(string, length) {
    let short = string.substr(0, length);
    if (/^\S/.test(string.substr(length))) {
        if(length < string.length) {
            return short.replace(/\s+\S*$/, "") + '...'
        } else {
            return short.replace(/\s+\S*$/, "")
        }
    }
    return ((length < string.length) ? short + '...' : short)
}

/** main */
Vue.filter('fmBytes', bytesFilter)
Vue.filter('fmDate', dateFilter)
Vue.filter('fmFacebook', fbFilter)
Vue.filter('fmPrice', priceFilter)
Vue.filter('fmString', strFilter)