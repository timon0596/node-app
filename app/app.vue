<template>
	<div class="main">
		<multipart></multipart>
		<div class="container">
			<div class="row">
				<div class="col-6">
						<form action="/upload" method="post" enctype="multipart/form-data">
						        <label>Файл</label><br>
						        <input type="file" name="filedata" /><br><br>
						        <input type="submit" value="Send" />
						      </form>
				</div>
			</div>
		</div>
		<form class="container">
			<div class="row">
				<div class="col-6 dg gg-1">
					<div class="title">{{title}}</div>
					
					<input type="text" placeholder="название" class="w-100 name">
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
	import mpart from './multipartForm.vue'
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
			inputChange(e){
				console.log(e)
			},
			postNewProduct(){
				$.post('/',JSON.stringify({"name":($("input.name").val()==''?null:$("input.name").val()),"composition": $("#composition").val()}))
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