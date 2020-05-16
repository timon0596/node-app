<template>
	<div class="card col-4">
		<img class="card-img-top" :src="img_path" alt="Card image cap">
		<div class="card-body d-flex flex-wrap">
			<h5 class="card-title">{{product.name}}</h5>
			<p class="card-text w-100">{{product.composition}}</p>
			<div class="d-flex justify-content-between align-self-end w-100 align-items-center">
				<div class="btn btn-primary" v-show="!!amount" @click="--amount;basket()">убрать</div>
				<div class="btn btn-warning" v-show="!!amount" @click="amount=0;basket()">{{amount}}</div>
				<div class="btn btn-primary" @click="++amount;basket()">выбрать</div>
				<p class="card-text wmin"><small class="text-muted">id{{product.id}}</small></p>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapGetters,mapMutations} from "vuex"
	export default {
		data() {
			return {
				amount: 0
			}
		},
		props: ["product"],
		methods:{
			async basket(){
				this.$emit("basket",{amount: this.amount,id: this.id})
				await this.basket_commit({...this.get_products.where_id(this.id),amount: this.amount})
				localStorage.setItem('basket',JSON.stringify(this.get_basket))
				console.log(this.get_basket)
				console.log(localStorage.getItem('basket'))
				

			},
			...mapActions(['products_from_db','basket_commit']),
			...mapMutations(['basket_initial']),

		},
		computed:{
			img_path(){
				return "imgs/"+this.product.image
			},
			id(){
				return this.product.id
			},
			...mapGetters(['get_products','get_basket']),
			prod_amount(){
				return this.product.amount
			}
		},
		updated(){
			
		},
		created(){
			try {
				let bskt = JSON.parse(localStorage.getItem('basket'))
				this.amount = bskt[this.id].amount || this.product.amount || 0
			} catch(e) {
				console.log(e);
			}

			
		}
	}
</script>
<style>

</style>