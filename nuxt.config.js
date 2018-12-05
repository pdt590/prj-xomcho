const pkg = require('./package')
const logger = require('connect-logger')

module.exports = {
	mode: 'universal',

	/*
	** Headers of the page
	*/
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		script: [
			{ src: 'https://connect.facebook.net/vi_VN/all.js' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
			{ rel: 'stylesheet', href: '//cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css' }
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#DC143C', height: '5px', duration: 5000 },

	/*
	** Global CSS
	*/
	css: [
		'~assets/bulma_minty.scss'
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~plugins/components.js',

		'~plugins/plugin-firebase.js',
		'~plugins/plugin-buefy.js',
		'~plugins/plugin-vuelidate.js',

		'~plugins/filter-date.js',
		'~plugins/filter-facebook.js',
        '~plugins/filter-string.js',
		'~plugins/filter-bytes.js',
		'~plugins/filter-price.js',

		'~plugins/utility-auth-listener.js',

		'~plugins/addon-fc.js'
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		//['nuxt-buefy', { css: false, materialDesignIcons: true }],
		['@nuxtjs/component-cache', {
			max: 10000,
			maxAge: 1000 * 60 * 60
		}],
	],

	/*
	** Global env setting
	*/
	env: {

	},

	/*
	** Add middleware for all routes
	*/
	// router: {
	//   middleware: ['check-auth', 'auth']
	// },

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {

		}
	},

	serverMiddleware: [logger({ format: "%date %status %method %url (%time)" })]
}
