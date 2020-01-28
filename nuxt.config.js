const pkg = require('./package')
const logger = require('connect-logger')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	mode: 'universal',

	/*
	** Headers of the page
	*/
	head: {
		title: 'Xóm Chợ | Chợ bán hàng Online',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
			{ 
				hid:  'description', 
				name: 'description', 
				content: 'Chợ bán hàng Online - Trang tạo cửa hàng bán hàng Online - Công cụ hỗ trợ bán hàng Online'
			},
			{ hid: 'fb-admins', property: 'fb:admins', content: '1820968286' },
			{ hid: 'fb-app_id', property: 'fb:app_id', content: '359102328229283' },
			{ hid: 'og-url', property: 'og:url', content: `${process.env.baseUrl}` },
			{ hid: 'og-title', property: 'og:title', content: 'Xóm Chợ - Chợ bán hàng Online' },
			{ hid: 'og-description', property: 'og:description', content: 'Chợ bán hàng Online - Trang tạo cửa hàng bán hàng Online - Công cụ hỗ trợ bán hàng Online' },
			{ hid: 'og-image', property: 'og:image', content: `${process.env.BASE_URL}/fb-cover-min.png`}
		],
		script: [
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=1' },
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
        {src: '~plugins/plugin-vuelidate.js'},
		{src: '~plugins/plugin-lazyload.js', ssr: false},
		{src: '~plugins/plugin-carousel.js', ssr: false},
        {src: '~plugins/plugin-filter.js'},

		{src: '~plugins/util-authListener.js'},

		{src: '~plugins/addon-fc.js', ssr: false}
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
            id: 'UA-131484797-1'
        }]
    ],
    
	/*
	** Global env setting
	*/
	env: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000'
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
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true // set to true if you want JS source maps
				}),
				new OptimizeCssAssetsPlugin({})
			],
			splitChunks: {
				cacheGroups: {
					styles: {
						name: 'styles',
						test: /\.(vue)$/,
						chunks: 'all',
						enforce: true
					}
				}
			}
		},
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

	//dev: (process.env.NODE_ENV !== 'production'),

	serverMiddleware: [logger({ format: "%date %status %method %url (%time)" })]
}
