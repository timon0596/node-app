<template>
	<div v-if="id<itemsToShow" class="card" style="width:400px">
	  <img class="card-img-top" src="" alt="Card image">
	  <div class="card-body">
	    <h4 class="card-title">{{product.name}}</h4>
	    <p class="card-text">{{product.composition}}</p>
	    <a href="#" class="btn btn-primary">See Profile</a>
	  </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		props: ['product','id','itemsToShow'],
	}
</script>
<style>
	
</style>