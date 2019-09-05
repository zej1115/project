<template>
	<div id="tab" :class="tabsBox">
		<div class="tab-bar clear">
			<div class="tab-button" :class="{activeTabs:currentTab===item.id}" v-for="(item, index) in tableButtons" @click="changeTab(item)">{{item.name}}</div>
		</div>
		<div class="tab-content">
			<slot></slot>
		</div>
	</div>
</template>
<script>

	export default {
		name:'myTabs',
		props:
		{
			tableButtons: Array,
			currentTab: Number,
			tabsBox: String
		},
		data () {
			return {

			}
		},
		methods: {
			changeTab(tab) {
				this.$emit('changeTab', tab)
			}
		}
	}
</script>

<style scoped>

</style>
