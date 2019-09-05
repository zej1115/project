<template>
	<div class="h100p setting-contact-manage">
		<div class="h100p pos-relative">
			<div class="bg-color-white fl w300 h100p pd-tb10 pd-lr10 pos-abs t0 l0 account-list">
				<div class="w100p h100p">
					<div class="w100p h100p scroll-wrap setting-account-manage-left-box">
						<el-tree
							:data="treeList"
							highlight-current
							node-key="id"
							:props="defaultProps"
							default-expand-all
							:expand-on-click-node="false"
							@node-click="handleNodeClick">
						</el-tree>
					</div>
				</div>
				<!-- 开启右键功能 @node-contextmenu -->
				
			</div>
			
			<div class="h100p pd-l320 setting-account-manage-right-box">
				<div class="bg-color-white w100p h100p pd-tb10 pd-lr10">
					<!-- button list begin -->
					<div class="clear mg-b20 button-list">
						<div class="fl">
							<el-button @click="openAddForm" size="small" type="primary">新增组</el-button>
						</div>
						<div class="fl mg-l10">
							<el-button @click="openDeleteAlarm" size="small" type="primary">删除组</el-button>
						</div>
						<div class="fl mg-l10">
							<el-button @click="openAddForm" size="small" type="primary">新增联系人</el-button>
						</div>
						<div class="fl mg-l10">
							<el-button @click="openDeleteAlarm" size="small" type="primary">删除联系人</el-button>
						</div>
					</div>
					<!-- button list end -->
					
					<!-- contact form begin -->
					<div class="contact-form">
						<div class="form-content">
							<div class="clear mg-b20">
								<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户名称</div>
								<div class="pd-l110">
									<div class="pos-relative">
										<el-input
											:disabled="!allFormData.isEnabled"
											size="small"
											v-model="allFormData.baseData.groupName"></el-input>
										<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
											{{ allFormData.alarmData.groupName }}
										</div>
									</div>
								</div>
							</div>
							<div class="clear mg-b20">
								<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>所属机构</div>
								<div class="pd-l110">
									<div class="pos-relative">
										<el-input
											:disabled="!allFormData.isEnabled"
											size="small"
											type="textarea"
											v-model="allFormData.baseData.description"></el-input>
										<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
											{{ allFormData.alarmData.description }}
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div class="form-action">
							<div class="f0 text-center">
								<el-button
									@click="saveContactData(nodeData, saveType)"
									size="small"
									type="primary"
									v-if="saveType === 1 || saveType === 2">保存</el-button>
								
								<el-button
									@click="cancelSave"
									class="mg-l20"
									size="small"
									v-if="saveType === 1 || saveType === 2">取消</el-button>
							</div>
						</div>
					</div>
					
					
					<!-- contact form end -->
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: "setting-contact-manage",
		data() {
			return {
				// 账户列表数据
				treeList: [
					{
						id: 1,
						name: '通讯录',
						type: '0',
						children: [
							{
								id: 101,
								name: '微信类',
								type: '0',
								children: [
									{
										id: 10101,
										isEnabled: true,
										name: '客户标签',
										type: '3',
									}
								]
							},
							{
								id: 102,
								name: '微信类',
								type: '0',
								children: [
									{
										id: 10201,
										isEnabled: true,
										name: '客户组',
										type: '3',
									},
									{
										id: 10202,
										isEnabled: false,
										name: '领导组',
										type: '3'
									}
								]
							},
							{
								id: 103,
								name: '邮件类',
								type: '0',
								children: [
								
								]
							}
						]
					}
				],
				
				// 账户列表数据树形节点设置
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				
				// 已选中节点信息
				nodeData: {
					id: '',
					name: '',
					type: ''
				},
				
				allFormData: {
					baseData: {
						contactName: '',
						groupName: '',
						description: '',
						createUserName: '',
						createDateTime: ''
					},
					
					alarmData: {
						groupName: '',
						description: '',
					},
					
					isEnabled: false
				},
				
				saveType: 0, // 保存方式 (1：新增数据, 2：保存数据)
			};
		},
		
		methods: {
			// 监听被点击的节点 (点击后实时更新读取节点数据)
			handleNodeClick(data, vx) {
				// console.log(data, vx);
				this.nodeData = data;
				console.log(this.nodeData);
			},
			
			// 打开新增窗口
			openAddForm() {
				this.resetAllFormData();
				this.allFormData.isEnabled = true;
				this.saveType = 1;
			},
			
			// 打开编辑窗口
			openEditForm() {
				this.resetAllFormData();
				this.allFormData.isEnabled = true;
				this.saveType = 2;
			},
			
			// 保存数据
			saveContactData(nodeData, type) {
				// 新增数据
				if (type === 1) {
					this.append(this.nodeData);
				}
				
				// 修改数据
				else if (type === 2) {
					this.append(this.nodeData);
				}
			},
			
			// 取消保存
			cancelSave() {
			
			},
			
			// 打开删除窗口
			openDeleteAlarm() {
			
			},
			
			// 新增账户节点
			append(data) {
				const newChild = { id: parseInt(Math.random() * 10000), name: this.allFormData.baseData.groupName, type: 'link', children: [] };
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
				this.$message({
					message: '已新增节点',
					type: 'success'
				});
				this.resetAllFormData();
			},
			
			resetAllFormData() {
			
			}
		}
	}
</script>

