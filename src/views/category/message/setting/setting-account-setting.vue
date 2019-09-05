<template>
	<div class="bg-color-white h100p setting-account-setting">
		
		<!-- tab begin -->
		<div class="pd-tb10 pd-lr10 tab">
			<div class="clear mg-b20 tab-menu">
				<button @click="handleTab(index)"
								class="fl mouse-hand mg-r1 pd-lr20 tab-menu-item"
								:class="[{'is-selected': item.show}]"
								v-for="(item, index) in tabData">{{ item.name }}</button>
			</div>
			<div class="tab-content">
				<!-- 账户参数 begin -->
				<div class="bg-color-white tab-content-item" v-show="tabData[0].show">
					<div class="params-form">
						<div class="form-content">
							<div class="clear">
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis" title="接收号码去重">接收号码去重</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">是否自动增加退订关键字</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">是否自动增加退订关键字</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">是否自动增加退订关键字</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">登录用户IP不一致是否锁定</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">验证码去重</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">超长短信是否拆分</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">是否启用退订关键字加黑名单</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">对于验证码类短信</div>
									<div class="pd-l90">
										<div class="h32 pos-relative">
											<el-input size="small"></el-input>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">是否应用平台级黑名单</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">是否处理违禁词</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">发送时设置完整特服号</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">账户接收数据类型</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">原始</el-radio>
												<el-radio :label="2">已拆分</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">发送时使用的签名</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
								<div class="fl w25p mg-b15 form-field-box">
									<div class="fl w80 h32 lh32 text-right text-ellipsis">启用发送量限制</div>
									<div class="pd-l90">
										<div class="h32 pd-t7 pos-relative">
											<el-radio-group v-model="allFormData.accountParams.bol">
												<el-radio :label="1">是</el-radio>
												<el-radio :label="2">否</el-radio>
											</el-radio-group>
										</div>
									</div>
								</div>
								
							</div>
						</div>
						<div class="form-action"></div>
					</div>
				</div>
				<!-- 账户参数 end -->
				
				<!-- 信息类型 begin -->
				<div class="bg-color-white tab-content-item" v-show="tabData[1].show">
					<div class="clear pd-tb10 pd-lr10">
						<el-button size="small" type="primary">新增</el-button>
					</div>
					<div class="pd-lr10 table-style-default">
						<el-table
							:data="smsTypeList"
							style="width: 100%">
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
				</div>
				<!-- 信息类型 end -->
				
				<!-- 黑名单关键字 begin -->
				<div class="bg-color-white tab-content-item" v-show="tabData[2].show">
					<div class="clear pd-tb10 pd-lr10">
						<el-button size="small" type="primary">新增</el-button>
					</div>
					<div class="clear mg-b10">
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">关键字</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
						
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">创建时间</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-date-picker
										v-model="datetime"
										size="small"
										type="date"
										placeholder="选择日期"
										value-format="yyyy-MM-dd">
									</el-date-picker>
								</div>
							</div>
						</div>
						
						
					</div>
					<div class="pd-lr10 table-style-default">
						<el-table
							:data="blacklistKeywordList"
							style="width: 100%">
							<el-table-column
								prop="smsType"
								label="自动加黑关键词">
							</el-table-column>
							<el-table-column
								prop="phraseTitle"
								label="是否强制(遇见就加黑或者挑出来等待人工加黑)">
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
				</div>
				<!-- 黑名单关键字 end -->
				
				<!-- 账户级黑名单 begin -->
				<div class="bg-color-white tab-content-item" v-show="tabData[3].show">
					<div class="clear pd-tb10 pd-lr10">
						<el-button size="small" type="primary">新增</el-button>
						<el-button size="small" type="primary">查询</el-button>
					</div>
					<div class="clear mg-b10">
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">手机号</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
						
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">加黑用户</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
						
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">加黑原因</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
						
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">创建时间</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-date-picker
										v-model="datetime"
										size="small"
										type="date"
										placeholder="选择日期"
										value-format="yyyy-MM-dd">
									</el-date-picker>
								</div>
							</div>
						</div>
					
					
					</div>
					<div class="pd-lr10 table-style-default">
						<el-table
							:data="blacklistKeywordList"
							style="width: 100%">
							<el-table-column
								prop="smsType"
								label="自动加黑关键词">
							</el-table-column>
							<el-table-column
								prop="phraseTitle"
								label="是否强制(遇见就加黑或者挑出来等待人工加黑)">
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
				</div>
				<!-- 账户级黑名单 end -->
				
				<!-- 账户级VIP名单 begin -->
				<div class="bg-color-white tab-content-item" v-show="tabData[4].show">
					<div class="clear pd-tb10 pd-lr10">
						<el-button size="small" type="primary">新增</el-button>
						<el-button size="small" type="primary">查询</el-button>
					</div>
					<div class="clear mg-b10">
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">手机号</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
						
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">VIP人员姓名</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
						
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">操作用户</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
						
						<div class="fl">
							<div class="fl w90 h30 lh30 text-right">原因</div>
							<div class="pd-l100">
								<div class="pos-relative">
									<el-input size="small"></el-input>
								</div>
							</div>
						</div>
					</div>
					<div class="pd-lr10 table-style-default">
						<el-table
							:data="blacklistKeywordList"
							style="width: 100%">
							<el-table-column
								prop="smsType"
								label="自动加黑关键词">
							</el-table-column>
							<el-table-column
								prop="phraseTitle"
								label="是否强制(遇见就加黑或者挑出来等待人工加黑)">
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
				</div>
				<!-- 账户级VIP名单 end -->
			</div>
		</div>
		<!-- tab end -->
	</div>
</template>

<script>
	export default {
		name: "setting-account-setting",
		data() {
			return {
				// tab 数据
				tabData: [
					{
						id: 1,
						name: '账户参数',
						show: true
					},
					{
						id: 2,
						name: '信息类型',
						show: false
					},
					{
						id: 3,
						name: '黑名单关键字',
						show: false
					},
					{
						id: 4,
						name: '账户级黑名单',
						show: false
					},
					{
						id: 5,
						name: '账户级VIP名单',
						show: false
					}
				],
				
				// 表单总数据
				allFormData: {
					accountParams: {
						bol: 1
					}
				},
				
				smsTypeList: [
					{},
					{},
					{},
				],
				
				datetime: '',
				
				blacklistKeywordList: [
					{},
					{},
					{},
					{},
					{},
				],
			}
		},
		
		methods: {
			//tab 切换
			handleTab(index) {
				this.tabData[index].show = true;
				this.tabData.forEach((obj, i) => {
					if (index !== i) {
						obj.show = false
					}
				});
			},
		}
	}
</script>
<style>
	.setting-account-setting .tab {}
	.setting-account-setting .tab-menu {}
	.setting-account-setting .tab-menu-item {
		background: #ccc;
		color: #fff;
		line-height: 1;
		padding: 6px 16px;
		transition: all .3s;
	}
	.setting-account-setting .tab-menu-item.is-selected { background: #3a8ee6; }
</style>
