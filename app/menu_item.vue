<template>
	<div v-if="id<itemsToShow" class="card" style="width:400px">
	  <img class="card-img-top" src="" alt="Card image">
	  <div v-show="!isRedacting" class="card-body">
	    <h4 ref="name" class="card-title">{{product.name}}</h4>
	    <p ref="composition" class="card-text">{{product.composition}}</p>
	    <div class="btn btn-primary" role="button" @click="redact">редактировать</div>
	  </div>
	  <div v-show="isRedacting" class="card-body">
	    <h4 class="card-title"><input type="text" v-model:value="productName"></h4>
	    <textarea v-model="productComposition" class="card-text" :style="{height:textAreaHeight+'px'}"></textarea>
	    <p>{{productComposition}}</p>
	    <div class="btn btn-primary" role="button" @click="redact">редактировать</div>
	    <div class="btn btn-primary" role="button" @click="save">сохранить</div>
	    <div ref="id" class="productId" v-show="false">{{product.id}}</div>
	  </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				productName: '',
				productComposition: '',
				productId: null,
				isRedacting: false,
				beforeRedacting: true,
				textAreaHeight: 0
			}
		},
		props: ['product','id','itemsToShow'],
		methods: {
			redact() {
				this.$emit('redacting')	
				this.beforeRedacting?
				(()=>{
					this.productName=$(this.$refs.name).text()
					this.productComposition=$(this.$refs.composition).text()
					this.productId=$(this.$refs.id).text()
					this.beforeRedacting=!this.beforeRedacting
				})():null


			},
			save(){
					this.$emit('DBtoUpdate',{name: this.productName,composition: this.productComposition,id: this.productId})
				
			}
		},
		mounted(){
			this.$on('DBtoUpdate',(d)=>{
				console.log(d)
			})
			this.$on('redacting',()=>{
				this.textAreaHeight = $(this.$el).find('.card-text')[0].offsetHeight
				this.isRedacting=!this.isRedacting
			})
		}
	}
</script>
<style>
	textarea{
		width: 100%;
	}
	*{
		white-space: pre-line;
	}

</style>
