<template>
	<!-- 账户管理 -->
	<div class="h100p setting-account-manage">
		<div class="h100p pos-relative">
			<div class="bg-color-white fl w300 h100p pd-tb10 pd-lr10 pos-abs t0 l0 account-list">
				<div class="w100p pd-tb10 pd-lr10 pos-abs pos-c-t">
					<el-input
						placeholder="输入关键字进行过滤"
						size="small"
						v-model="filterKeyword">
					</el-input>
				</div>
				
				<div class="w100p h100p pd-t40 pd-b60">
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
				
				<div class="text-center pos-abs l33 b25">
					<el-checkbox v-model="disabledShow">显示已封存账户</el-checkbox>
				</div>
			</div>
			
			<div class="h100p pd-l320 setting-account-manage-right-box">
				<div class="bg-color-white w100p h100p pd-tb10 pd-lr10">
					<!-- button list begin -->
					<div class="clear mg-b20 button-list">
						<!--<button @click="openAddForm"
										class="fl lee-btn is-small"
										:class="[{'is-disabled': !buttonList.add.enabled}]"
										:disabled="!buttonList.add.enabled">新增</button>-->
						<el-button @click="openAddForm"
											 class="common-button-medium"
											 :disabled="!buttonList.add.enabled"
											 size="small">新增</el-button>
						
						<!--<button @click="openEditForm"
										class="fl mg-l10 lee-btn is-small"
										:class="[{'is-disabled': !buttonList.edit.enabled}]"
										:disabled="!buttonList.edit.enabled">修改</button>-->
						<el-button @click="openEditForm"
											 class="common-button-medium"
											 :disabled="!buttonList.edit.enabled"
											 size="small">修改</el-button>
						
						<!--<button @click="openDeleteAlarm"
										class="fl mg-l10 lee-btn is-small"
										:class="[{'is-disabled': !buttonList.delete.enabled}]"
										:disabled="!buttonList.delete.enabled">删除</button>-->
						<el-button @click="openDeleteAlarm"
											 class="common-button-medium"
											 :disabled="!buttonList.delete.enabled"
											 size="small">删除</el-button>
						
						<!--<button @click="openDisabledAlarm(nodeData)" class="fl mg-l10 lee-btn is-small"
										:class="[{'is-disabled': !buttonList.stop.enabled}]"
										:disabled="!buttonList.stop.enabled">封存</button>-->
						<el-button @click="openDisabledAlarm(nodeData)"
											 class="common-button-medium"
											 :disabled="!buttonList.stop.enabled"
											 size="small">封存</el-button>
						
						<!--<button @click="setEnabled(nodeData)" class="fl mg-l10 lee-btn is-small"
										:class="[{'is-disabled': !buttonList.start.enabled}]"
										:disabled="!buttonList.start.enabled">启用</button>-->
						<el-button @click="setEnabled(nodeData)"
											 class="common-button-medium"
											 :disabled="!buttonList.start.enabled"
											 size="small">启用</el-button>
					</div>
					<!-- button list end -->
					
					<new-tabs  @changeTab="changeTab" :tableButtons="tableButtons" :currentTab="currentTab" :tabsBox="tabsBoxClassName">
						<template slot="header">
							<div v-show="slot1">
								<div class="bg-color-white">
									<div class="form-content">
										<div class="clear">
											<div class="fl w50p">
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户名称</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-input
																:disabled="!allFormData.baseInfoEnable"
																size="small"
																v-model="allFormData.baseInfo.accountName"></el-input>
															<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
																{{ allFormData.baseInfoAlarmText.accountName }}
															</div>
														</div>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>所属机构</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-input :disabled="true"
																				size="small"
																				v-model="allFormData.baseInfo.organName"></el-input>
														</div>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>账户负责人</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.accountHeadName"></el-input>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>账户负责人电话</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.accountHeadPhone"></el-input>
													</div>
												</div>
											</div>
											
											<div class="fl w50p">
												
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>初始余额(元)</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-input :disabled="!allFormData.baseInfoEnable"
																				size="small"
																				v-model="allFormData.baseInfo.balance"></el-input>
														</div>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>付款方式</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-select
																class="w100p"
																:disabled="!allFormData.baseInfoEnable"
																v-model="allFormData.baseInfo.payType"
																size="small" placeholder="请选择">
																<el-option
																	v-for="item in allFormData.baseInfo.payTypeList"
																	:key="item.id"
																	:label="item.name"
																	:value="item.id">
																</el-option>
															</el-select>
														</div>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>运维负责人</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.maintenanceHeadName"></el-input>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>运维负责人电话</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.maintenanceHeadPhone"></el-input>
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>余额换算比例</div>
											<div class="pd-l110">
												<div class="clear">
													<div class="fl w33p pd-l50 pd-r15 pos-relative">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.ratio.mobile"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.ratioPercentList"
																:key="item.id"
																:label="item.per"
																:value="item.id">
															</el-option>
														</el-select>
														<div class="f12 w40 h30 lh30 text-right pos-abs t0 l0">
															移动
														</div>
														<span class="f12 w10 h30 lh30 pos-abs t0 r0">
															%
														</span>
													</div>
													<div class="fl w33p pd-l50 pd-r15 pos-relative">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.ratio.unicom"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.ratioPercentList"
																:key="item.id"
																:label="item.per"
																:value="item.id">
															</el-option>
														</el-select>
														<div class="f12 w40 h30 lh30 text-right pos-abs t0 l0">
															联通
														</div>
														<span class="f12 w10 h30 lh30 pos-abs t0 r0">
															%
														</span>
													</div>
													<div class="fl w33p pd-l50 pd-r15 pos-relative">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.ratio.telecom"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.ratioPercentList"
																:key="item.id"
																:label="item.per"
																:value="item.id">
															</el-option>
														</el-select>
														<div class="f12 w40 h30 lh30 text-right pos-abs t0 l0">
															电信
														</div>
														<span class="f12 w10 h30 lh30 pos-abs t0 r0">
															%
														</span>
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b20">
											<div class="fl w50p">
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户特务号</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.accountServiceNum"></el-input>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账单日</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.billDate"></el-input>
													</div>
												</div>
											</div>
											<div class="fl w50p">
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户签名</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.customerMark"></el-input>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>计费原则</div>
													<div class="pd-l110">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.chargingType"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.chargingTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!--<div class="form-action">
										<div class="f0 text-center">
											<el-button size="small" type="primary">保存</el-button>
											<el-button class="mg-l20" size="small">取消</el-button>
										</div>
									</div>-->
								</div>
							</div>
						</template>
						<template slot="footer">
							<div v-show="slot2">
								<div class="bg-color-white">
									<div class="form-content">
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户</div>
											<div class="pd-l110">
												<el-input :disabled="!allFormData.payAgreementEnable" v-model="allFormData.baseInfo.accountName" size="small"></el-input>
											</div>
										</div>
										
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>说明</div>
											<div class="pd-l110">
												<el-input :disabled="!allFormData.payAgreementEnable"
																	v-model="allFormData.payAgreement.description" size="small" type="textarea"></el-input>
											</div>
										</div>
										
										<div class="mg-b10">
											<div class="clear">
												<div class="fl">
													<el-button @click="addPayAgreementTableDataRow" class="common-button-medium" size="small" type="primary">增加行</el-button>
												</div>
											</div>
										</div>
										
										<div class="mg-b20 overflow-scroll-x table-style-default payAgreementTable">
											<el-table
												:data="allFormData.payAgreement.payAgreementTableData"
												ref="multipleTable">
												<el-table-column
													prop="smsType"
													label="业务类型"
													width="150">
													<template slot-scope="scope">
														<el-select
															class="w100p"
															size="mini"
															v-model="scope.row.businessType"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.payAgreement.businessTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</template>
												</el-table-column>
												<el-table-column
													prop="phraseTitle"
													label="信息类型"
													width="150">
													<template slot-scope="scope">
														<el-select
															class="w100p"
															size="mini"
															v-model="scope.row.smsType"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.payAgreement.smsTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</template>
												</el-table-column>
												<el-table-column
													prop="phraseContent"
													label="运营商"
													width="150">
													<template slot-scope="scope">
														<el-select
															class="w100p"
															size="mini"
															v-model="scope.row.operatorType"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.payAgreement.operatorTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</template>
												</el-table-column>
												
												<el-table-column
													prop="sentLevel"
													label="月发送数量级(条)"
													width="160">
													
													<template slot-scope="scope">
														<div @click="openSentLevelAlarm(scope.$index, scope.row)" class="w100p h28">
															<span v-if="scope.row.numberOfMonth.type === 1">{{ scope.row.numberOfMonth.max }}以内(含)</span>
															<span v-if="scope.row.numberOfMonth.type === 2">{{ scope.row.numberOfMonth.min }} 至 {{ scope.row.numberOfMonth.max }}</span>
															<span v-if="scope.row.numberOfMonth.type === 3">大于{{ scope.row.numberOfMonth.min }}以上(含)</span>
														</div>
													</template>
												
												</el-table-column>
												
												<el-table-column
													prop="phraseContent"
													width="120"
													label="单价">
													<template slot-scope="scope">
														<el-input v-model="scope.row.price" size="mini"></el-input>
													</template>
												</el-table-column>
												
												<el-table-column
													prop="phraseContent"
													label="备注">
													<template slot-scope="scope">
														备注
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>
							</div>
						</template>
						<template slot="footer">
							<div v-show="slot3">
								<div class="bg-color-white">
									<div class="form-content">
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户</div>
											<div class="pd-l110">
												<div class="pd-r110 pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.baseInfo.accountName"
																		size="small"></el-input>
													<el-button @click="openRechargeAlarm"
																		 class="w100 pos-abs t0 r0 common-button-medium"
																		 size="small"
																		 type="primary"
																		 v-if="nodeData.type === 3 || nodeData.type === '3'">查看充值历史</el-button>
												</div>
											</div>
										</div>
										
										<!-- 账户充值记录表 begin -->
										<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormData.topUp.tableShow">
											<div class="bg-color-white br6 w1000 h500 pd-lr10 pos-abs pos-c">
												<!--<leeTable :lineList="allFormData.topUp.tableData.lineList"
																	:operationAble="true"
																	:buttonList="allFormData.topUp.tableData.buttonList"></leeTable>-->
												
												<div class="f16 h40 lh40 text-center">充值记录</div>
												
												<el-table
													class="table-style-default"
													border
													:data="allFormData.topUp.tableData.list"
													height="400"
													ref="multipleTable">
													<el-table-column
														prop="index"
														label="序号"
														width="80">
														<template slot-scope="scope">
															{{ scope.$index + 1 }}
														</template>
													</el-table-column>
													<el-table-column
														prop="status"
														label="状态"
														width="100">
														<template slot-scope="scope">
															<span v-if="scope.row.status === 1 || scope.row.status === '1'">已充值</span>
															<span v-if="scope.row.status === 2 || scope.row.status === '2'">已开票</span>
														</template>
													</el-table-column>
													<el-table-column
														prop="datetime"
														label="充值时间"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.dateTime }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="beforeTopUp"
														label="充值前余额"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.beforeTopUp }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="topUp"
														width="150"
														label="本次充值金额">
														<template slot-scope="scope">
															{{ scope.row.topUp }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="afterTopUp"
														label="充值后余额">
														<template slot-scope="scope">
															{{ scope.row.afterTopUp }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="description"
														label="备注">
														<template slot-scope="scope">
															{{ scope.row.description }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="action"
														label="操作">
														<template slot-scope="scope">
															<div @click="openInvoiceAlarm" class="lee-btn lee-btn-text-primary"
																	 v-if="scope.row.status === 1 || scope.row.status === '1'">申请开票</div>
														</template>
													</el-table-column>
												</el-table>
												
												<div @click="closeRechargeAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
													<span class="f22 el-icon-close"></span>
												</div>
											</div>
										</div>
										<!-- 账户充值记录表 end -->
										
										<!-- 开票窗口 begin -->
										<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormData.topUp.invoiceShow">
											<div class="bg-color-white br6 w500 pd-lr10 pos-abs pos-c"
													 :class="[{'h260': allFormData.topUp.invoiceType !== 1 && allFormData.topUp.invoiceType !== 2},
													 {'h260': allFormData.topUp.invoiceType === 1},
													 {'h460': allFormData.topUp.invoiceType === 2}]">
												<div class="f16 h40 lh40 text-center form-title">开票</div>
												<div class="pd-lr40 form-content">
													<div class="clear mg-b20">
														<div class="fl w100 h28 lh28 text-right">
															开票类型
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-select
																	class="w100p"
																	size="mini"
																	v-model="allFormData.topUp.invoiceType"
																	placeholder="请选择">
																	<el-option
																		v-for="item in allFormData.topUp.invoiceTypeList"
																		:key="item.id"
																		:label="item.name"
																		:value="item.id">
																	</el-option>
																</el-select>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20">
														<div class="fl w100 h28 lh28 text-right">
															开票名称
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20">
														<div class="fl w100 h28 lh28 text-right">
															纳税人识别号
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															地址
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															电话
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															开户行
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															银行账号
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
												</div>
												
												<div class="form-action">
													<div class="clear text-center">
														<el-button @click="confirmInvoice" size="small" type="primary">确定</el-button>
														<el-button @click="closeInvoiceAlarm" size="small">取消</el-button>
													</div>
												</div>
												
												<div @click="closeInvoiceAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
													<span class="f22 el-icon-close"></span>
												</div>
											</div>
										</div>
										<!-- 开票窗口 end -->
										
										<div class="clear mg-b22">
											<div class="clear pos-relative">
												<div class="fl w33p h30 lh30">
													当前账户余额：
													<span class="color-black">{{ allFormData.baseInfo.balance }}</span>
												</div>
												<div class="fl w33p h30 lh30">
													可用余额：
													<span class="color-green">{{ allFormData.baseInfo.usableBalance }}</span>
												</div>
												<div class="fl w33p h30 lh30">
													在途余额：
													<span class="color-blue">{{ allFormData.baseInfo.processBalance }}</span>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>充值金额</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.amount"
																		size="small"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.amount }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>充值方式</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-select
														class="w100p"
														:disabled="!allFormData.topUpEnable"
														v-model="allFormData.topUp.type"
														size="small"
														placeholder="请选择">
														<el-option
															v-for="item in allFormData.topUp.typeList"
															:key="item.id"
															:label="item.name"
															:value="item.id">
														</el-option>
													</el-select>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.type }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>付款账户</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payAccount"
																		size="small"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.payAccount }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>收款方</div>
											<div class="pd-l110">
												<div class="pd-r90 pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payee"
																		size="small"></el-input>
													<el-button class="w80 pos-abs t0 r0 common-button-medium" size="small" type="primary">复制</el-button>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.payee }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>收款账户</div>
											<div class="pd-l110">
												<div class="pd-r90 pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payeeAccount"
																		size="small"></el-input>
													<el-button class="w80 pos-abs t0 r0 common-button-medium" size="small" type="primary">复制</el-button>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.payeeAccount }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>开户行</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.bankName"
																		size="small"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.bankName }}
													</div>
												</div>
											</div>
										</div>
										<!--<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>收款凭证</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payeeVoucher"
																		size="small"></el-input>
												</div>
											</div>
										</div>-->
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right">充值说明</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.description"
																		size="small"></el-input>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</template>
						<template slot="footer">
							<div v-show="slot4">
								<div class="bg-color-white">
									<div class="form-content">
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户名称</div>
											<div class="pd-l110">
												<div class="pd-r110 pos-relative">
													<el-input :disabled="!allFormData.changeBillEnable"
																		size="small"
																		v-model="allFormData.baseInfo.accountName"></el-input>
													<el-button @click="openHandsListAlarm"
																		 class="w100 pos-abs t0 r0 common-button-medium"
																		 size="small"
																		 type="primary"
																		 v-if="nodeData.type === 3 || nodeData.type === '3'">查看调账历史</el-button>
												</div>
											</div>
										</div>
										
										<!-- 调账记录表 begin -->
										<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormData.changeBill.tableShow">
											<div class="bg-color-white br6 w1000 h500 pd-lr10 pos-abs pos-c">
												<!--<leeTable :lineList="allFormData.topUp.tableData.lineList"
																	:operationAble="true"
																	:buttonList="allFormData.topUp.tableData.buttonList"></leeTable>-->
												
												<div class="f16 h40 lh40 text-center">调账记录</div>
												
												<el-table
													class="table-style-default"
													border
													:data="allFormData.changeBill.tableData.list"
													height="400"
													ref="multipleTable">
													<el-table-column
														prop="index"
														label="序号"
														width="80">
														<template slot-scope="scope">
															{{ scope.$index + 1 }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="datetime"
														label="调账时间"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.dateTime }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="beforeChange"
														label="调账前余额">
														<template slot-scope="scope">
															{{ scope.row.beforeChange }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="changeType"
														label="调账方式">
														<template slot-scope="scope">
															<span v-if="scope.row.changeType === 1 || scope.row.changeType === '1'">调升</span>
															<span v-if="scope.row.changeType === 2 || scope.row.changeType === '2'">调降</span>
														</template>
													</el-table-column>
													
													<el-table-column
														prop="changeAmount"
														label="充值后余额"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.changeAmount }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="description"
														label="调账说明">
														<template slot-scope="scope">
															{{ scope.row.description }}
														</template>
													</el-table-column>
												</el-table>
												
												<div @click="closeHandsListAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
													<span class="f22 el-icon-close"></span>
												</div>
											</div>
										</div>
										<!-- 调账记录表 end -->
										
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>调账金额</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.changeBillEnable" size="small"
																		v-model="allFormData.changeBill.amount"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.changeBillAlarmText.amount }}
													</div>
												</div>
											</div>
										</div>
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>调账方式</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-select
														class="w100p"
														:disabled="!allFormData.changeBillEnable"
														v-model="allFormData.changeBill.type"
														size="small"
														placeholder="请选择">
														<el-option
															v-for="item in allFormData.changeBill.typeList"
															:key="item.id"
															:label="item.name"
															:value="item.id">
														</el-option>
													</el-select>
												
												</div>
											</div>
										</div>
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>调账说明</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.changeBillEnable"
																		size="small"
																		v-model="allFormData.changeBill.description"
																		type="textarea"></el-input>
												</div>
											</div>
										</div>
									</div>
									<!--<div class="form-action">
										<div class="f0 text-center">
											<el-button size="small" type="primary">保存</el-button>
											<el-button class="mg-l20" size="small">取消</el-button>
										</div>
									</div>-->
								</div>
							</div>
						</template>
					</new-tabs>
					
					<!-- tab begin -->
					<!--<div class="tab">
						<div class="clear mg-b20 tab-menu">
							<button @click="handleTab(index)"
											class="fl mouse-hand mg-r1 pd-lr20 tab-menu-item"
											:disabled="!tabEnabled"
											:class="[{'is-selected': item.show}, {'is-disabled': !tabEnabled}]"
											v-for="(item, index) in tabData">{{ item.name }}</button>
						</div>
						<div class="tab-content">
							&lt;!&ndash; 基本信息 end &ndash;&gt;
							<div class="tab-content-item" v-show="tabData[0].show">
								&lt;!&ndash;<div class="bg-color-white">
									<div class="form-content">
										<div class="clear">
											<div class="fl w50p">
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户名称</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-input
																:disabled="!allFormData.baseInfoEnable"
																size="small"
																v-model="allFormData.baseInfo.accountName"></el-input>
															<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
																{{ allFormData.baseInfoAlarmText.accountName }}
															</div>
														</div>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>所属机构</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-input :disabled="true"
																				size="small"
																				v-model="allFormData.baseInfo.organName"></el-input>
														</div>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>账户负责人</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.accountHeadName"></el-input>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>账户负责人电话</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.accountHeadPhone"></el-input>
													</div>
												</div>
											</div>
											
											<div class="fl w50p">
												
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>初始余额(元)</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-input :disabled="!allFormData.baseInfoEnable"
																				size="small"
																				v-model="allFormData.baseInfo.balance"></el-input>
														</div>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>付款方式</div>
													<div class="pd-l110">
														<div class="pos-relative">
															<el-select
																class="w100p"
																:disabled="!allFormData.baseInfoEnable"
																v-model="allFormData.baseInfo.payType"
																size="small" placeholder="请选择">
																<el-option
																	v-for="item in allFormData.baseInfo.payTypeList"
																	:key="item.id"
																	:label="item.name"
																	:value="item.id">
																</el-option>
															</el-select>
														</div>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>运维负责人</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.maintenanceHeadName"></el-input>
													</div>
												</div>
												<div class="clear mg-b20">
													<div class="fl f12 w100 h30 lh30 text-right"><span class="required">*</span>运维负责人电话</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.maintenanceHeadPhone"></el-input>
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>余额换算比例</div>
											<div class="pd-l110">
												<div class="clear">
													<div class="fl w33p pd-l50 pd-r15 pos-relative">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.ratio.mobile"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.ratioPercentList"
																:key="item.id"
																:label="item.per"
																:value="item.id">
															</el-option>
														</el-select>
														<div class="f12 w40 h30 lh30 text-right pos-abs t0 l0">
															移动
														</div>
														<span class="f12 w10 h30 lh30 pos-abs t0 r0">
															%
														</span>
													</div>
													<div class="fl w33p pd-l50 pd-r15 pos-relative">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.ratio.unicom"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.ratioPercentList"
																:key="item.id"
																:label="item.per"
																:value="item.id">
															</el-option>
														</el-select>
														<div class="f12 w40 h30 lh30 text-right pos-abs t0 l0">
															联通
														</div>
														<span class="f12 w10 h30 lh30 pos-abs t0 r0">
															%
														</span>
													</div>
													<div class="fl w33p pd-l50 pd-r15 pos-relative">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.ratio.telecom"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.ratioPercentList"
																:key="item.id"
																:label="item.per"
																:value="item.id">
															</el-option>
														</el-select>
														<div class="f12 w40 h30 lh30 text-right pos-abs t0 l0">
															电信
														</div>
														<span class="f12 w10 h30 lh30 pos-abs t0 r0">
															%
														</span>
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b20">
											<div class="fl w50p">
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户特务号</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.accountServiceNum"></el-input>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账单日</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.billDate"></el-input>
													</div>
												</div>
											</div>
											<div class="fl w50p">
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户签名</div>
													<div class="pd-l110">
														<el-input :disabled="!allFormData.baseInfoEnable"
																			size="small"
																			v-model="allFormData.baseInfo.customerMark"></el-input>
													</div>
												</div>
												
												<div class="clear mg-b20">
													<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>计费原则</div>
													<div class="pd-l110">
														<el-select
															class="w100p"
															:disabled="!allFormData.baseInfoEnable"
															v-model="allFormData.baseInfo.chargingType"
															size="small"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.baseInfo.chargingTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</div>
												</div>
											</div>
										</div>
									</div>
									&lt;!&ndash;<div class="form-action">
										<div class="f0 text-center">
											<el-button size="small" type="primary">保存</el-button>
											<el-button class="mg-l20" size="small">取消</el-button>
										</div>
									</div>&ndash;&gt;
								</div>&ndash;&gt;
							</div>
							&lt;!&ndash; 基本信息 end &ndash;&gt;
							
							&lt;!&ndash; 支付协议 begin &ndash;&gt;
							<div class="tab-content-item" v-show="tabData[1].show">
								&lt;!&ndash;<div class="bg-color-white">
									<div class="form-content">
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户</div>
											<div class="pd-l110">
												<el-input :disabled="!allFormData.payAgreementEnable" v-model="allFormData.baseInfo.accountName" size="small"></el-input>
											</div>
										</div>
										
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>说明</div>
											<div class="pd-l110">
												<el-input :disabled="!allFormData.payAgreementEnable"
																	v-model="allFormData.payAgreement.description" size="small" type="textarea"></el-input>
											</div>
										</div>
										
										<div class="mg-b10">
											<div class="clear">
												<div class="fl">
													<el-button @click="addPayAgreementTableDataRow" class="common-button-medium" size="small" type="primary">增加行</el-button>
												</div>
											</div>
										</div>
										
										<div class="mg-b20 overflow-scroll-x table-style-default payAgreementTable">
											<el-table
												:data="allFormData.payAgreement.payAgreementTableData"
												ref="multipleTable">
												<el-table-column
													prop="smsType"
													label="业务类型"
													width="150">
													<template slot-scope="scope">
														<el-select
															class="w100p"
															size="mini"
															v-model="scope.row.businessType"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.payAgreement.businessTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</template>
												</el-table-column>
												<el-table-column
													prop="phraseTitle"
													label="信息类型"
													width="150">
													<template slot-scope="scope">
														<el-select
															class="w100p"
															size="mini"
															v-model="scope.row.smsType"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.payAgreement.smsTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</template>
												</el-table-column>
												<el-table-column
													prop="phraseContent"
													label="运营商"
													width="150">
													<template slot-scope="scope">
														<el-select
															class="w100p"
															size="mini"
															v-model="scope.row.operatorType"
															placeholder="请选择">
															<el-option
																v-for="item in allFormData.payAgreement.operatorTypeList"
																:key="item.id"
																:label="item.name"
																:value="item.id">
															</el-option>
														</el-select>
													</template>
												</el-table-column>
												
												<el-table-column
													prop="sentLevel"
													label="月发送数量级(条)"
													width="160">
													
													<template slot-scope="scope">
														<div @click="openSentLevelAlarm(scope.$index, scope.row)" class="w100p h28">
															<span v-if="scope.row.numberOfMonth.type === 1">{{ scope.row.numberOfMonth.max }}以内(含)</span>
															<span v-if="scope.row.numberOfMonth.type === 2">{{ scope.row.numberOfMonth.min }} 至 {{ scope.row.numberOfMonth.max }}</span>
															<span v-if="scope.row.numberOfMonth.type === 3">大于{{ scope.row.numberOfMonth.min }}以上(含)</span>
														</div>
													</template>
													
												</el-table-column>
												
												<el-table-column
													prop="phraseContent"
													width="120"
													label="单价">
													<template slot-scope="scope">
														<el-input v-model="scope.row.price" size="mini"></el-input>
													</template>
												</el-table-column>
												
												<el-table-column
													prop="phraseContent"
													label="备注">
													<template slot-scope="scope">
														备注
													</template>
												</el-table-column>
											</el-table>
										</div>
									</div>
								</div>&ndash;&gt;
							</div>
							&lt;!&ndash; 支付协议 end &ndash;&gt;
							
							&lt;!&ndash; 数量级弹窗 begin &ndash;&gt;
							<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormData.payAgreement.sentLevelAlarmShow">
								<div class="bg-color-white br6 w400 h200 pd-lr10 pos-abs pos-c">
									<div class="f16 h40 lh40 mg-b20 text-center">设置发送数量级</div>
									<div class="clear mg-b20 text-center">
										<el-radio-group v-model="allFormData.payAgreement.sentLevelData.type">
											<el-radio :label="1">类型1</el-radio>
											<el-radio :label="2">类型2</el-radio>
											<el-radio :label="3">类型3</el-radio>
										</el-radio-group>
									</div>
									<div class="mg-b20 pd-lr20">
										<div class="clear mg-b10 pd-lr20 pos-relative" v-show="allFormData.payAgreement.sentLevelData.type === 1">
											<el-input v-model="allFormData.payAgreement.sentLevelData.content[0].max" size="mini"></el-input>
											<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
												{{ allFormData.payAgreement.sentLevelDataAlarmText.content[0].max }}
											</div>
										</div>
										
										<div class="clear mg-b10" v-show="allFormData.payAgreement.sentLevelData.type === 2">
											<div class="fl w46p h28 pos-relative">
												<el-input v-model="allFormData.payAgreement.sentLevelData.content[1].min" size="mini"></el-input>
												<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
													{{ allFormData.payAgreement.sentLevelDataAlarmText.content[1].min }}
												</div>
											</div>
											<div class="fl w8p h28 lh28 text-center">~</div>
											<div class="fl w46p h28 pos-relative">
												<el-input v-model="allFormData.payAgreement.sentLevelData.content[1].max" size="mini"></el-input>
												<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
													{{ allFormData.payAgreement.sentLevelDataAlarmText.content[1].max }}
												</div>
											</div>
										</div>
										
										<div class="clear pd-lr20 pos-relative" v-show="allFormData.payAgreement.sentLevelData.type === 3">
											<el-input v-model="allFormData.payAgreement.sentLevelData.content[2].max" size="mini"></el-input>
											<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
												{{ allFormData.payAgreement.sentLevelDataAlarmText.content[2].min }}
											</div>
										</div>
									
									</div>
									
									<div class="text-center">
										<el-button @click="saveSentLevel(allFormData.payAgreement.currentRowIndex)" size="small" type="primary">保存</el-button>
										<el-button @click="cancelSaveSentLevel" size="small">取消</el-button>
									</div>
									
									<div @click="cancelSaveSentLevel" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
										<span class="f22 el-icon-close"></span>
									</div>
								</div>
							</div>
							&lt;!&ndash; 数量级弹窗 end &ndash;&gt;
							
							&lt;!&ndash; 账户充值 begin &ndash;&gt;
							<div class="tab-content-item" v-show="tabData[2].show">
								&lt;!&ndash;<div class="bg-color-white">
									<div class="form-content">
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户</div>
											<div class="pd-l110">
												<div class="pd-r110 pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.baseInfo.accountName"
																		size="small"></el-input>
													<el-button @click="openRechargeAlarm"
																		 class="w100 pos-abs t0 r0 common-button-medium"
																		 size="small"
																		 type="primary"
																		 v-if="nodeData.type === 3 || nodeData.type === '3'">查看充值历史</el-button>
												</div>
											</div>
										</div>
										
										&lt;!&ndash; 账户充值记录表 begin &ndash;&gt;
										<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormData.topUp.tableShow">
											<div class="bg-color-white br6 w1000 h500 pd-lr10 pos-abs pos-c">
												&lt;!&ndash;<leeTable :lineList="allFormData.topUp.tableData.lineList"
																	:operationAble="true"
																	:buttonList="allFormData.topUp.tableData.buttonList"></leeTable>&ndash;&gt;
												
												<div class="f16 h40 lh40 text-center">充值记录</div>
												
												<el-table
													class="table-style-default"
													border
													:data="allFormData.topUp.tableData.list"
													height="400"
													ref="multipleTable">
													<el-table-column
														prop="index"
														label="序号"
														width="80">
														<template slot-scope="scope">
															{{ scope.$index + 1 }}
														</template>
													</el-table-column>
													<el-table-column
														prop="status"
														label="状态"
														width="100">
														<template slot-scope="scope">
															<span v-if="scope.row.status === 1 || scope.row.status === '1'">已充值</span>
															<span v-if="scope.row.status === 2 || scope.row.status === '2'">已开票</span>
														</template>
													</el-table-column>
													<el-table-column
														prop="datetime"
														label="充值时间"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.dateTime }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="beforeTopUp"
														label="充值前余额"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.beforeTopUp }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="topUp"
														width="150"
														label="本次充值金额">
														<template slot-scope="scope">
															{{ scope.row.topUp }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="afterTopUp"
														label="充值后余额">
														<template slot-scope="scope">
															{{ scope.row.afterTopUp }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="description"
														label="备注">
														<template slot-scope="scope">
															{{ scope.row.description }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="action"
														label="操作">
														<template slot-scope="scope">
															<div @click="openInvoiceAlarm" class="lee-btn lee-btn-text-primary"
																	 v-if="scope.row.status === 1 || scope.row.status === '1'">申请开票</div>
														</template>
													</el-table-column>
												</el-table>
												
												<div @click="closeRechargeAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
													<span class="f22 el-icon-close"></span>
												</div>
											</div>
										</div>
										&lt;!&ndash; 账户充值记录表 end &ndash;&gt;
										
										&lt;!&ndash; 开票窗口 begin &ndash;&gt;
										<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormData.topUp.invoiceShow">
											<div class="bg-color-white br6 w500 pd-lr10 pos-abs pos-c"
													 :class="[{'h260': allFormData.topUp.invoiceType !== 1 && allFormData.topUp.invoiceType !== 2},
													 {'h260': allFormData.topUp.invoiceType === 1},
													 {'h460': allFormData.topUp.invoiceType === 2}]">
												<div class="f16 h40 lh40 text-center form-title">开票</div>
												<div class="pd-lr40 form-content">
													<div class="clear mg-b20">
														<div class="fl w100 h28 lh28 text-right">
															开票类型
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-select
																	class="w100p"
																	size="mini"
																	v-model="allFormData.topUp.invoiceType"
																	placeholder="请选择">
																	<el-option
																		v-for="item in allFormData.topUp.invoiceTypeList"
																		:key="item.id"
																		:label="item.name"
																		:value="item.id">
																	</el-option>
																</el-select>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20">
														<div class="fl w100 h28 lh28 text-right">
															开票名称
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20">
														<div class="fl w100 h28 lh28 text-right">
															纳税人识别号
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															地址
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															电话
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															开户行
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
													
													<div class="clear mg-b20" v-if="allFormData.topUp.invoiceType === 2">
														<div class="fl w100 h28 lh28 text-right">
															银行账号
														</div>
														<div class="pd-l110">
															<div class="pos-relative">
																<el-input size="mini"></el-input>
															</div>
														</div>
													</div>
												</div>
												
												<div class="form-action">
													<div class="clear text-center">
														<el-button @click="confirmInvoice" size="small" type="primary">确定</el-button>
														<el-button @click="closeInvoiceAlarm" size="small">取消</el-button>
													</div>
												</div>
												
												<div @click="closeInvoiceAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
													<span class="f22 el-icon-close"></span>
												</div>
											</div>
										</div>
										&lt;!&ndash; 开票窗口 end &ndash;&gt;
										
										<div class="clear mg-b22">
											<div class="clear pos-relative">
												<div class="fl w33p h30 lh30">
													当前账户余额：
													<span class="color-black">{{ allFormData.baseInfo.balance }}</span>
												</div>
												<div class="fl w33p h30 lh30">
													可用余额：
													<span class="color-green">{{ allFormData.baseInfo.usableBalance }}</span>
												</div>
												<div class="fl w33p h30 lh30">
													在途余额：
													<span class="color-blue">{{ allFormData.baseInfo.processBalance }}</span>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>充值金额</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.amount"
																		size="small"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.amount }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>充值方式</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-select
														class="w100p"
														:disabled="!allFormData.topUpEnable"
														v-model="allFormData.topUp.type"
														size="small"
														placeholder="请选择">
														<el-option
															v-for="item in allFormData.topUp.typeList"
															:key="item.id"
															:label="item.name"
															:value="item.id">
														</el-option>
													</el-select>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.type }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>付款账户</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payAccount"
																		size="small"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.payAccount }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>收款方</div>
											<div class="pd-l110">
												<div class="pd-r90 pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payee"
																		size="small"></el-input>
													<el-button class="w80 pos-abs t0 r0 common-button-medium" size="small" type="primary">复制</el-button>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.payee }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>收款账户</div>
											<div class="pd-l110">
												<div class="pd-r90 pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payeeAccount"
																		size="small"></el-input>
													<el-button class="w80 pos-abs t0 r0 common-button-medium" size="small" type="primary">复制</el-button>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.payeeAccount }}
													</div>
												</div>
											</div>
										</div>
										
										<div class="clear mg-b22">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>开户行</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.bankName"
																		size="small"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.topUpAlarmText.bankName }}
													</div>
												</div>
											</div>
										</div>
										&lt;!&ndash;<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>收款凭证</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.payeeVoucher"
																		size="small"></el-input>
												</div>
											</div>
										</div>&ndash;&gt;
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right">充值说明</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.topUpEnable"
																		v-model="allFormData.topUp.description"
																		size="small"></el-input>
												</div>
											</div>
										</div>
									</div>
								</div>&ndash;&gt;
							</div>
							&lt;!&ndash; 账户充值 end &ndash;&gt;
							
							&lt;!&ndash; 手工调账 begin &ndash;&gt;
							<div class="tab-content-item" v-show="tabData[3].show">
								&lt;!&ndash;<div class="bg-color-white">
									<div class="form-content">
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>账户名称</div>
											<div class="pd-l110">
												<div class="pd-r110 pos-relative">
													<el-input :disabled="!allFormData.changeBillEnable"
																		size="small"
																		v-model="allFormData.baseInfo.accountName"></el-input>
													<el-button @click="openHandsListAlarm"
																		 class="w100 pos-abs t0 r0 common-button-medium"
																		 size="small"
																		 type="primary"
																		 v-if="nodeData.type === 3 || nodeData.type === '3'">查看调账历史</el-button>
												</div>
											</div>
										</div>
										
										&lt;!&ndash; 调账记录表 begin &ndash;&gt;
										<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="allFormData.changeBill.tableShow">
											<div class="bg-color-white br6 w1000 h500 pd-lr10 pos-abs pos-c">
												&lt;!&ndash;<leeTable :lineList="allFormData.topUp.tableData.lineList"
																	:operationAble="true"
																	:buttonList="allFormData.topUp.tableData.buttonList"></leeTable>&ndash;&gt;
												
												<div class="f16 h40 lh40 text-center">调账记录</div>
												
												<el-table
													class="table-style-default"
													border
													:data="allFormData.changeBill.tableData.list"
													height="400"
													ref="multipleTable">
													<el-table-column
														prop="index"
														label="序号"
														width="80">
														<template slot-scope="scope">
															{{ scope.$index + 1 }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="datetime"
														label="调账时间"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.dateTime }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="beforeChange"
														label="调账前余额">
														<template slot-scope="scope">
															{{ scope.row.beforeChange }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="changeType"
														label="调账方式">
														<template slot-scope="scope">
															<span v-if="scope.row.changeType === 1 || scope.row.changeType === '1'">调升</span>
															<span v-if="scope.row.changeType === 2 || scope.row.changeType === '2'">调降</span>
														</template>
													</el-table-column>
													
													<el-table-column
														prop="changeAmount"
														label="充值后余额"
														width="120">
														<template slot-scope="scope">
															{{ scope.row.changeAmount }}
														</template>
													</el-table-column>
													
													<el-table-column
														prop="description"
														label="调账说明">
														<template slot-scope="scope">
															{{ scope.row.description }}
														</template>
													</el-table-column>
												</el-table>
												
												<div @click="closeHandsListAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
													<span class="f22 el-icon-close"></span>
												</div>
											</div>
										</div>
										&lt;!&ndash; 调账记录表 end &ndash;&gt;
										
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>调账金额</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.changeBillEnable" size="small"
																		v-model="allFormData.changeBill.amount"></el-input>
													<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
														{{ allFormData.changeBillAlarmText.amount }}
													</div>
												</div>
											</div>
										</div>
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>调账方式</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-select
														class="w100p"
														:disabled="!allFormData.changeBillEnable"
														v-model="allFormData.changeBill.type"
														size="small"
														placeholder="请选择">
														<el-option
															v-for="item in allFormData.changeBill.typeList"
															:key="item.id"
															:label="item.name"
															:value="item.id">
														</el-option>
													</el-select>
													
												</div>
											</div>
										</div>
										<div class="clear mg-b20">
											<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>调账说明</div>
											<div class="pd-l110">
												<div class="pos-relative">
													<el-input :disabled="!allFormData.changeBillEnable"
																		size="small"
																		v-model="allFormData.changeBill.description"
																		type="textarea"></el-input>
												</div>
											</div>
										</div>
									</div>
								</div>&ndash;&gt;
							</div>
							&lt;!&ndash; 手工调账 end &ndash;&gt;
							
							<div class="form-action">
								<div class="f0 text-center">
									&lt;!&ndash; 保存基本信息 &ndash;&gt;
									<el-button
										@click="saveAccountData(nodeData, buttonList.save.type)"
										class="common-button-medium"
										size="small"
										type="primary"
										v-if="buttonList.save.enabled === true && tabData[0].show === true">保存</el-button>
									
									&lt;!&ndash; 保存支付协议 &ndash;&gt;
									<el-button
										@click="agreementSave()"
										class="common-button-medium"
										size="small"
										type="primary"
										v-if="buttonList.save.enabled === true && tabData[1].show === true">保存</el-button>
									
									&lt;!&ndash; 保存账户充值 &ndash;&gt;
									<el-button
										@click="saveRecharge()"
										class="common-button-medium"
										size="small"
										type="primary"
										v-if="buttonList.save.enabled === true && tabData[2].show === true">保存</el-button>
									
									&lt;!&ndash; 保存手工调账 &ndash;&gt;
									<el-button
										@click="saveChangeBill()"
										class="common-button-medium"
										size="small"
										type="primary"
										v-if="buttonList.save.enabled === true && tabData[3].show === true">保存</el-button>
									
									<el-button
										@click="cancelSave"
										class="mg-l20"
										size="small"
										v-if="buttonList.cancel.enabled === true">取消</el-button>
								</div>
							</div>
						</div>
					</div>-->
					
					<div class="form-action">
						<div class="f0 text-center">
							&lt;!&ndash; 保存基本信息 &ndash;&gt;
							<el-button
								@click="saveAccountData(nodeData, buttonList.save.type)"
								class="common-button-medium"
								size="small"
								type="primary"
								v-if="buttonList.save.enabled === true && tabData[0].show === true">保存</el-button>
							
							&lt;!&ndash; 保存支付协议 &ndash;&gt;
							<el-button
								@click="agreementSave()"
								class="common-button-medium"
								size="small"
								type="primary"
								v-if="buttonList.save.enabled === true && tabData[1].show === true">保存</el-button>
							
							&lt;!&ndash; 保存账户充值 &ndash;&gt;
							<el-button
								@click="saveRecharge()"
								class="common-button-medium"
								size="small"
								type="primary"
								v-if="buttonList.save.enabled === true && tabData[2].show === true">保存</el-button>
							
							&lt;!&ndash; 保存手工调账 &ndash;&gt;
							<el-button
								@click="saveChangeBill()"
								class="common-button-medium"
								size="small"
								type="primary"
								v-if="buttonList.save.enabled === true && tabData[3].show === true">保存</el-button>
							
							<el-button
								@click="cancelSave"
								class="mg-l20"
								size="small"
								v-if="buttonList.cancel.enabled === true">取消</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
	import fa from "../../../../components/src/locale/lang/fa";
	import leeTable from '../../../../components/packages/lee-table/src/tableItem'
	import newTabs from './../../../../components/navigation/tabs/newTabs'
	let id = Math.floor(Math.random() * 1000000); // 6位随机数
	import { baseUrl, formatGetUrl, getBrowserInfo, trimString } from '../../../../../static/js/common'
	import { get, post } from '../../../../util/http'
	import {mapGetters} from 'vuex'
	export default {
		name: "setting-account-manage",
		components: {
			leeTable,
			newTabs
		},
		data() {
			return {
				
				baseUrlData: {}, //请求地址
				
				filterKeyword: '', // 需要过滤的关键词
				
				disabledShow: false, // 是否显示封存的账户(true：显示，false：不显示)
				
				// 已选中节点信息
				nodeData: {
					id: '',
					name: '',
					type: ''
				},
				
				// 按钮列表(show控制按钮是否可点击)
				buttonList: {
					add: { id: 1, name: '新增', enabled: false },
					edit: { id: 2, name: '修改', enabled: false },
					delete: { id: 3, name: '删除', enabled: false },
					stop: { id: 4, name: '封存', enabled: false },
					start: { id: 5, name: '启用', enabled: false },
					
					save: { id: 6, type: 0, enabled: false },
					cancel: { id: 7, enabled: false }
					
					/*payAgreement: { id: 6, name: '支付协议', enabled: false },
					topUp: { id: 7, name: '账户充值', enabled: false },
					changeBill: { id: 8, name: '手工调账', enabled: false },*/
				},
				
				// tab menus
				tableButtons:[
					{id: 1, name: "基本信息"},
					{id: 2, name: "支付协议"},
					{id: 3, name: "账户充值"},
					{id: 4, name: "手工调账"}
				],
				
				// tab current
				currentTab:1,
				
				tabsBoxClassName: 'tabs-box',
				
				slot1: true,
				slot2: false,
				slot3: false,
				slot4: false,
				
				// 表单弹窗状态 (true 显示， false 隐藏)
				formShow: false,
				
				// 表单窗口状态 (0全部隐藏，1新增，2支付协议，3账户充值，4手工调账)
				formShowIndex: 0,
				
				// 账户列表数据
				treeList: [
					/*{
						id: 1,
						name: '机构1',
						type: '0',
						children: [
							{
								id: 101,
								name: '部门1',
								type: '0',
								children: [
									{
										id: 10101,
										isEnabled: true,
										name: '部门子账户1',
										type: '3',
									},
									{
										id: 10102,
										isEnabled: false,
										name: '部门子账户2',
										type: '3'
									},
									{
										id: 10103,
										isEnabled: true,
										name: '部门子账户3',
										type: '3'
									}
								]
							},
							{
								id: 102,
								isEnabled: true,
								name: '部门账户',
								type: '3'
							}
						]
					},
					{
						id: 2,
						name: '机构2',
						type: 'organ',
						children: [
							{
								id: 201,
								name: '部门1',
								type: '0'
							},
							{
								id: 202,
								name: '部门2',
								type: '0'
							},
							{
								id: 203,
								name: '部门3',
								type: '0'
							},
							{
								id: 204,
								name: '部门4',
								type: '0'
							},
							{
								id: 205,
								name: '部门5',
								type: '0'
							},
						]
					},
					{
						id: 3,
						name: '机构3',
						type: '0'
					}*/
				],
				
				// 账户列表数据树形节点设置
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				
				// tab 数据
				tabData: [
					{
						id: 1,
						name: '基本信息',
						show: true
					},
					{
						id: 2,
						name: '支付协议',
						show: false
					},
					{
						id: 3,
						name: '账户充值',
						show: false
					},
					{
						id: 4,
						name: '手工调账',
						show: false
					}
				],
				
				// 是否允许tab切换
				tabEnabled: false,
				
				// 表单数据(总数据，用于新增、修改、回显)
				allFormData: {
					
					// 基本信息
					baseInfo: {
						accountName: '', // 账户名称
						accountId: '', // 账户ID
						organName: '', // 机构名称
						organCode: '', // 机构编码
						createDateTime: '', // 创建日期
						balance: '', // 初始余额
						
						processBalance: '', // 途中余额
						usableBalance: '', // 可用余额
						
						payType: '', // 付款方式
						
						// 付款方式下拉框数据
						payTypeList: [
							{
								id: '1',
								name: '预付费'
							},
							{
								id: '2',
								name: '后付费'
							}
						],
						
						//余额换算比例
						ratio: {
							mobile: '',
							unicom: '',
							telecom: ''
						},
						
						//余额换算比例下拉列表(1% ~ 100%)
						ratioPercentList: [
							{ id: 1, per: '1%' },
							{ id: 2, per: '2%' },
							{ id: 3, per: '3%' },
							{ id: 4, per: '4%' },
							{ id: 5, per: '5%' },
							{ id: 6, per: '6%' },
							{ id: 7, per: '7%' },
							{ id: 8, per: '8%' },
							{ id: 9, per: '9%' },
							{ id: 10, per: '10%' },
							{ id: 11, per: '11%' },
							{ id: 12, per: '12%' },
							{ id: 13, per: '13%' },
							{ id: 14, per: '14%' },
							{ id: 15, per: '15%' },
							{ id: 16, per: '16%' },
							{ id: 17, per: '17%' },
							{ id: 18, per: '18%' },
							{ id: 19, per: '19%' },
							{ id: 20, per: '20%' },
							{ id: 21, per: '21%' },
							{ id: 22, per: '22%' },
							{ id: 23, per: '23%' },
							{ id: 24, per: '24%' },
							{ id: 25, per: '25%' },
							{ id: 26, per: '26%' },
							{ id: 27, per: '27%' },
							{ id: 28, per: '28%' },
							{ id: 29, per: '29%' },
							{ id: 30, per: '30%' },
							{ id: 31, per: '31%' },
							{ id: 32, per: '32%' },
							{ id: 33, per: '33%' },
							{ id: 34, per: '34%' },
							{ id: 35, per: '35%' },
							{ id: 36, per: '36%' },
							{ id: 37, per: '37%' },
							{ id: 38, per: '38%' },
							{ id: 39, per: '39%' },
							{ id: 40, per: '40%' },
							{ id: 41, per: '41%' },
							{ id: 42, per: '42%' },
							{ id: 43, per: '43%' },
							{ id: 44, per: '44%' },
							{ id: 45, per: '45%' },
							{ id: 46, per: '46%' },
							{ id: 47, per: '47%' },
							{ id: 48, per: '48%' },
							{ id: 49, per: '49%' },
							{ id: 50, per: '50%' },
							{ id: 51, per: '51%' },
							{ id: 52, per: '52%' },
							{ id: 53, per: '53%' },
							{ id: 54, per: '54%' },
							{ id: 55, per: '55%' },
							{ id: 56, per: '56%' },
							{ id: 57, per: '57%' },
							{ id: 58, per: '58%' },
							{ id: 59, per: '59%' },
							{ id: 60, per: '60%' },
							{ id: 61, per: '61%' },
							{ id: 62, per: '62%' },
							{ id: 63, per: '63%' },
							{ id: 64, per: '64%' },
							{ id: 65, per: '65%' },
							{ id: 66, per: '66%' },
							{ id: 67, per: '67%' },
							{ id: 68, per: '68%' },
							{ id: 69, per: '69%' },
							{ id: 70, per: '70%' },
							{ id: 71, per: '71%' },
							{ id: 72, per: '72%' },
							{ id: 73, per: '73%' },
							{ id: 74, per: '74%' },
							{ id: 75, per: '75%' },
							{ id: 76, per: '76%' },
							{ id: 77, per: '77%' },
							{ id: 78, per: '78%' },
							{ id: 79, per: '79%' },
							{ id: 80, per: '80%' },
							{ id: 81, per: '81%' },
							{ id: 82, per: '82%' },
							{ id: 83, per: '83%' },
							{ id: 84, per: '84%' },
							{ id: 85, per: '85%' },
							{ id: 86, per: '86%' },
							{ id: 87, per: '87%' },
							{ id: 88, per: '88%' },
							{ id: 89, per: '89%' },
							{ id: 90, per: '90%' },
							{ id: 91, per: '91%' },
							{ id: 92, per: '92%' },
							{ id: 93, per: '93%' },
							{ id: 94, per: '94%' },
							{ id: 95, per: '95%' },
							{ id: 96, per: '96%' },
							{ id: 97, per: '97%' },
							{ id: 98, per: '98%' },
							{ id: 99, per: '99%' },
							{ id: 100, per: '100%' }
						],
						
						accountHeadName: '', // 账户负责人
						accountHeadID: '', // 账户负责人ID
						accountHeadPhone: '', // 账户负责人联系方式
						maintenanceHeadName: '', // 运维负责人
						maintenanceHeadId: '', // 运维负责人ID
						maintenanceHeadPhone: '', // 运维负责人联系方式
						accountServiceNum: '', // 账户特服号
						billDate: '', // 账单日
						customerMark: '', // 账户签名
						
						chargingType: '', // 计费原则
						// 计费原则列表
						chargingTypeList: [
							{ id: '1', name: '提交计费' },
							{ id: '2', name: '仅成功计费' },
							{ id: '3', name: '未知及成功即计费' }
						],
						
						state: ''
					},
					baseInfoEnable: false, // 是否允许编辑(基本信息)
					
					// 基本信息提示文字
					baseInfoAlarmText: {
						accountName: '',
					},
					
					// 支付协议
					payAgreement: {
						description: '', // 说明
						
						// 协议列表
						payAgreementTableData: [],
						
						// 协议列表行内容
						payAgreementTableRowData: [],
						
						// 业务类型下拉框
						businessTypeList: [
							{ id: 0, name: '不限' },
							{ id: 1, name: '短信' },
							{ id: 2, name: '彩信' }
						],
						
						// 信息类型下拉框(需请求字典数据)
						smsTypeList: [
							{id: 0, name: '不限'},
							{id: 1, name: '验证码'},
							{id: 2, name: '会员'},
							{id: 3, name: '信用卡'},
							{id: 4, name: '商超'},
							{id: 5, name: '网贷'}
						],
						
						// 运营商下拉框
						operatorTypeList: [
							{ id: 0, name: '不限' },
							{ id: 1, name: '移动' },
							{ id: 2, name: '联通' },
							{ id: 3, name: '电信' }
						],
						
						// 发送数量级表单数据
						sentLevelData: {
							type: '',
							
							content: [
								{max: ''}, // 最大值
								{min: '', max: ''}, // 区间
								{min: ''}, // 最小值
							],
						},
						
						// 发送数量级表单数据提示文字
						sentLevelDataAlarmText: {
							type: '',
							
							content: [
								{max: ''}, // 最大值
								{min: '', max: ''}, // 区间
								{min: ''}, // 最小值
							],
						},
						
						currentRowIndex: null, // 当前操作行序号
						
						sentLevelAlarmShow: false // 发送数量级窗口 (true：显示, false：隐藏)
						
					},
					payAgreementEnable: false, // 是否允许编辑(支付协议)
					
					// 账户充值
					topUp: {
						balance: '', // 当前账户余额
						balanceEnabled: '', // 可用余额
						amount: '', // 充值金额
						type: '', // 充值方式
						
						// 充值方式(下拉列表)
						typeList: [
							{id: '1', name: '支付宝'},
							{id: '2', name: '微信'},
							{id: '3', name: '网银'}
						],
						payAccount: '', // 付款账户
						payee: '', // 收款方
						bankName: '', //开户行
						payeeAccount: '', // 收款方账号
						payeeVoucher: '', // 付款凭证
						description: '', // 充值说明
						
						// 充值记录列表数据
						tableData: {
							list: [],
							lineList:[
								{'label':'序号','prop':'','width':"","class":"className"},
								{'label':'状态','prop':'dictDataValueTwo','width':"","class":"aaa"},
								{'label':'充值时间','prop':'remark','width':"","class":"className"},
								{'label':'充值前余额','prop':'dictDataName','width':"","class":"className"},
								{'label':'本次充值金额','prop':'status','width':"","class":"className"},
								{'label':'充值后金额','prop':'status','width':"","class":"className"},
								{'label':'备注','prop':'status','width':"","class":"className"},
								{'label':'操作','prop':'status','width':"","class":"className"},
							],
							buttonList: [
								{'text':'申请开票','prop':'dictDataValue','width':"200"}
							]
						},
						tableShow: false,
						
						// 发票窗口 (true：显示，false：隐藏)
						invoiceShow: false,
						
						// 发票类型
						invoiceType: null,
						
						// 发票类型下拉列表
						invoiceTypeList: [
							{id: 1, name: '普票'},
							{id: 2, name: '专票'},
						],
						
						// 开票信息
						invoiceData: {
							type: 1,
							invoiceName: '', // 开票名称
							taxpayerIdentityNumber: '', // 纳税人识别号
							address: '', // 地址
							phone: '', // 电话
							bankName: '', //开户行
							bankNameNum: '' // 银行账号
						}
					},
					
					topUpEnable: false, //是否允许编辑(账户充值)
					
					// 充值提示文字
					topUpAlarmText: {
						amount: '', // 充值金额提示文字
						type: '', // 充值方式提示文字
						payAccount: '', // 付款账户提示文字
						payee: '', // 收款方提示文字
						bankName: '', //开户行提示文字
						payeeAccount: '', // 收款方账号提示文字
					},
					
					// 手工调账
					changeBill: {
						type: '', // 调账方式
						
						// 调账方式(下拉列表)
						typeList: [
							{id: '1', name: '调增'},
							{id: '2', name: '调减'}
						],
						
						amount: '', // 调整金额
						description: '', //调整说明
						
						// 调账记录列表数据
						tableData: {
							list: [],
						},
						tableShow: false
					},
					
					changeBillEnable: false, // 是否允许编辑(手工调账)
					
					// 手工调账提示文字
					changeBillAlarmText: {
						amount: '',
					}
				}
			};
		},
		
		computed:{
			// 获得getters的数据
			...mapGetters([
				// 'getTableList',
				'getWatchTableList',
				'getInputDisabled'
			]),
			watchTableList:{
				get:function(){
					return this.getWatchTableList
				},
				set:function(){
					return this.setWatchTableList(val)
				}
			},
			inputDisabled:{
				get: function () {
					return this.getInputDisabled;
				},
				set: function (val) {
					this.setInputDisabled(val);
				}
			},
		},
		
		created() {
			this.baseUrlData = baseUrl(); //获取baseUrl，用于发送http请求
			this.getTreeData(); // 初始化机构账户树数据
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
				if (index === 1 && (this.nodeData.type === 3 || this.nodeData.type === '3')) {
					this.agreementDetail(this.nodeData.id);
				}
			},
			
			// 切换选项卡
			changeTab(item) {
				console.log(item);
				
				// if (item.id === 2 && (this.nodeData.type === 3 || this.nodeData.type === '3')) {
				// 	this.agreementDetail(this.nodeData.id);
				// 	console.log('action');
				// }
				
				if (item.id === 1) {
					this.handleTab(0);
					this.slot1 = true;
					this.slot2 = false;
					this.slot3 = false;
					this.slot4 = false;
					this.currentTab = item.id;
				}
				else if (item.id === 2) {
					this.handleTab(1);
					this.slot1 = false;
					this.slot2 = true;
					this.slot3 = false;
					this.slot4 = false;
					this.currentTab = item.id;
				}
				else if (item.id === 3) {
					this.handleTab(2);
					this.slot1 = false;
					this.slot2 = false;
					this.slot3 = true;
					this.slot4 = false;
					this.currentTab = item.id;
				}
				else if (item.id === 4) {
					this.handleTab(3);
					this.slot1 = false;
					this.slot2 = false;
					this.slot3 = false;
					this.slot4 = true;
					this.currentTab = item.id;
				}
			},
			
			// 监听被点击的节点 (点击后实时更新读取节点数据)
			handleNodeClick(data, vx) {
				console.log(data, vx);
				
				this.nodeData = data;
				this.buttonControl(data);
				this.resetAllFormData();
				this.handleTab(0); // tab初始化(切换到第一项)
				this.changeTab({id: 1}); // tab初始化(切换到第一项)
				if (this.nodeData.id) {
					this.tabEnabled = true; // 激活tab
				}
				
				this.allFormData.baseInfoEnable = false;
				this.allFormData.payAgreementEnable = false;
				this.allFormData.topUpEnable = false;
				this.allFormData.changeBillEnable = false;
				console.log(this.nodeData);
			},
			
			//按钮状态
			buttonControl(data) {
				let nodeData = data;
				if (nodeData.id && nodeData.name && nodeData.type) {
					if (nodeData.type * 1 === 0) {
						console.log('当前选中的为机构、部门节点');
						this.buttonList.add.enabled = true;
						this.buttonList.edit.enabled = false;
						this.buttonList.delete.enabled = false;
						this.buttonList.start.enabled = false;
						this.buttonList.stop.enabled = false;
						
						this.allFormData.baseInfo.organName = nodeData.name;
						this.allFormData.baseInfo.organCode = nodeData.id;
					}
					else if (nodeData.type * 1 === 3) {
						console.log('当前选中的为账户节点');
						
						this.returnAllFormData(this.nodeData.id);
						
						if (nodeData.use === true) {
							this.buttonList.start.enabled = true;
							this.buttonList.stop.enabled = false;
						} else {
							this.buttonList.start.enabled = false;
							this.buttonList.stop.enabled = true;
						}
						this.buttonList.add.enabled = false;
						this.buttonList.edit.enabled = true;
						this.buttonList.delete.enabled = true;
					}
				} else {
					console.log('读取节点数据失败！');
				}
			},
			
			// 新增账户
			openAddForm() {
				this.resetAllFormData();
				this.handleTab(0);
				this.allFormData.baseInfoEnable = true;
				this.allFormData.payAgreementEnable = true;
				this.allFormData.topUpEnable = true;
				this.allFormData.changeBillEnable = true;
				this.buttonList.save.enabled = true;
				this.buttonList.cancel.enabled = true;
				this.buttonList.save.type = 0;
			},
			
			// 修改账户
			openEditForm() {
				// console.log(this.nodeData.id);
				
				this.allFormData.baseInfoEnable = true;
				this.allFormData.payAgreementEnable = true;
				this.allFormData.topUpEnable = true;
				this.allFormData.changeBillEnable = true;
				this.buttonList.save.enabled = true;
				this.buttonList.cancel.enabled = true;
				this.buttonList.save.type = 1;
				// this.returnAllFormData(this.nodeData.id);
			},
			
			//保存账户表单数据
			saveAccountData(node, saveType) {
				
				// 新增数据
				if (saveType === 0) {
					let postData = {
						accountExtendNum: "", // 账户扩展号 (string)
						accountHandlerUid: "", // 账户负责人ID (string)
						accountHandlerUname: trimString(this.allFormData.baseInfo.accountHeadName), // 账户负责人名称 (string)
						accountHandlerMobile: trimString(this.allFormData.baseInfo.accountHeadPhone), // 账户负责人电话 (string)
						autograph: trimString(this.allFormData.baseInfo.customerMark), // 账户签名 (string)
						balance: trimString(this.allFormData.baseInfo.balance), // 账户余额 (string)
						billedDay: trimString(this.allFormData.baseInfo.billDate), // 账单日 (string)
						chargingType: trimString(this.allFormData.baseInfo.chargingType), // 计费原则
						id: "", // 账户ID
						name: trimString(this.allFormData.baseInfo.accountName), // 账户名称 (string)
						operationsHandlerUid: trimString(this.allFormData.baseInfo.maintenanceHeadId), // 运维负责人ID (string)
						operationsHandlerUname: trimString(this.allFormData.baseInfo.maintenanceHeadName), // 运维负责人名称 (string)
						operationsHandlerMobile: trimString(this.allFormData.baseInfo.maintenanceHeadPhone), // 运维负责人电话 (string)
						orgCode: trimString(this.allFormData.baseInfo.organCode), // 机构、部门编号 (string)
						orgName: trimString(this.allFormData.baseInfo.organName), // 机构、部门名称 (string)
						payType: this.allFormData.baseInfo.payType, // 支付方式
						quotaRatioCmcc: this.allFormData.baseInfo.ratio.mobile * 1, // 移动配额比例 (number)
						quotaRatioCtcc: this.allFormData.baseInfo.ratio.telecom * 1, // 电信配额比例 (number)
						quotaRatioCucc: this.allFormData.baseInfo.ratio.unicom * 1, // 联通配额比例 (number)
						state: ""
					};
					
					console.log(postData);
					
					let isTrue = this.checkAllFormData(postData);
					
					if (isTrue === true) {
						post(this.baseUrlData.url_01 + ':8080/account/save', postData).then((res) => {
							console.log(res.data);
							this.getTreeData();
							this.$message({
								message: '已成功新增帐号：' + this.allFormData.baseInfo.accountName,
								type: 'success'
							});
							this.resetAllFormData(); // 重置表单数据
							this.tabEnabled = false; // 禁用tab菜单
							this.cancelSave();
						}).catch((res) => {
							console.log();
						});
					}
				}
				
				// 修改并保存数据
				else if (saveType === 1) {
					
					console.log(this.allFormData.baseInfo);
					
					let postData = {
						accountExtendNum: "", // 账户扩展号 (string)
						accountHandlerUid: "", // 账户负责人ID (string)
						accountHandlerUname: trimString(this.allFormData.baseInfo.accountHeadName), // 账户负责人名称 (string)
						accountHandlerMobile: trimString(this.allFormData.baseInfo.accountHeadPhone), // 账户负责人电话 (string)
						autograph: trimString(this.allFormData.baseInfo.customerMark), // 账户签名 (string)
						balance: trimString(this.allFormData.baseInfo.balance), // 账户余额 (string)
						billedDay: trimString(this.allFormData.baseInfo.billDate), // 账单日 (string)
						chargingType: trimString(this.allFormData.baseInfo.chargingType), // 计费原则
						id: trimString(this.allFormData.baseInfo.accountId), // 账户ID
						name: trimString(this.allFormData.baseInfo.accountName), // 账户名称
						operationsHandlerUid: trimString(this.allFormData.baseInfo.maintenanceHeadId), // 运维负责人ID
						operationsHandlerUname: trimString(this.allFormData.baseInfo.maintenanceHeadName), // 运维负责人名称
						operationsHandlerMobile: trimString(this.allFormData.baseInfo.maintenanceHeadPhone), // 运维负责人电话 (string)
						orgCode: trimString(this.allFormData.baseInfo.organCode), // 机构、部门编号
						orgName: trimString(this.allFormData.baseInfo.organName), // 机构、部门名称
						payType: this.allFormData.baseInfo.payType, // 支付方式
						quotaRatioCmcc: this.allFormData.baseInfo.ratio.mobile * 1, // 移动配额比例 (number)
						quotaRatioCtcc: this.allFormData.baseInfo.ratio.telecom * 1, // 电信配额比例 (number)
						quotaRatioCucc: this.allFormData.baseInfo.ratio.unicom * 1, // 联通配额比例 (number)
						state: '' // 状态值
					};
					
					console.log(postData);
					
					let isTrue = this.checkAllFormData(postData);
					
					if (isTrue === true) {
						post(this.baseUrlData.url_01 + ':8080/account/edit', postData).then((res) => {
							console.log(res.data);
							
							if (res.data.error * 1 === 0) {
								this.getTreeData();
								this.$message({
									message: '已成功修改帐号：' + this.allFormData.baseInfo.accountName,
									type: 'success'
								});
								this.resetAllFormData(); // 重置表单数据
								this.tabEnabled = false; // 禁用tab菜单
								this.cancelSave();
							} else {
								this.$message({
									message: res.data.error_description,
									type: 'warning'
								});
							}
							
						}).catch((res) => {
							console.log();
						});
					}
				}
			},
			
			// 新增表格空白行
			addPayAgreementTableDataRow() {
				
				// 协议列表行内容
				let obj = {
					accountId: this.nodeData.id, // 账户ID
					businessType: 0, // 业务类型(0：空值，1：不限，2：短信，3：彩信)
					messageType: 0, // 信息类型(0：空值，1：不限，2：验证码，3：会员，4：信用卡，5：商超，6：网贷)
					operatorType: 0, // 运营商(0：空值，1：不限，2：移动，3：联通，电信：4)
					numberOfMonth: '', // 月发送数量级类型
					unitPrice: '' // 单价
				};
				this.allFormData.payAgreement.payAgreementTableData.push(obj);
			},
			
			// 打开设置发送数量级窗口
			openSentLevelAlarm(rowIndex, rowData) {
				console.log(rowIndex);
				this.allFormData.payAgreement.currentRowIndex = rowIndex;
				
				this.allFormData.payAgreement.sentLevelData.type = '';
				this.allFormData.payAgreement.sentLevelData.content[0].max = '';
				this.allFormData.payAgreement.sentLevelData.content[1].min = '';
				this.allFormData.payAgreement.sentLevelData.content[1].max = '';
				this.allFormData.payAgreement.sentLevelData.content[2].min = '';
				
				this.allFormData.payAgreement.sentLevelDataAlarmText.content[0].max = '';
				this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '';
				this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '';
				this.allFormData.payAgreement.sentLevelDataAlarmText.content[2].min = '';
				
				// console.log(rowData.numberOfMonth);
				
				if (rowData.numberOfMonth) {
					
					if (typeof(rowData.numberOfMonth) === 'object') {
						let obj = rowData.numberOfMonth;
						
						// console.log(obj);
						
						// 回显1类型数据
						if (obj.type === 1) {
							this.allFormData.payAgreement.sentLevelData.type = 1;
							this.allFormData.payAgreement.sentLevelData.content[0].max = obj.max;
						}
						
						// 回显2类型数据
						else if (obj.type === 2) {
							this.allFormData.payAgreement.sentLevelData.type = 2;
							this.allFormData.payAgreement.sentLevelData.content[1].min = obj.max;
							this.allFormData.payAgreement.sentLevelData.content[1].max = obj.min;
						}
						
						// 回显3类型数据
						else if (obj.type === 3) {
							this.allFormData.payAgreement.sentLevelData.type = 3;
							this.allFormData.payAgreement.sentLevelData.content[2].min = obj.min;
						}
					}
				}
				
				this.allFormData.payAgreement.sentLevelAlarmShow = true;
			},
			
			// 保存发送数量级数据
			saveSentLevel(rowIndex) {
				// 保存1类型数据
				if (this.allFormData.payAgreement.sentLevelData.type === 1) {
					console.log('保存1类型数据');
					let maxNum = this.allFormData.payAgreement.sentLevelData.content[0].max;
					
					let isTrue = true;
					
					console.log(maxNum);
					
					if (maxNum) {
						if (isNaN(maxNum * 1) === true) {
							isTrue = false;
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[0].max = '请输入数字'
						} else {
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[0].max = ''
						}
					} else {
						isTrue = false;
						this.allFormData.payAgreement.sentLevelDataAlarmText.content[0].max = '请输入最大值'
					}
					
					if (isTrue === true) {
						let obj = {
							type: 1,
							max: maxNum
						};
						this.allFormData.payAgreement.payAgreementTableData[rowIndex].numberOfMonth = obj;
						this.allFormData.payAgreement.sentLevelAlarmShow = false;
					}
				}
				
				// 保存2类型数据
				else if (this.allFormData.payAgreement.sentLevelData.type === 2) {
					console.log('保存2类型数据');
					let minNum = this.allFormData.payAgreement.sentLevelData.content[1].min;
					let maxNum = this.allFormData.payAgreement.sentLevelData.content[1].max;
					
					let isTrue = true;
					
					// 最小值、最大值都不为空
					if (minNum && maxNum) {
						if (isNaN(minNum * 1) === true) {
							isTrue = false;
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '请输入数字';
						} else {
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '';
						}
						
						if (isNaN(maxNum * 1) === true) {
							isTrue = false;
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '请输入数字';
						} else {
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '';
						}
						
						if (isNaN(minNum * 1) !== true && isNaN(maxNum * 1) !== true) {
							// console.log((minNum * 1) > (maxNum * 1));
							if ((minNum * 1) > (maxNum * 1)) {
								isTrue = false;
								this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '最小值不能超过最大值';
								this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '最大值不能小于最小值';
							} else {
								this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '';
								this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '';
							}
						}
					}
					
					// 最小值为空，最大值不为空
					else if (!minNum && maxNum) {
						this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '请输入最小值';
						isTrue = false;
						if (isNaN(maxNum * 1) === true) {
							isTrue = false;
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '请输入数字';
						} else {
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '';
						}
					}
					
					// 最小值不为空，最大值为空
					else if (minNum && !maxNum) {
						this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '请输入最大值';
						isTrue = false;
						if (isNaN(minNum * 1) === true) {
							isTrue = false;
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '请输入数字';
						} else {
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '';
						}
					}
					
					// 最小值、最大值都为空
					else if (!minNum && !maxNum) {
						isTrue = false;
						this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].min = '请输入最小值';
						this.allFormData.payAgreement.sentLevelDataAlarmText.content[1].max = '请输入最大值';
					}
					
					if (isTrue === true) {
						let obj = {
							type: 2,
							min: minNum,
							max: maxNum,
						};
						this.allFormData.payAgreement.payAgreementTableData[rowIndex].numberOfMonth = obj;
						this.allFormData.payAgreement.sentLevelAlarmShow = false;
					}
				}
				
				// 保存3类型数据
				else if (this.allFormData.payAgreement.sentLevelData.type === 3) {
					console.log('保存3类型数据');
					let minNum = this.allFormData.payAgreement.sentLevelData.content[2].min;
					let isTrue = true;
					
					console.log(minNum);
					
					if (minNum) {
						if (isNaN(minNum * 1) === true) {
							isTrue = false;
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[2].min = '请输入数字';
						} else {
							this.allFormData.payAgreement.sentLevelDataAlarmText.content[2].min = '';
						}
					} else {
						isTrue = false;
						this.allFormData.payAgreement.sentLevelDataAlarmText.content[2].min = '请输入最小值';
					}
					
					if (isTrue === true) {
						let obj = {
							type: 3,
							min: minNum
						};
						this.allFormData.payAgreement.payAgreementTableData[rowIndex].numberOfMonth = obj;
						this.allFormData.payAgreement.sentLevelAlarmShow = false;
					}
				}
				
				
			},
			
			// 取消保存发送数量级数据
			cancelSaveSentLevel() {
				this.allFormData.payAgreement.sentLevelAlarmShow = false;
			},
			
			// 保存支付协议
			agreementSave() {
				/*this.allFormData.payAgreement.payAgreementTableData = [
					{
						accountId: this.nodeData.id, // 账户ID
						businessType: 1, // 业务类型(0：空值，1：不限，2：短信，3：彩信)
						messageType: 1, // 信息类型(0：空值，1：不限，2：验证码，3：会员，4：信用卡，5：商超，6：网贷)
						operatorType: 1, // 运营商(0：空值，1：不限，2：移动，3：联通，电信：4)
						numberOfMonth: '100000以下', // 月发送数量级类型
						unitPrice: '0.5' // 单价
					},
					{
						accountId: this.nodeData.id, // 账户ID
						businessType: 1, // 业务类型(0：空值，1：不限，2：短信，3：彩信)
						messageType: 1, // 信息类型(0：空值，1：不限，2：验证码，3：会员，4：信用卡，5：商超，6：网贷)
						operatorType: 1, // 运营商(0：空值，1：不限，2：移动，3：联通，电信：4)
						numberOfMonth: '100000 - 200000', // 月发送数量级类型
						unitPrice: '0.7' // 单价
					}
				];*/
				
				// let provides = this.allFormData.payAgreement.payAgreementTableData;
				let postData = {
					accountId: trimString(this.allFormData.baseInfo.accountId), // 账户ID
					accountName: trimString(this.allFormData.baseInfo.accountName), // 账户名称
					description: trimString(this.allFormData.payAgreement.description), // 说明
					id: "", // 空
					provides: this.allFormData.payAgreement.payAgreementTableData
				};
				
				/*if (typeof(provides) === 'object') {
					let len = provides.length;
					for (let i = 0; i < len; i ++) {
					
					}
				}*/
				
				console.log(postData);
				
				/*post(this.baseUrlData.url_01 + ':8080/account/agreementSave', postData).then((res) => {
					if (res.data.error * 1 === 0) {
						this.$message({
							message: res.data.error_description,
							type: 'success'
						});
					} else {
						this.$message({
							message: res.data.error_description,
							type: 'warning'
						});
					}
				}).catch();*/
			},
			
			// 获取支付协议详情
			agreementDetail(id) {
				this.resetPayAgreementData();
				get(this.baseUrlData.url_01 + ':8080/account/agreementDetail/' + id).then((res) => {
					if (res.data.error * 1 === 0) {
						let resData = res.data.data;
						
						console.log(resData);
						
						this.allFormData.payAgreement.description = resData.description; // 初始化支付协议说明
						
						if (typeof(resData.provides) === 'object') {
							this.allFormData.payAgreement.payAgreementTableData = resData.provides; // 初始化支付协议表格数据
						}
						
						this.$message({
							message: '已成功读取支付协议信息',
							type: 'success'
						});
					} else {
						this.$message({
							message: res.data.error_description,
							type: 'warning'
						});
					}
				}).catch();
			},
			
			// 初始化支付协议详情数据
			resetPayAgreementData() {
				this.allFormData.payAgreement.description = ''; // 初始化支付协议说明
				this.allFormData.payAgreement.payAgreementTableData = []; // 初始化支付协议表格数据
			},
			
			// 保存账户充值
			saveRecharge() {
				let isTrue = this.checkTopUpData();
				let postData = {
					accountId: trimString(this.allFormData.baseInfo.accountId), // 账户ID
					accountName: trimString(this.allFormData.baseInfo.accountName), // 账户名称
					description: trimString(this.allFormData.topUp.description), // 付款说明
					id: "",
					paymentAccountName: trimString(this.allFormData.topUp.payAccount), // 付款账户
					quota: trimString(this.allFormData.topUp.amount), //充值金额
					receivablesAccount: trimString(this.allFormData.topUp.payeeAccount), // 收款账户
					receivablesAccountName: trimString(this.allFormData.topUp.bankName), // 开户行
					receivablesName: trimString(this.allFormData.topUp.payee), // 收款方
					type: this.allFormData.topUp.type // 充值方式
				};
				
				if (isTrue === true) {
					post(this.baseUrlData.url_01 + ':8080/account/recharge', postData).then((res) => {
						if (res.data.error * 1 === 0) {
							this.cancelSave();
							this.getTreeData();
							this.$message({
								message: '已成功充值' + this.allFormData.topUp.amount + '元',
								type: 'success'
							});
							this.resetAllFormData();
							this.handleTab(0);
						} else {
							this.$message({
								message: res.data.error_description,
								type: 'warning'
							});
						}
					}).catch();
				}
			},
			
			// 打开充值记录窗口
			openRechargeAlarm() {
				this.resetRechargeTable();
				this.allFormData.topUp.tableShow = true;
				this.getRechargeList(this.nodeData.id);
			},
			
			// 关闭充值记录窗口
			closeRechargeAlarm() {
				this.allFormData.topUp.tableShow = false;
				this.resetRechargeTable();
			},
			
			// 初始化充值列表数据
			resetRechargeTable() {
				this.allFormData.topUp.tableData.list = [];
			},
			
			// 获取充值记录
			getRechargeList(id) {
				
				/*let list = [
					{id: 1, status: 1, datetime: '2019-02-28', beforeTopUp: 10000, topUp: 2000, afterTopUp: 12000, description: ''},
					{id: 2, status: 2, datetime: '2019-02-23', beforeTopUp: 20000, topUp: 2000, afterTopUp: 22000, description: ''},
					{id: 3, status: 2, datetime: '2019-02-16', beforeTopUp: 16000, topUp: 5000, afterTopUp: 21000, description: ''},
					{id: 4, status: 1, datetime: '2019-02-12', beforeTopUp: 12000, topUp: 3000, afterTopUp: 15000, description: ''},
					{id: 5, status: 2, datetime: '2019-02-08', beforeTopUp: 18000, topUp: 2000, afterTopUp: 20000, description: ''}
				];*/
				
				let list = [];
				
				get(this.baseUrlData.url_01 + ':8080/account/rechargeList/' + id).then((res) => {
					if (res.data.error * 1 === 0) {
						console.log(res.data);
						
						let resTableData = res.data.data;
						
						if (typeof(resTableData) === 'object') {
							let len = resTableData.length;
							for (let i = 0; i < len; i ++) {
								let obj = {
									id: resTableData[i].id,
									status: 1,
									datetime: '2019-02-28',
									beforeTopUp: resTableData[i].quota ? resTableData[i].quota : '',
									topUp: 2000,
									afterTopUp: 12000,
									description: ''
								};
								list.push(obj);
							}
						}
						
						this.allFormData.topUp.tableShow = true;
						
						this.allFormData.topUp.tableData.list = list;
						
						this.$message({
							message: '已获取充值记录',
							type: 'success'
						});
					} else {
						this.$message({
							message: res.data.error_description,
							type: 'warning'
						});
					}
				}).catch();
			},
			
			// 打开开票窗口
			openInvoiceAlarm() {
				this.allFormData.topUp.invoiceShow = true;
			},
			
			// 确认开票
			confirmInvoice() {
			
			},
			
			// 关闭开票窗口
			closeInvoiceAlarm() {
				this.allFormData.topUp.invoiceShow = false;
			},
			
			// 验证充值数据
			checkTopUpData() {
				let isTrue = true;
				
				let amount = trimString(this.allFormData.topUp.amount); // 充值金额
				let type = this.allFormData.topUp.type; // 充值方式
				let payAccount = trimString(this.allFormData.topUp.payAccount); // 付款账户
				let payeeAccount = trimString(this.allFormData.topUp.payeeAccount); // 收款账户
				let bankName = this.allFormData.topUp.bankName; // 开户行
				let payee = trimString(this.allFormData.topUp.payee); // 收款方
				
				// 验证充值金额(不能为空，且必须为数字)
				if (amount.length > 0) {
					
					if (isNaN(amount * 1) === true) {
						isTrue = false;
						this.allFormData.topUpAlarmText.amount = '充值金额必须为数字';
					} else {
						this.allFormData.topUpAlarmText.amount = '';
					}
				} else {
					isTrue = false;
					this.allFormData.topUpAlarmText.amount = '请输入充值金额';
				}
				
				// 验证充值方式
				if (type) {
					this.allFormData.topUpAlarmText.type = '';
				} else {
					isTrue = false;
					this.allFormData.topUpAlarmText.type = '请选择充值方式';
				}
				
				// 验证付款账户
				if (payAccount.length > 0) {
					this.allFormData.topUpAlarmText.payAccount = '';
				} else {
					isTrue = false;
					this.allFormData.topUpAlarmText.payAccount = '请输入付款账户';
				}
				
				// 验证收款账户
				if (payeeAccount.length > 0) {
					this.allFormData.topUpAlarmText.payeeAccount = '';
				} else {
					isTrue = false;
					this.allFormData.topUpAlarmText.payeeAccount = '请输入收款账户';
				}
				
				// 验证开户行
				if (bankName.length > 0) {
					this.allFormData.topUpAlarmText.bankName = '';
				} else {
					isTrue = false;
					this.allFormData.topUpAlarmText.bankName = '请输入开户行';
				}
				
				// 验证收款方
				if (payee.length > 0) {
					this.allFormData.topUpAlarmText.payee = '';
				} else {
					isTrue = false;
					this.allFormData.topUpAlarmText.payee = '请输入收款方';
				}
				
				console.log(isTrue);
				
				return isTrue;
			},
			
			// 保存调账数据
			saveChangeBill() {
				let isTrue = this.checkChangeBill();
				let postData = {
					accountId: trimString(this.allFormData.baseInfo.accountId), // 账户ID,
					accountName: trimString(this.allFormData.baseInfo.accountName), // 账户名称,
					description: this.allFormData.changeBill.description, // 调账说明
					quota: trimString(this.allFormData.changeBill.amount), // 调账金额
					type: trimString(this.allFormData.changeBill.type) // 调账方式
				};
				
				if (isTrue === true) {
					post(this.baseUrlData.url_01 + ':8080/account/handsAccountSave', postData).then((res) => {
						if (res.data.error * 1 === 0) {
							this.cancelSave();
							this.getTreeData();
							this.$message({
								message: '账户' + postData.accountName + ' 已调账 ' + this.allFormData.changeBill.amount + '元',
								type: 'success'
							});
							this.resetAllFormData();
							this.handleTab(0);
						} else {
							this.$message({
								message: res.data.error_description,
								type: 'warning'
							});
						}
					}).catch();
				}
			},
			
			// 验证调账表单数据
			checkChangeBill() {
				let isTrue = true;
				if (this.allFormData.changeBill.amount.length) {
					if ( typeof(this.allFormData.changeBill.amount * 1) === 'number') {
						
						if (isNaN(this.allFormData.changeBill.amount * 1) === false) {
							this.allFormData.changeBillAlarmText.amount = '';
						} else {
							isTrue = false;
							this.allFormData.changeBillAlarmText.amount = '调账金额必须为数字';
						}
					}
				} else {
					isTrue = false;
					this.allFormData.changeBillAlarmText.amount = '请输入调账金额';
				}
				
				return isTrue
			},
			
			// 打开调账记录窗口
			openHandsListAlarm() {
				this.resetHandsList();
				this.allFormData.changeBill.tableShow = true;
				this.getHandsList(this.nodeData.id);
			},
			
			// 关闭调账记录窗口
			closeHandsListAlarm() {
				this.allFormData.changeBill.tableShow = false;
				this.resetHandsList();
			},
			
			resetHandsList() {
				this.allFormData.changeBill.tableData.list = [];
			},
			
			// 获取调账记录
			getHandsList(id) {
				let list = [
					/*{id: 1, datetime: '2019-02-26', beforeChange: 1000, changeType: 1, changeAmount: 500, description: ''},
					{id: 2, datetime: '2019-02-26', beforeChange: 2200, changeType: 2, changeAmount: 200, description: ''},
					{id: 3, datetime: '2019-02-26', beforeChange: 1600, changeType: 1, changeAmount: 300, description: ''},
					{id: 4, datetime: '2019-02-26', beforeChange: 2000, changeType: 2, changeAmount: 200, description: ''},
					{id: 5, datetime: '2019-02-26', beforeChange: 3000, changeType: 1, changeAmount: 500, description: ''}*/
				];
				get(this.baseUrlData.url_01 + ':8080/account/handsList/' + id).then((res) => {
					if (res.data.error * 1 === 0) {
						console.log(res.data);
						
						let resTableData = res.data.data;
						
						if (typeof(resTableData) === 'object') {
							let len = resTableData.length;
							for (let i = 0; i < len; i ++) {
								let obj = {
									id: resTableData[i].id,
									datetime: '2019-02-26',
									beforeChange: '',
									changeType: resTableData[i].type,
									changeAmount: resTableData[i].quota,
									description: resTableData[i].description
								};
								list.push(obj);
							}
						}
						
						this.allFormData.changeBill.tableData.list = list;
						this.$message({
							message: '已获取调账记录',
							type: 'success'
						});
					} else {
						this.$message({
							message: res.data.error_description,
							type: 'warning'
						});
					}
				}).catch();
			},
			
			//取消保存操作
			cancelSave() {
				this.allFormData.baseInfo.organCode = '';
				this.allFormData.baseInfo.organName = '';
				this.allFormData.baseInfoEnable = false;
				this.allFormData.payAgreementEnable = false;
				this.allFormData.topUpEnable = false;
				this.allFormData.changeBillEnable = false;
				this.buttonList.add.enabled = false;
				this.buttonList.edit.enabled = false;
				this.buttonList.delete.enabled = false;
				this.buttonList.start.enabled = false;
				this.buttonList.stop.enabled = false;
				this.buttonList.save.enabled = false;
				this.buttonList.cancel.enabled = false;
				this.buttonList.save.type = 0;
			},
			
			checkAllFormData(data) {
				let isTrue = true;
				
				// 账户名
				if (data.name.length === 0) {
					isTrue = false;
					this.allFormData.baseInfoAlarmText.accountName = '请输入账户名';
				} else {
					this.allFormData.baseInfoAlarmText.accountName = '';
				}
				
				return isTrue;
			},
			
			// 打开删除账户确认窗口
			openDeleteAlarm() {
				// console.log(this.nodeData);
				this.$confirm('确定要删除 ' + this.nodeData.name, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log('删除');
					this.remove(this.nodeData.id);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			
			// 新增账户节点
			append(data) {
				const newChild = { id: id++, name: this.allFormData.baseInfo.accountName, type: 'link', children: [] };
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
				this.$message({
					message: '已成功新增帐号：' + this.allFormData.baseInfo.accountName,
					type: 'success'
				});
				this.resetAllFormData();
			},
			
			// 删除节点
			remove(id) {
				get(this.baseUrlData.url_01 + ':8080/account/remove/' + id ).then((res) => {
					// console.log(res.data);
					if (res.data.error * 1 === 0) {
						/*const parent = node.parent;
						const children = parent.data.children || parent.data;
						const index = children.findIndex(d => d.id === data.id);
						children.splice(index, 1);*/
						
						this.getTreeData();
						
						this.$message({
							type: 'success',
							message:  res.data.error_description
						});
					} else {
						this.$message({
							type: 'warning',
							message: res.data.error_description
						});
					}
					
				}).catch((res) => {
					console.log();
				});
				
				
			},
			
			// 重置总表单数据
			resetAllFormData() {
				// 基本信息
				this.allFormData.baseInfo.accountName = ''; // 初始化账户名称
				// this.allFormData.baseInfo.organName = ''; // 初始化机构、部门名称
				// this.allFormData.baseInfo.organCode = ''; // 初始化机构、部门编号
				this.allFormData.baseInfo.balance = ''; // 初始化初始余额
				this.allFormData.baseInfo.processBalance = ''; // 初始化在途余额
				this.allFormData.baseInfo.usableBalance = ''; // 初始化可用余额
				this.allFormData.baseInfo.payType = ''; // 初始化付款方式
				
				this.allFormData.baseInfo.ratio.mobile = ''; // 初始化移动余额换算比例
				this.allFormData.baseInfo.ratio.unicom = ''; // 初始化联通余额换算比例
				this.allFormData.baseInfo.ratio.telecom = ''; // 初始化电信余额换算比例
				
				this.allFormData.baseInfo.accountHeadName = ''; // 初始化账户负责人
				this.allFormData.baseInfo.accountHeadPhone = ''; // 初始化账户负责人电话
				this.allFormData.baseInfo.maintenanceHeadName = ''; // 初始化运维负责人
				this.allFormData.baseInfo.maintenanceHeadPhone = ''; //初始化运维负责人电话
				this.allFormData.baseInfo.accountServiceNum = ''; // 初始化账户特服号
				this.allFormData.baseInfo.billDate = ''; // 初始化账单日
				this.allFormData.baseInfo.customerMark = ''; // 初始化账户签名
				this.allFormData.baseInfo.chargingType = ''; // 初始化计费原则
				
				// 账户充值
				this.allFormData.topUp.amount = ''; // 初始化充值方式
				this.allFormData.topUp.type = ''; // 初始化充值方式
				this.allFormData.topUp.payAccount = ''; // 初始化付款账户
				this.allFormData.topUp.payee = ''; // 初始化收款方
				this.allFormData.topUp.bankName = ''; // 初始化开户行
				this.allFormData.topUp.payeeAccount = ''; // 初始化收款方账号
				this.allFormData.topUp.payeeVoucher = ''; // 初始化付款凭证
				this.allFormData.topUp.description = ''; // 初始化充值说明
			},
			
			// 读取总表单数据 (用于数据回显查看)
			returnAllFormData(id) {
				this.resetAllFormData();
				// console.log(nodedata.data.name);
				
				if (id) {
					get(this.baseUrlData.url_01 + ':8080/account/detail/' + id).then((res) => {
						console.log(res.data);
						
						if (res.data.error * 1 === 0) {
							let allData = res.data.data;
							
							console.log(allData);
							
							// 基本信息
							this.allFormData.baseInfo.accountName = allData.name; // 回显账户名称
							this.allFormData.baseInfo.accountId = allData.id; // 回显账户ID
							this.allFormData.baseInfo.organName = allData.orgName; // 回显机构、部门名称
							this.allFormData.baseInfo.organCode = allData.orgCode; // 回显机构、部门编号
							this.allFormData.baseInfo.balance = allData.balance ? allData.balance: ''; // 回显初始余额
							this.allFormData.baseInfo.processBalance = allData.processBalance ? allData.processBalance : '0.00'; // 回显在途余额
							this.allFormData.baseInfo.usableBalance = allData.usableBalance ? allData.usableBalance : '0.00'; // 回显可用余额
							this.allFormData.baseInfo.payType = allData.payType; // 回显付款方式
							this.allFormData.baseInfo.ratio.mobile = allData.quotaRatioCmcc; // 回显移动余额换算比例
							this.allFormData.baseInfo.ratio.unicom = allData.quotaRatioCucc; // 回显联通余额换算比例
							this.allFormData.baseInfo.ratio.telecom = allData.quotaRatioCtcc; // 回显电信余额换算比例
							this.allFormData.baseInfo.accountHeadName = allData.accountHandlerUname; // 回显账户负责人
							this.allFormData.baseInfo.accountHeadPhone = allData.accountHandlerMobile; // 回显账户负责人电话
							this.allFormData.baseInfo.maintenanceHeadName = allData.operationsHandlerUname; // 回显运维负责人
							this.allFormData.baseInfo.maintenanceHeadPhone = allData.operationsHandlerMobile; // 回显运维负责人电话
							// this.allFormData.baseInfo.accountServiceNum = ''; // 回显账户特服号
							this.allFormData.baseInfo.billDate = allData.billedDay; // 回显账单日
							this.allFormData.baseInfo.customerMark = allData.autograph; // 回显账户签名
							this.allFormData.baseInfo.chargingType = allData.chargingType; // 回显计费原则
							
							// 账户充值
							this.allFormData.topUp.balance = allData.balance;
							
							// balanceEnabled: '', // 可用余额
							// 	amount: '', // 充值金额
							// 	type: '', // 充值方式
							//
							// 	// 充值方式(下拉列表)
							// 	typeList: [
							// 	{id: 1, name: 'aliPay'},
							// 	{id: 2, name: 'wePay'},
							// 	{id: 3, name: 'creditCard'}
							// ],
							// 	payAccount: '', // 付款账户
							// 	payee: '', // 收款方
							// 	bankName: '', //开户行
							// 	payeeAccount: '', // 收款方账号
							// 	payeeVoucher: '', // 付款凭证
							// 	description: '' // 充值说明
							
							this.$message({
								type: 'success',
								message: '已成功获取账户信息'
							});
							
						} else {
							this.$message({
								type: 'warning',
								message: res.data.error_description
							});
						}
						
					}).catch(() => {
					
					});
				}
			},
			
			// 打开封存账户确认窗口
			openDisabledAlarm() {
				// console.log(this.nodeData);
				this.$confirm('确定要封存账户：' + this.nodeData.name, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log('封存');
					this.setDisabled(this.nodeData);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消封存操作'
					});
				});
			},
			
			// 封存账号
			setDisabled(nodedata) {
				get(this.baseUrlData.url_01 + ':8080/account/updateState/' + nodedata.id).then((res) => {
					if (res.data.error * 1 === 0) {
						this.getTreeData();
						this.cancelSave();
						this.$message({
							message: nodedata.name + ' 已封存！',
							type: 'success'
						});
					} else {
					
					}
				}).catch(() => {
				
				});
			},
			
			// 启用账号
			setEnabled(nodedata) {
				get(this.baseUrlData.url_01 + ':8080/account/updateState/' + nodedata.id).then((res) => {
					if (res.data.error * 1 === 0) {
						this.getTreeData();
						this.cancelSave();
						this.$message({
							message: nodedata.name + ' 已启用！',
							type: 'success'
						});
					} else {
					
					}
				}).catch(() => {
				
				});
				
				
			},
			
			// 读取账户树数据
			getTreeData() {
				get(this.baseUrlData.url_01 + ':8080/account/accountTree').then((res) => {
					this.treeList = res.data.data;
				}).catch(() => {
					console.log('error');
				});
			},
			
			// 读取账户详情数据
			getAccountDetail(id) {
				if (id) {
					get(this.baseUrlData.url_01 + ':8080/account/detail/' + id).then((res) => {
						console.log(res.data);
					}).catch(() => {
					
					});
				}
			}
		}
	}
</script>

<style>
	.setting-account-manage-left-box {}
	.setting-account-manage-right-box {}
	.setting-account-manage .tab {}
	.setting-account-manage .tab-menu {}
	.setting-account-manage .tab-menu-item {
		background: #ccc;
		color: #fff;
		line-height: 1;
		padding: 6px 16px;
		transition: all .3s;
	}
	.setting-account-manage .tab-menu-item.is-selected { background: #4a7aba; }
	.setting-account-manage .tab-menu-item.is-disabled { background: #ddd; cursor: not-allowed; }
	.setting-account-manage .tab-content {}
</style>
