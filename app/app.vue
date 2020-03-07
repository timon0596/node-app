<template>
	<div class="main">
		<form action="">
			<div class="title">{{title}}</div>
			<input type="text" placeholder="название">
			<textarea name="composition" id="composition" cols="30" rows="10" placeholder="состав"></textarea>
			<div class="btn btn-success" role="button">добавить</div>
		</form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: 'new good'
			}
		}
	}
</script>
<style>
	
</style>