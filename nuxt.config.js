const pkg = require('./package')

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
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito'},
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'}
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#000000', height: '4px', duration: 5000 },

	/*
	** Global CSS
	*/
	css: [
    	"~/assets/css/main.css"
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{ src: '~plugins/components.js'},
		{ src: '~plugins/date-filter.js'},
		{ src: '~plugins/firebase.js'},
		{ src: '~plugins/firebase-auth.js'}
	],

	/*
	** Nuxt.js modules
	*/
	modules: [

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
	}
}
