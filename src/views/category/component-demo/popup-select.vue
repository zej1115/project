<template>
	<div class="bg-color-white pd-tb20 pd-lr20 popup-select">
		<div class="mg-b20">
			<div class="f18 h50 lh50">弹窗选择</div>
			<div class="w300">
				<el-input @focus="selectShow = true"
									:autosize="{ minRows: 2, maxRows: 3}"
									readonly size="small"
									v-model="selectedList"
									type="textarea"></el-input>
			</div>
		</div>
		
		<div @click.stop="selectShow = false" class="w100p h100p pos-fix pos-c z-1000 popup-panel" v-show="selectShow">
			<div class="black-opacity-50p w100p h100p pos-relative">
				<div class="br6 bg-color-white w500 h300 pos-abs pos-c">
					<div class="f16 h40 lh40 text-center">选择</div>
					<div class="h200 mg-b10 pd-tb10 pd-lr10">
						<div class="clear f0 w100p h100p overflow-scroll-y select-list">
							<label @click.stop="exchange(index)"
										 class="br6 f12 inline-block h26 lh26 mouse-hand mg-tb5 mg-lr5 pd-lr10 select-list-item"
										 :class="[{'is-selected': item.selected}]"
										 v-for="(item, index) in selectList">
								{{ item.name }}
							</label>
						</div>
					</div>
					<div class="f0 h30 text-center">
						<el-button @click.stop="confirmSelected" size="small" type="primary">确定</el-button>
						<el-button class="mg-l10" size="small">取消</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "popup-select",
		data() {
			return {
				selectShow: false,
				selectList: [
					{ id: 1, name: '选项1', selected: false },
					{ id: 2, name: '选项2', selected: true },
					{ id: 3, name: '选项3', selected: false },
					{ id: 4, name: '选项4', selected: true },
					{ id: 5, name: '选项5', selected: true },
					{ id: 6, name: '选项6', selected: false },
					{ id: 7, name: '选项7', selected: false },
					{ id: 8, name: '选项8', selected: false },
					{ id: 9, name: '选项9', selected: false },
					{ id: 10, name: '选项10', selected: false }
				],
				selectedList: ''
			}
		},
		
		methods: {
			exchange(index) {
				this.selectList[index].selected = !this.selectList[index].selected
			},
			
			confirmSelected() {
				let arr =[];
				this.selectList.forEach((obj, i) => {
					if (obj.selected === true) {
						arr.push(obj.name);
					}
				});
				this.selectedList = arr.join(', ');
				this.selectShow = false;
			}
		}
	}
</script>
<style>
	.select-list {}
	.select-list-item {
		border: 1px solid #409EFF;
		color: #409EFF;
	}
	.select-list-item.is-selected {
		background: #409EFF;
		color: #fff;
	}
</style>
