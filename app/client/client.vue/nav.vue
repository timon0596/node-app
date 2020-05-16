<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="#">Navbar</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav w-100 d-flex justify-content-start">
				<router-link class="nav-item non-active" to="/">
					<a class="nav-link">Home</a>
				</router-link>
				<router-link class="nav-item" to="/basket">
					<a class="nav-link">basket</a>
				</router-link>
				<router-link class="nav-item ml-auto" to="/admin">
					<a class="nav-link">admin</a>
				</router-link>
			</ul>
		</div>
	</nav>
</template>
<script>
	export default {
		data(){
			return{

			}
		}
	}
</script>
<style>
	
</style>
