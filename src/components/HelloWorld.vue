<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Welcome:
    <a href="https://hx.dcloud.net.cn/" target="_blank">HBuilderX</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div class="a">
	  <div class="b">
		  <div class="c">
			  
		  </div>
	  </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: #42b983;
}
.a{
	width: 100px;
	height: 50px;
	background-color: white;
	.b{
		width: 50px;
		height: 25px;
		background-color: red;
		.c{
			width: 50%;
			height: 25%;
			background-color: green;
			float: right;
		}
	}
	
}
</style>
