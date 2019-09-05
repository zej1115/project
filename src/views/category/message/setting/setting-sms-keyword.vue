<template>
	<div class="bg-color-white h100p setting-sms-keyword">
		<div class="clear pd-tb10 pd-lr10">
			<el-button @click="openAdd" size="small" type="primary">新增sad</el-button>
		</div>
		<div class="pd-lr10 table-style-default">
			<el-table
				:data="keywordsData"
				@selection-change="handleSelectionChange"
				ref="multipleTable"
				style="width: 100%">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="smsType"
					label="信息类型">
				</el-table-column>
				<el-table-column
					prop="phraseTitle"
					label="短语主题">
				</el-table-column>
				<el-table-column
					prop="phraseContent"
					label="短语内容">
				</el-table-column>
				
				<el-table-column
					label="操作"
					width="300">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="primary"
							@click="openView(scope.$index, scope.row)">查看</el-button>
						
						<el-button
							size="mini"
							type="primary"
							@click="openEdit(scope.$index, scope.row)">修改</el-button>
						
						<el-button
							size="mini"
							type="primary"
							@click="openDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormDataShow">
			<div class="bg-color-white br6 w400 h300 pd-t30 pd-b60 pd-lr10 pos-abs pos-c">
				<div class="f16 w100p h40 lh40 text-center"></div>
				<div class="w100p pd-lr20">
					<div class="mg-b20 form-field-box">
						<div class="f12 fl w60 h32 lh32 text-right">
							<span class="required">*</span>信息类型
						</div>
						<div class="pd-l70 pos-relative">
							<div class="pos-relative">
								<el-select
									class="w100p"
									:disabled="!isEditable"
									v-model="allFormData.smsType"
									size="small" placeholder="请选择">
									<el-option
										v-for="item in allFormData.smsTypeList"
										:key="item.id"
										:label="item.name"
										:value="item.id">
									</el-option>
								</el-select>
							</div>
						</div>
					</div>
					<div class="mg-b20 form-field-box">
						<div class="f12 fl w60 h32 lh32 text-right">
							<span class="required">*</span>短语主题
						</div>
						<div class="pd-l70 pos-relative">
							<div class="pos-relative">
								<el-input
									class="w100p"
									:disabled="!isEditable"
									size="small"
									v-model="allFormData.phraseTitle"
									placeholder="请输入内容"></el-input>
								
							</div>
						</div>
					</div>
					<div class="mg-b20 form-field-box">
						<div class="f12 fl w60 h32 lh32 text-right">
							<span class="required">*</span>短语内容
						</div>
						<div class="pd-l70 pos-relative">
							<div class="pos-relative">
								<el-input
									class="w100p"
									:disabled="!isEditable"
									size="small"
									v-model="allFormData.phraseContent"
									type="textarea"
									placeholder="请输入内容"></el-input>
							
							</div>
						</div>
					</div>
				</div>
				
				<div class="text-center">
					<el-button @click="savePhrase" size="small" type="primary" v-if="isEditable">保存</el-button>
					<el-button @click="closePhraseForm" size="small">取消</el-button>
				</div>
				
				<div @click="closePhraseForm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
					<span class="f22 el-icon-close"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "setting-sms-keyword",
		data() {
			return {
				keywordsData: [
					{ id: 1, name: '', status: 1 },
					{ id: 2, name: '', status: 2 },
					{ id: 3, name: '', status: 3 },
				],
				multipleTable: [],
				
				allFormData: {
					smsType: 1,
					smsTypeList: [
						{ id: 1, name: '短信' },
						{ id: 2, name: '彩信' },
						{ id: 3, name: '微信' },
						{ id: 4, name: '邮件' },
						{ id: 5, name: '超级短信' }
					],
					
					phraseTitle: '', // 短语主题
					
					phraseContent: '', // 短语内容
					
				},
				
				allFormDataShow: false, // 表单窗口 (true: 显示， false：隐藏)
				
				isEditable: false, // 是否可编辑 (true：可编辑， false：不可编辑),
				
				saveType: 0,
			}
		},
		methods: {
			// 表格行勾选
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			
			// 打开新增窗口
			openAdd() {
				this.saveType = 1;
				this.isEditable = true;
				this.allFormDataShow = true
			},
			
			// 打开查看窗口
			openView(index, row) {
				this.saveType = 0;
				this.isEditable = false;
				this.allFormDataShow = true;
			},
			
			// 打开编辑窗口
			openEdit(index, row) {
				this.saveType = 2;
				this.isEditable = true;
				this.allFormDataShow = true;
			},
			
			// savePhrase
			savePhrase() {
				// 新增
				if (this.saveType === 1) {
					this.closePhraseForm();
				}
				
				// 保存
				else if (this.saveType === 2) {
					this.closePhraseForm();
				}
			},
			
			// closePhraseForm
			closePhraseForm() {
				this.isEditable = false;
				this.allFormDataShow = false;
			},
			
			// 打开删除窗口
			openDelete(index, row) {
				this.$confirm('确定要删除 ' + row, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log('删除');
					this.deleteData(row);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 确认删除
			deleteData(id) {
			
			}
		}
	}
</script>

