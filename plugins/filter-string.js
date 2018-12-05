import Vue from 'vue'

const strFilter = value => {
    return formatString(value);
};

function formatString(inputString) {
    if(inputString.length > 10) {
        return inputString.substring(0, 10) + ` ...`
    }else {
        return inputString
    }
}

Vue.filter('fmString', strFilter)