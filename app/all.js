import 'jquery'
import 'bootstrap'
import Vue from 'vue'
import app from './app.vue'
require.context("./../imgs",false,/\.(jpe?g|png)$/i)
new Vue({
	el: '.form',
	render: h=>h(app),

	data: {
		products: []
	}

})

