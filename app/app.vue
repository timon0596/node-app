<template>
	<div class="main">
		<div class="container">
			<div class="row">
				<div class="col-6">
						<form action="" class="imgForm row justify-content-around">
							<label for="image" class="col-5 btn btn-success" role="button" id="image_choose">выбрать</label>
							<input type="file" v-show="false" id="image">
							<div class="hmin btn btn-success col-5" id="send_image" @click="sendImage">отправить</div>
						</form>
				</div>
			</div>
		</div>
		<form class="container">
			<div class="row">
				<div class="col-6 dg gg-1">
					<div class="title">{{title}}</div>
					
					<input type="text" placeholder="название" class="w-100">
					<textarea  class="w-100" name="composition" id="composition" cols="30" rows="10" placeholder="состав"></textarea>
					<div class="row justify-content-around">
						<div class="btn btn-success col-5" role="button">очистить</div>
						<div class="btn btn-success col-5" role="button" @click="postNewProduct">добавить</div>
					</div>
				</div>
			</div>
		</form>
		<productsList ref="productlist" :itemsToShow="itemsToShow" class="mv-2"></productsList>
		<div ref="loader" style="height: 10px;"></div>		
	</div>
</template>
<script>
	import menu from './menu.vue'
	export default {
		data() {
			return {
				title: 'new good',
				itemsToShow: 0,
				observer: null,
				mobserver: null

			}
		},
		methods:{
			postNewProduct(){
				$.post('/',JSON.stringify({"name":($("input").val()==''?null:$("input").val()),"composition": $("textarea").val()}))
			},
			sendImage(){
				let filereader = new FileReader()
				let file = $('#image')[0].files[0];
				filereader.onload = (e)=>{
					file = e.target.result
					console.log(file.slice(22))
					$.post('/image',file).done((d)=>{console.log(d)})
				}
				filereader.readAsDataURL(file);

				
			}
		},
		components: {
			productsList: menu
		},
		mounted() {
			
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