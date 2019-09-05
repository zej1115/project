<template>
	<div class="overflow-hidden pos-relative select-system">
		<div class="pos-fix bg-img">
			<img alt="select_sys_bg" src="../../static/images/select_sys_bg.jpg">
		</div>
		<div class="w100p h100p pos-fix pos-c z-100">
			<div class="w800 h400 pos-abs pos-c system-list-box system-list-box-4">
				<router-link class="br6 mouse-hand w140 h140 pd-lr20 pos-abs pos-c-t system-list-item system-list-item-1"
										 tag="div"
										 title="消息系统"
										 :to="{path: '/message' }">
					<div class="w100 h100">
						<img class="w100p" src="../../static/images/icon_doc.png" alt="">
					</div>
					<div class="color-white f20 h40 lh40 text-center">消息系统</div>
				</router-link>
				
				<router-link class="br6 mouse-hand w140 h140 pd-lr20 pos-abs pos-c-r system-list-item system-list-item-2"
										 tag="div"
										 title="服务系统"
										 :to="{path: '/service' }">
					<div class="w100 h100">
						<img class="w100p" src="../../static/images/icon_doc.png" alt="">
					</div>
					<div class="color-white f20 h40 lh40 text-center">服务系统</div>
				</router-link>
				
				<router-link class="br6 mouse-hand w140 h140 pd-lr20 pos-abs pos-c-b system-list-item system-list-item-3"
										 tag="div"
										 title="决策系统"
										 :to="{path: '/index/3'}">
					<div class="w100 h100">
						<img class="w100p" src="../../static/images/icon_doc.png" alt="">
					</div>
					<div class="color-white f20 h40 lh40 text-center">决策系统</div>
				</router-link>
				
				<router-link class="br6 mouse-hand w140 h140 pd-lr20 pos-abs pos-c-l system-list-item system-list-item-4"
										 tag="div"
										 title="监测系统"
										 :to="{path: '/index/4'}">
					<div class="w100 h100">
						<img class="w100p" src="../../static/images/icon_doc.png" alt="">
					</div>
					<div class="color-white f20 h40 lh40 text-center">监测系统</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "select-system",
		
		data() {
			return {
				msg: '选择系统'
			}
		}
	}
</script>

<style>
	.select-system {  }
	.select-system .bg-img { width: 3000px; height: 100%; margin-left: -1500px; left: 50%; }
	.select-system .bg-img img { min-width: 100%; min-height: 100%; max-width: 100%; max-height: 100%; }
	.select-system .system-list-item { transition: all .3s linear; }
	.select-system .system-list-item:hover { background: rgba(255, 255, 255, 0.2); }
</style>
