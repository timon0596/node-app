<template>
	<div class="card col-4">
		<img class="card-img-top" :src="img_path" alt="Card image cap">
		<div class="card-body d-flex flex-wrap">
			<h5 class="card-title">{{product.name}}</h5>
			<p class="card-text w-100">{{product.composition}}</p>
			<div class="d-flex justify-content-between align-self-end w-100 align-items-center">
				<div class="btn btn-primary" v-show="!!amount" @click="amount--">убрать</div>
				<div class="btn btn-warning" v-show="!!amount" @click="amount=0">{{amount}}</div>
				<div class="btn btn-primary" @click="amount++">выбрать</div>
				<p class="card-text wmin"><small class="text-muted">id{{product.id}}</small></p>
			</div>
		</div>
	</div>
</template>
<script>
	
	export default {
		data() {
			return {
				amount: 0
			}
		},
		props: ["product"],
		methods:{
			basket(id){
				

			}
		},
		computed:{
			img_path(){
				return "imgs/"+this.product.image
			},
			id(){
				return this.product.id
			}
		},
		updated(){
			this.$emit("basket",{amount: this.amount,id: this.id})
		}
	}
</script>
<style>

</style>