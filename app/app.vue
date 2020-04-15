<template>
	<div class="main">
		
		<form class="container" enctype="multipart/form-data" id="form111">
			<div class="row">
				<div class="col-6 dg gg-1">
					<div class="title">{{title}}</div>
					<input type="text" placeholder="название" class="w-100 name" name="name">
					<textarea  class="w-100" name="composition" id="composition" cols="30" rows="10" placeholder="состав"></textarea>
					<div class="row justify-content-around">
						<label for="image2" class="col-5 btn btn-success" role="button" id="image_choose2">выбрать</label>
						<input type="file" v-show="false" id="image2" name="image2">
						<div class="hmin col-5" id="send_image2">изображение</div>
					</div>
					<div class="row justify-content-around">
						<div class="btn btn-success col-5" role="button">очистить</div>
						<div class="btn btn-success col-5" role="button" @click="postNewProduct">добавить</div>
					</div>
				</div>
			</div>
		</form>
		<productsList ref="productlist" :itemsToShow="itemsToShow" :products="products" class="mv-2"></productsList>
		<div ref="loader" style="height: 10px;"></div>		
	</div>
</template>
<script>
	const axios = require('axios') 
	import menu from './menu.vue'
	import mpart from './multipartForm.vue'
	export default {
		data() {
			return {
				title: 'new good',
				itemsToShow: 0,
				observer: null,
				mobserver: null,
				products: []

			}
		},
		methods:{

			getProducts(){
				$.get('/getProducts',(d)=>{
					this.products = [...JSON.parse(d)].reverse()
					console.log(this.products)
				})
			},
			postNewProduct(){
				let _this=this
				let fd = new FormData($("#form111")[0])
				axios.post('/newProduct',fd,{headers: {
					'Content-Type': 'multipart/form-data'
				}}).then((d)=>{
					console.log(d)
					_this.getProducts()
				})
			},
			sendImage(){
				let filereader = new FileReader()
				let file = $('#image')[0].files[0];
				let imgData={
					name: file.name,
					size: file.size
				}
				console.log(imgData)
				filereader.onload = (e)=>{
					file = e.target.result
					$.post('/image',file).done((d)=>{console.log(d)})
					$.post('/image',JSON.stringify(imgData)).done((d)=>{console.log(d)})
				}
				filereader.readAsDataURL(file);

				
			}
		},
		components: {
			productsList: menu,
			multipart: mpart
		},
		mounted() {
			this.getProducts(),
			$("#image").change((e)=>{console.log(e.target.files[0])})
				const _this=this
				this.mobserver = new MutationObserver(mutations => {

					if($('html')[0].scrollHeight<=window.innerHeight){
						++_this.itemsToShow
					}else{
						_this.mobserver.disconnect()
					}
				})
				this.mobserver.observe(this.$refs.productlist.$el,
					{
						childList: true,
						subtree: true
					})
			const options = {
								root: null,
								rootMargin: '0px',
								threshold: 1.0
							}
			this.observer = new IntersectionObserver((entries,observer) => {
				_this.$emit('intersecting',_this.itemsToShow)
				entries.forEach((entry)=>{
					if(entry.isIntersecting|| this.$refs.loader.getBoundingClientRect().top<window.innerHeight) {
						++this.itemsToShow
						
					}

				})
				
			}, options);
			this.observer.observe(this.$refs.loader)
				
		},
		

	}
</script>
<style>
	
</style>