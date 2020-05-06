<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <a class="navbar-brand" href="#">Navbar</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarNav">
		    <ul class="navbar-nav">
		      <li class="nav-item active">
		      	<router-link class="nav-link" to="/">Home</router-link>
		        <!-- <a class="nav-link" href="/">Home</a> -->
		      </li>
		      <li class="nav-item">
		      	<router-link class="nav-link" to="/admin">admin</router-link>
		        <!-- <a class="nav-link" href="/admin">admin</a> -->
		      </li>
		      <li class="nav-item">
		      	<router-link class="nav-link" to="/basket">basket</router-link>
		        <!-- <a class="nav-link" href="/basket">basket</a> -->
		      </li>
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
