<!-- https://github.com/alessiomaffeis/vue-picture-input -->
<template>
    <img-upload id="foo" ref="el" 
        :options="options" 
        :destroyDropzone="true"
        :include-styling="false" />
</template>

<script>
    import ImgUpload from 'nuxt-dropzone'
    export default {
        props: {
            numberImg: {
                type: Number,
                default: 1
            },
            section: {
                type: String
            }
        },
        components: {
            ImgUpload
        },
        computed: {
            imgWidth() {
                if( this.section === 'userAvatar') return 600
                if( this.section === 'shopAvatar') return 600
                if( this.section === 'shopPanel') return 800
                if( this.section === 'itemPreview') return null
            },
            imgHeight() {
                if( this.section === 'userAvatar') return 600
                if( this.section === 'shopAvatar') return 600
                if( this.section === 'shopPanel') return 320
                if( this.section === 'itemPreview') return null
            }
        },
        data() {
            return {
                options: {
                    url: 'https://httpbin.org/post',
                    maxFiles: this.numberImg,
                    resizeWidth: this.imgHeight || null,
                    resizeHeight: this.imgWidth || null,
                    thumbnailWidth: 200,
                    addRemoveLinks: true,
                    dictDefaultMessage: "<i class='fa fa-cloud-upload w3-xxlarge'></i>"
                }
            }
        }
    }
</script>

