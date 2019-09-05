<template>
	<div class="search-box" @click="hiddenEvent">
		<!--索引项收缩start-->
		<div :class="isHiddenUp?'search-hidden-button':'search-hidden-button2'" class="iconUp hidden-up" >
			<svg t="1546412361679"  style="" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3639" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M231.5 577.4L512 296.9l280.5 280.5c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.7-11.7 11.7-30.7 0-42.4L533.2 233.2c-11.7-11.7-30.7-11.7-42.4 0L189 535c-11.7 11.7-11.7 30.7 0 42.4 11.8 11.7 30.8 11.7 42.5 0zM835 748.3L533.2 446.6c-11.7-11.7-30.7-11.7-42.4 0L189 748.3c-11.7 11.7-11.7 30.7 0 42.4s30.7 11.7 42.4 0L512 510.2l280.5 280.5c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.8-11.7 11.8-30.7 0.1-42.4z" p-id="3640" fill="#707070"></path></svg>
		</div>
		<div :class="isHiddenDown?'search-out-button':'search-out-button2'" class="iconDown hidden-up">
			<svg t="1546412432280"  style="" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4250" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M792.5 446.6L512 727.1 231.5 446.6c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4l301.8 301.7c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8L835 489c11.7-11.7 11.7-30.7 0-42.4-11.8-11.7-30.8-11.7-42.5 0zM490.8 577.4c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8L835 275.7c11.7-11.7 11.7-30.7 0-42.4s-30.7-11.7-42.4 0L512 513.8 231.5 233.3c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4l301.7 301.7z" p-id="4251" fill="#707070"></path></svg>
		</div>
		<!--索引项收缩end-->
	</div>

</template>
<script>

	export default {
		name:'search-box',
		props:{
			isHiddenUp: Boolean,//向上收缩的箭头
			isHiddenDown: Boolean//向下展开的箭头
		},
		data () {
			return {

			}
		},
		methods: {
			/*收起索引区*/
			hiddenEvent(){
				this.$emit('hiddenUpEvent');
			}
		}
	}
</script>
