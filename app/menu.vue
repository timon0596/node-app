<template>
	<div class="assorted container">
		<div class="dg gg-1">
				<menuItem  v-on:dbtoupdate="updateProduct($event)" v-for="(product,id) in products" :product="product" :id="id" :itemsToShow="itemsToShow" :key="product.id"></menuItem>
		</div>
	</div>
</template>
<script>
	import menu_item from './menu_item.vue'
	export default {
		data() {
			return {
				products: []
			}
		},
		mounted(){
			this.getProducts()
		},
		methods:{
			getProducts(){
				$.get('/getProducts',(d)=>{
					this.products = [...JSON.parse(d)].reverse()
				})
			},
			async updateProduct(e){
				await $.post('/update',JSON.stringify(e))
					.done(function( data ) {
						console.log(data)
    				})
    			this.getProducts()
			}
		},
		components: {
			menuItem: menu_item 
		},
		props: ['itemsToShow']
	}
</script>
<style>
	
</style>