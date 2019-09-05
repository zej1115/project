<template>
	<div  id="tab" :class="tabsBox">
		<div class="container">
			<div class="tab-bar mg-b20 clear">
				<div class="tab-button" :class="{activeTabs:currentTab===item.id}" v-for="(item, index) in tableButtons" @click="changeTab(item)">{{item.name}}</div>
			</div>
			<header>
				<slot name="header"></slot>
			</header>
			<footer>
				<slot name="footer"></slot>
			</footer>
		</div>
	</div>
</template>

<script>
    export default {
			name: "newTabs",
			props:
				{
					tableButtons: Array,
					currentTab: Number,
					tabsBox: String,
					todo:Object,
				},
			data(){
        	return{

					}
			},
			methods:{
				changeTab(item, tab) {
					// console.log(item.id);
					this.$emit('changeTab',item, tab)
				}
			}
    }
</script>
