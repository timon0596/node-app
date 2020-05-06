<template>
	<div class="container">
		<div class="row justify-content-between">
			<card @basket="onBasketEvent($event)"  v-for="product in products" :product="product" :key="product.id"></card>
		</div>
	</div>
</template>
<script>
	const indexedArray = new Proxy(Array,{
		construct(target,[args]){
			const index = {}
			args.forEach((el)=>{
				index[el.id]=el
			})
			return new Proxy(new target(...args),{
				get(arr,prop){
					switch(prop){
						case "push": return item => {
							index[item.id]=item
							arr[prop](item)
						}
						case "where_id": return id => index[id]
						default: return arr[prop]
					}
				}
			})
		}
	})
	const Basket = obj=>new Proxy(obj,{
		set(target,prop,val){
			if(prop in target && val.amount==0){
				console.log(`${target[prop].name} has been deleted from basket`)
				delete target[prop]
				return true
			}
				target[prop]=val
				console.log(`${target[prop].name} has benn added to the basket`)
				return true
		},
		get(target,prop){
			if(prop==="length") return Object.keys(target).length
			return target[prop]
		}
	})
	import card from "./client.card.vue"
	export default {
		data() {
			return {
				products: null,
				basket: {},
			}
		},
		components: {
			card
		},
		created(){
			$.get("/getProducts",(d)=>{
				this.products = new indexedArray(JSON.parse(d))
			})

			this.basket=Basket(this.basket)

		},
		methods:{
			onBasketEvent(e){
				this.basket[e.id]={...this.products.where_id(e.id),...e}
				console.log(this.basket.length)
			}
		}
	}
</script>
<style>
	
</style>