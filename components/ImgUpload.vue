<template>
    <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone>
</template>

<script>
    import Dropzone from 'nuxt-dropzone'
    export default {
        components: {
            Dropzone
        },
        data() {
            return {
                options: {
                    url: "http://httpbin.org/anything"
                }
            }
        }
    }
</script>