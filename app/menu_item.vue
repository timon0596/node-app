<template>
	<div v-if="id<itemsToShow" class="card" style="width:400px">
	  <img class="card-img-top" :src="imgPath" alt="Card image">
	  <div class="" ref="imgpath" v-show="false">{{product.image}}</div>
	  <div v-show="!isRedacting" class="card-body">
	    <h4 ref="name" class="card-title">{{product.name}}</h4>
	    <p ref="composition" class="card-text">{{product.composition}}</p>
	    <div class="btn btn-primary" role="button" @click="redact">редактировать</div>
	  </div>
	  <div v-show="isRedacting" class="card-body">
	  	<input ref="file" type="file">
	    <h4 class="card-title"><input ref="changedName" type="text" v-model:value="productName"></h4>
	    <textarea v-model="productComposition" class="card-text" :style="{height:textAreaHeight+'px'}"></textarea>
	    <p ref="changedComposition">{{productComposition}}</p>
		
	    <div class="container">
	    	<div v-if="!showWarning" class="row justify-content-between">
	    		<div class="btn btn-primary" role="button" @click="redact">редактировать</div>
	    		<div class="btn btn-primary" role="button" @click="save">сохранить</div>
	    		<div class="btn btn-danger" role="button" @click="getSure">удалить</div>
	    	</div>
	    	<div v-if="showWarning" class="row flex-column align-items-center">
	    		<h3 class="border-warning mb-4">Вы уверены?</h3>
				<div class="container">
					<div class="row justify-content-around">
						<div class="btn btn-primary" role="button" @click="getSure">отмена</div>
						<div class="btn btn-danger" role="button" @click="deletePost">удалить</div>
					</div>
				</div>
	    	</div>
	    </div>
	    <div ref="id" class="productId" v-show="false">{{product.id}}</div>
	  </div>
	</div>
</template>
<script>
	const axios = require('axios')
	export default {
		data() {
			return {
				productName: '',
				productComposition: '',
				productId: null,
				isRedacting: false,
				beforeRedacting: true,
				textAreaHeight: 0,
				imgPath: "",
				showWarning: false
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
					let id = this.productId
					let file = this.$refs.file.files[0]
					let reader = new FileReader();

					  reader.readAsDataURL(file);

					  reader.onload = function() {
					  	let res = [...String(reader.result).match(/\/(.+)\;.+\,(.+)/)]
					    axios.post('/img',id+":"+file.name+":"+res[2],{headers: {
					'Content-Type': 'text/plain'
				}}).then((d)=>{
					console.log(d)
				})
					  };
					if(this.productName!=$(this.$refs.name).text() || this.productComposition!=$(this.$refs.composition).text()||!!file){
						this.$emit('dbtoupdate',{name: this.productName,composition: this.productComposition,id: this.productId})

					}
			},
			getSure(){
				this.showWarning = !this.showWarning
			},
			deletePost(){
				
					this.$emit('post-to-delete',{id: this.productId})
			}
		},
		mounted(){
			console.log(this.$options.propsData.product.image)
			this.imgPath = !!this.$options.propsData.product.image?("imgs/"+this.$options.propsData.product.image):""
			this.$on('redacting',()=>{
				this.textAreaHeight = $(this.$el).find('.card-text')[0].offsetHeight
				this.isRedacting=!this.isRedacting
			})
			
		},
		updated(){
			this.imgPath = !!this.$options.propsData.product.image?("imgs/"+this.$options.propsData.product.image):""
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
