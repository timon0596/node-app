import 'jquery'
import 'bootstrap'
import Vue from 'vue'
import vuerouter from 'vue-router'
import main from './client.vue/client.main.vue'
import home from './client.vue/home.vue'
import basket from './client.vue/client.basket.vue'
import admin from './../app.vue'
require.context("./../../imgs",false,/\.(jpe?g|png)$/i)

Vue.use(vuerouter)
let router = new vuerouter({
	routes:[
		{path: '/basket', component: basket},
		{path: '/', component: home},
		{path: '/admin', component: admin},
	]
})
new Vue({
	el: '#client_main_div',
	render: h=>h(main),
	data: {
	},
	router,	

})