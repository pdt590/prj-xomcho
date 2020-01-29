import Vue from 'vue'

Vue.prototype.$initFbSDK = () => {
	window.fbAsyncInit = () => {
		FB.init({
			appId: '359102328229283',
			autoLogAppEvents: true,
			xfbml: true,
			version: 'v3.1'
		})
	}
	setTimeout(() => {
		FB.XFBML.parse();
	}, 2000);
}

export default ({ app }) => {
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = 'https://connect.facebook.net/vi_VN/sdk.js';
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}