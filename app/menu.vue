<template>
	<div class="assorted container">
		<div class="dg gg-1">
				<menuItem v-on:dbtoupdate="newEmit($event)" @post-to-delete="deletion($event)" v-for="(product,id) in products" :product="product" :id="id" :itemsToShow="itemsToShow" :key="product.id"></menuItem>
		</div>
	</div>
</template>
<script>
	import menu_item from './menu_item.vue'
	export default {
		data() {
			return {
				
			}
		},
		mounted(){
			
		},
		methods:{
			newEmit(e){
				this.$emit("dbtoupdate",{...e})
			},
			deletion(e){
				this.$emit("post-to-delete",{...e})	
			}
			
		},
		components: {
			menuItem: menu_item 
		},
		props: ['itemsToShow','products']
	}
</script>
<style>
	
</style>