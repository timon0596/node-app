<template>
	<div class="container">
		<div class="row justify-content-between">
			<card @basket="onBasketEvent($event)"  v-for="product in get_products" :product="product" :key="product.id"></card>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapGetters,mapMutations} from "vuex"
	
	import card from "./client.card.vue"
	export default {
		data() {
			return {
				
			}
		},
		components: {
			card
		},
		
		computed:{
			...mapGetters(['get_products','get_basket'])
		},
		methods:{
			...mapActions(['products_from_db','basket_commit']),
			...mapMutations(['basket_initial']),
			async onBasketEvent(e){
				
				
			},

		}
	}
</script>
<style>
	
</style>