<template>
    <div>
        <img v-lazy="isActive ? `` : `/favicon.png`" style='display: none' onload="this.style.display = 'block'" alt="item_image">
    </div>
</template>

<script>
    export default {
        layout: 'test',
        data() {
            return {
                isActive: false
            }
        }
    }
</script>