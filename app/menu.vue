<template>
	<div class="assorted container">
		<div class="dg gg-1">
				<menuItem v-for="(product,id) in products" :product="product" :id="id" :itemsToShow="itemsToShow"></menuItem>
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
		mounted(){$.get('/getProducts',(d)=>{
			this.products = [...JSON.parse(d)]
			
		})


		},
		components: {
			menuItem: menu_item 
		},
		props: ['itemsToShow']
	}
</script>
<style>
	
</style>