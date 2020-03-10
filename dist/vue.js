import Vue from 'vue'
import app from './app.vue'
import 'bootstrap'
import 'jquery'
import './index.html'
$("#submit").click(()=>{
	$.post('http://localhost:3000/',JSON.stringify({title: $(".title").val(),entries: $(".entries").val()}))
})
new Vue({
	el: '.vue',
	render: h => h(app),

})
console.log(11111111)