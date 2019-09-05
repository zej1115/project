<template>
	<div class="bg-color-white pd-tb20 pd-lr20">
		<div class="w300 mg-b20">
			<div class="f16 h30 lh30">基本结构</div>
			<div class="w300 pd-tb10 pd-lr10 tree-wrap">
				<el-tree
					:data="treeList"
					highlight-current
					:props="defaultProps"
					@node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		
		<div class="mg-b20">
			<div class="f16 h30 lh30">checkbox可以选择</div>
			<div class="w300 mg-b10 pd-tb10 pd-lr10 tree-wrap">
				<el-tree
					:data="treeList2"
					show-checkbox
					node-key="id"
					highlight-current
					:props="defaultProps"
					ref="tree">
				</el-tree>
			</div>
			
			<div class="buttons">
				<el-button @click="getCheckedNodes" size="small" type="primary">获取选中的节点</el-button>
				<el-button @click="getCheckedKeys" size="small" type="success">获取选中节点的key</el-button>
				<el-button @click="setCheckedNodes" size="small" type="primary">设置指定节点为选中状态</el-button>
				<el-button @click="setCheckedKeys" size="small" type="success">设置指定key对应的节点为选中状态</el-button>
				<el-button @click="resetChecked" size="small" type="danger">初始化</el-button>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	export default {
		name: "tree",
		
		data() {
			return {
				treeList: [
					{
						id: 1,
						name: '一级菜单1',
						children: [
							{
								id: 101,
								name: '二级级菜单1',
								children: [
									{
										id: 10101,
										name: '三级菜单1'
									},
									{
										id: 10102,
										name: '三级菜单2'
									},
									{
										id: 10103,
										name: '三级菜单3'
									}
								]
							},
							{
								id: 102,
								name: '二级级菜单2'
							}
						]
					},
					{
						id: 2,
						name: '一级菜单2',
						children: [
							{
								id: 201,
								name: '二级级菜单1'
							}
						]
					},
					{
						id: 3,
						name: '一级菜单3',
						children: [
							{
								id: 301,
								name: '二级级菜单1'
							}
						]
					},
				],
				
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				
				treeList2: [
					{
						id: 1,
						name: '一级菜单1',
						children: [
							{
								id: 101,
								name: '二级菜单1'
							},
							{
								id: 102,
								name: '二级菜单2'
							}
						]
					},
					{
						id: 2,
						name: '一级菜单2',
						children: [
							{
								id: 201,
								name: '二级菜单1'
							},
							{
								id: 202,
								name: '二级菜单2'
							},
							{
								id: 203,
								name: '二级菜单3'
							}
						]
					},
					{
						id: 3,
						name: '一级菜单3'
					},
				],
				
				defaultProps2: {
					children: 'children',
					label: 'name'
				}
			}
		},
		
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			
			handleChange(val) {
				console.log(val);
			},
			
			//获取选中的节点
			getCheckedNodes() {
				console.log(this.$refs.tree.getCheckedNodes());
			},
			
			//获取选中的节点key
			getCheckedKeys() {
				console.log(this.$refs.tree.getCheckedKeys());
			},
			
			//设置指定的节点为选中状态
			setCheckedNodes() {
				this.$refs.tree.setCheckedNodes(
					[
						{
							id: 101,
							name: '二级菜单1'
						},
						{
							id: 102,
							name: '二级菜单2'
						}
					]
				);
			},
			
			//设置指定key对应的节点为选中状态
			setCheckedKeys() {
				this.$refs.tree.setCheckedKeys([3]);
			},
			
			//初始化(所有节点恢复为未选中状态)
			resetChecked() {
				this.$refs.tree.setCheckedKeys([]);
			}
		}
	}
</script>
<style>
	.tree-wrap {
		border: 1px solid #ddd;
		border-radius: 4px;
	}
</style>
