<template>
	<div class="main">
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
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: 'new good'
			}
		},
		methods:{
			postNewProduct: $.post('/',JSON.stringify({"name":$("input").val(),"composition": $("textarea").val()}))
			
		}
	}
</script>
<style>
	
</style>