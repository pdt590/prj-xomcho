import Vue from 'vue'

const fbFilter = value => {
    return formatFb(value);
};

function formatFb(inputLink) {
    const n = inputLink.split("/")
    return n[n.length-1]
}

Vue.filter('fmFacebook', fbFilter)