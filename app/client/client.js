import 'jquery'
import 'bootstrap'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import vuerouter from 'vue-router'
import main from './client.vue/client.main.vue'
import home from './client.vue/home.vue'
import basket from './client.vue/client.basket.vue'
import admin from './../app.vue'
require.context("./../../imgs",false,/\.(jpe?g|png)$/i)
Vue.use(Vuex)
import {mapActions,mapGetters,mapMutations} from "vuex"
import {indexedArray,Basket} from './../../utility/utility.js'
const indArr = indexedArray()
const store = new Vuex.Store({
  state: {
  	products: null,
  	basket: Basket({})
  },
  mutations: {
  	products_to_state(state,prod){
  		state.products=new indArr(prod)
  	},
  	async add_to_basket(state,prod){
  		state.basket[prod.id]=prod
  	},
  	basket_initial(state,basket){
  		state.basket=Basket(basket)
  	}
  },
  actions: {
  	products_from_db({commit}){
  		return axios.get("/getProducts")
  			.then((prod)=>{ commit("products_to_state",prod.data)
  				return prod
  			})
  			.catch((er)=>{console.log(er)})
  	},
  	async basket_commit({commit},prod){
  		commit("add_to_basket",prod)

  	}
  },
  getters: {
  	get_products(state){
  		return state.products
  	},
  	get_basket(state){
  		return state.basket
  	}
  }	
})

Vue.use(vuerouter)
let router = new vuerouter({
	routes:[
		{path: '/basket', component: basket},
		{path: '/', component: home},
		{path: '/admin', component: admin},
	],
	linkExactActiveClass: 'active'
})
new Vue({
	el: '#client_main_div',
	render: h=>h(main),
	data: {
	},
	router,
	store,
	created(){
		this.products_from_db()
		console.log(localStorage.getItem('basket'))
		if(localStorage.getItem('basket')){
			this.basket_initial(JSON.parse(localStorage.getItem('basket')))
		}
	},
	methods:{
		...mapActions(['products_from_db','basket_commit']),
		...mapMutations(['basket_initial']),
	}


})