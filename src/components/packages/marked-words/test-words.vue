<template>
	<div class="test-words">
		{{testWords}}
	</div>

</template>
<script>

	export default {
		name:'test-words',
		props:{
			testWords: String
		},
		data () {
			return {
				markedWord:false,
			}
		},
		methods: {

		}
	}
</script>
