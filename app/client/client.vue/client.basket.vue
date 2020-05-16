<template>
	<div class="basket">
		<card @basket="rerender" v-for="prod in get_basket" :product="prod" :key="prod.id" class="aaaaaa"></card>
	</div>
</template>
<script>
	import card from "./client.card.vue"
	import {mapActions,mapGetters} from "vuex"
	export default {
		name: 'basket',
		data(){
			return{

			}
		},
		computed:{
			...mapGetters(['get_products','get_basket']),
			
		},
		components:{
			card,
		},
		methods:{
			rerender(){
				this.$forceUpdate()
			}
		}
	}
</script>
<style>
	
</style>
