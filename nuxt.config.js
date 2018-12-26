const pkg = require('./package')
const logger = require('connect-logger')

module.exports = {
	mode: 'universal',

	/*
	** Headers of the page
	*/
	head: {
		title: 'Xóm Chợ | Xóm bán hàng Online',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		script: [
			{ src: 'https://connect.facebook.net/vi_VN/all.js' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: '//cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css' }
		]
	},

	/*
	** Customize the progress-bar color
	*/
    //loading: { color: '#DC143C', height: '5px', duration: 5000 },
    loading: '~/components/Loading.vue',

	/*
	** Global CSS
	*/
	css: [
		'~assets/styles/bulma.scss'
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		//'~plugins/test.js',
		{src: '~plugins/components.js'},

		{src: '~plugins/plugin-firebase.js'},
		{src: '~plugins/plugin-buefy.js'},
        {src: '~plugins/plugin-vuelidate.js', ssr: false},
		{src: '~plugins/plugin-lazyload.js', ssr: false},
		{src: '~plugins/plugin-carousel.js', ssr: false},
        {src: '~plugins/plugin-filter.js'},

		{src: '~plugins/util-authListener.js'},

		{src: '~plugins/addon-fc.js'}
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		['@nuxtjs/component-cache', {
			max: 10000,
			maxAge: 31536000
        }],
        ['@nuxtjs/google-analytics', {
            id: 'UA-12301-2'
        }]
    ],
    
	/*
	** Global env setting
	*/
	env: {
		//baseUrl: process.env.BASE_URL || 'http://localhost:3000'
	},

	/*
	** Add middleware for all routes
	*/
	router: {
	    //middleware: ['check-auth', 'auth']
	},

	/*
	** Build configuration
	*/
	build: {
		//publicPath: '/',
		extractCSS: true,
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {

		}
    },

    render: {
        resourceHints: false,
        static: {
            maxAge: 31536000
        },
        dist: {
            maxAge: '1y',
            index: false
        }
    },

	serverMiddleware: [logger({ format: "%date %status %method %url (%time)" })]
}
