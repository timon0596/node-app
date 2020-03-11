import 'jquery'
import 'bootstrap'
import Vue from 'vue'
import app from './app.vue'
new Vue({
	el: '.form',
	render: h=>h(app)
})
console.log(Vue)
