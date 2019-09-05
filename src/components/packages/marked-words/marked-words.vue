<template>
	<div class="marked-words">
		<div >
			<div @mouseover="markedShow" @mouseout="markedHide">
				<svg t="1546938891994" class="marked-svg" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3830" data-spm-anchor-id="a313x.7781069.0.i0" xmlns:xlink="http://www.w3.org/1999/xlink">
					<path d="M512 204.8c168.96 0 307.2 138.24 307.2 307.2s-138.24 307.2-307.2 307.2-307.2-138.24-307.2-307.2 138.24-307.2 307.2-307.2m0-51.2c-197.12 0-358.4 161.28-358.4 358.4s161.28 358.4 358.4 358.4 358.4-161.28 358.4-358.4-161.28-358.4-358.4-358.4z" p-id="3831" fill="#efb336" data-spm-anchor-id="a313x.7781069.0.i1" class=""></path><path d="M512 614.4c-15.36 0-25.6-10.24-25.6-25.6v-10.24c0-51.2 30.72-66.56 61.44-81.92l5.12-2.56c28.16-12.8 46.08-38.4 43.52-66.56 0-38.4-38.4-69.12-81.92-71.68-25.6 0-51.2 7.68-66.56 25.6-12.8 12.8-20.48 30.72-20.48 48.64v7.68c2.56 12.8-7.68 25.6-23.04 28.16-15.36 2.56-25.6-7.68-28.16-23.04v-12.8c0-30.72 12.8-61.44 35.84-84.48 25.6-25.6 64-40.96 104.96-38.4 71.68 2.56 130.56 56.32 133.12 120.32 2.56 48.64-25.6 92.16-74.24 112.64l-5.12 2.56c-30.72 12.8-33.28 15.36-33.28 35.84v10.24c0 15.36-10.24 25.6-25.6 25.6z" p-id="3832" fill="#efb336"></path>
					<path d="M512 691.2m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z" p-id="3833" fill="#efb336"></path>
				</svg>
			</div>
			<transition name="markedWord-box">
				<div v-if="markedWord" class="markedWord-alert">
					<div>{{markedTitle}}</div>
				</div>
			</transition>
		</div>

	</div>

</template>
<script>

	export default {
		name:'marked-words',
		props:{
			markedTitle:String
		},
		data () {
			return {
				markedWord: false,
			}
		},
		methods: {
			markedShow(){
				this.markedWord = true;
			},
			markedHide(){
				this.markedWord = false;
			},
		}
	}
</script>
