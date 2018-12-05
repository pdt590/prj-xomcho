import Vue from 'vue'

const priceFilter = value => {
    return formatPrice(value);
};

function formatPrice(value) {
    let len = value.length
    let newValue = ''
    let count = len/3
    let group = []
    if (count >= 1 && count%3) {
        for(let i=1; i <= count; i++ ) {
            group.push(value.slice( 3*(i-1), 3*i ))
        }
        for( let i of group) {
            newValue = newValue + i + ','
        }
    }
    return newValue !== '' ? newValue.slice(0, -1) : value
}

Vue.filter('fmPrice', priceFilter)