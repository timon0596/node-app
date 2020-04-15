<template>
		<div class="container">
			<div class="row">
				<div class="col-6">
						<form action="" enctype="multipart/form-data" class="row justify-content-around" id="form111">
							<label for="image2" class="col-5 btn btn-success" role="button" id="image_choose2">выбрать</label>
							<input type="file" v-show="false" id="image2" name="image2">
							<div class="hmin btn btn-success col-5" id="send_image2" @click="sendImage2">отправить</div>
						</form>
				</div>
			</div>
		</div>
</template>
<script>
	const axios = require('axios')
	export default {
		data() {
			return {
				

			}
		},
		methods:{
			sendImage2(){
				let fd = new FormData($("#form111")[0])
				axios.post('/img',fd,{headers: {
					'Content-Type': 'multipart/form-data'
				}}).then((d)=>{console.log(d)})
			}
		},
		components: {
			
		},
		mounted() {
			
				
				
		},
		

	}
</script>
<style>
	
</style>