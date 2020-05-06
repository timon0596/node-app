<template>
	<div class="client__main">
		<vueNav></vueNav>
		<router-view></router-view>
	</div>
</template>
<script>
	import vueNav from "./nav.vue"
	export default {
		data() {
			return {
				
			}
		},
		components: {
			vueNav,
		}
	}
</script>
<style>
	
</style>