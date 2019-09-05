<template>
	<div class="bg-color-white w100p h100p bill-manage">
		<div class="mg-b10 button-list">
			<div class="clear pd-tb10 pd-lr10">
				<button @click="openCreateBill"
								class="fl lee-btn is-small"
								:class="[{'is-disabled': false}]"
								:disabled="false">生成账单</button>
				<button @click="openCheckBill"
								class="fl mg-l10 lee-btn is-small"
								:class="[{'is-disabled': false}]"
								:disabled="false">审核账单</button>
				<button @click="getBillData"
								class="fl mg-l10 lee-btn is-small"
								:class="[{'is-disabled': false}]"
								:disabled="false">发送账单</button>
			</div>
			
			<!-- 账单生成 begin -->
			<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="createBillAlarm">
				<div class="bg-color-white br6 w300 h140 pd-lr10 pos-abs pos-c">
					<div class="f16 h40 lh40 text-center">生成账单</div>
					<div class="mg-b20 pd-lr30 form-content">
						<div class="form-field-box">
							<el-select
								class="w100p"
								:disabled="false"
								v-model="billToMonth"
								size="mini"
								placeholder="请选择">
								<el-option
									v-for="item in monthList"
									:key="item.id"
									:label="item.name"
									:value="item.name">
								</el-option>
							</el-select>
						</div>
					</div>
					
					<div class="form-action">
						<div class="block-center w140 clear">
							<div class="fl mg-r20">
								<el-button size="small" type="primary">确定</el-button>
							</div>
							<div class="fr">
								<el-button @click="closeCreateBill" size="small">取消</el-button>
							</div>
						</div>
					</div>
					
					
					<div @click="closeCreateBill" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
						<span class="f22 el-icon-close"></span>
					</div>
				</div>
			</div>
			<!-- 账单生成 end -->
			
			<!-- 账单审核 begin -->
			<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="checkBillAlarm">
				<div class="bg-color-white br6 w400 h320 pd-lr20 pos-abs pos-c">
					<div class="f16 h40 lh40 text-center">批量审核账单</div>
					
					<div class="form-content">
						<div class="clear mg-b20 form-field-box">
							<div class="fl w80 h30 lh30 text-right">审核结论</div>
							<div class="pd-l90">
								<el-radio-group v-model="checkBillForm.checkResult">
									<el-radio :label="1">通过</el-radio>
									<el-radio :label="0">拒绝</el-radio>
								</el-radio-group>
							</div>
						</div>
						<div class="clear mg-b20 form-field-box">
							<div class="fl w80 h30 lh30 text-right">审核意见</div>
							<div class="pd-l90">
								<div class="pos-relative">
									<el-input v-model="checkBillForm.description" type="textarea"></el-input>
								</div>
							</div>
						</div>
						<div class="clear mg-b20 form-field-box">
							<div class="fl w80 h30 lh30 text-right">审核人</div>
							<div class="pd-l90">
								<div class="pos-relative">
									<el-input v-model="checkBillForm.auditor" size="small"></el-input>
								</div>
							</div>
						</div>
						<div class="clear mg-b20 form-field-box">
							<div class="fl w80 h30 lh30 text-right">审核时间</div>
							<div class="pd-l90">
								<div class="pos-relative">
									<el-input size="small" placeholder="2019-03-12"></el-input>
								</div>
							</div>
						</div>
					</div>
					
					<div class="form-action">
						<div class="clear text-center">
							<el-button size="small" type="primary">确定</el-button>
							<el-button @click="closeCheckBill" size="small">取消</el-button>
						</div>
					</div>
					
					<div @click="closeCheckBill" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
						<span class="f22 el-icon-close"></span>
					</div>
				</div>
			</div>
			<!-- 账单审核 end -->
			
			<div class="clear pd-lr10">
				<div class="f12 fl h28 lh28">
					账单月份：
				</div>
				<div class="fl w100">
					<el-select
						class="w100p"
						:disabled="false"
						v-model="billFromMonth"
						size="mini"
						placeholder="请选择">
						<el-option
							v-for="item in monthList"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
				<div class="fl h28 lh28 pd-lr5">至</div>
				<div class="fl w100">
					<el-select
						class="w100p"
						:disabled="false"
						v-model="billToMonth"
						size="mini"
						placeholder="请选择">
						<el-option
							v-for="item in monthList"
							:key="item.id"
							:label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>
				
				<div class="fl mg-l20">
					<el-button
						size="mini"
						type="primary"
						@click="getBillData"
						v-if="true">查询</el-button>
				</div>
			</div>
		</div>
		
		<!-- bill-table-box begin -->
		<div class="bill-table-box">
			<div class="pd-tb10 pd-lr10">
				<el-table
					:data="billData"
					border
					@selection-change="handleSelectionChange"
					ref="multipleTable"
					style="width: 100%">
					<el-table-column
						type="selection"
						width="55">
					</el-table-column>
					<el-table-column
						prop="date"
						label="序号"
						width="80">
					</el-table-column>
					<el-table-column
						prop="name"
						label="账单月份"
						width="180">
					</el-table-column>
					<el-table-column
						prop="address"
						label="机构"
						width="200">
					</el-table-column>
					<el-table-column
						prop="address"
						label="付费方式"
						width="200">
					</el-table-column>
					<el-table-column
						prop="address"
						label="起始日期"
						width="160">
					</el-table-column>
					<el-table-column
						prop="address"
						label="截止日期"
						width="160">
					</el-table-column>
					<el-table-column
						prop="address"
						label="总金额"
						width="120">
					</el-table-column>
					<el-table-column
						prop="address"
						label="总发送条数(条)"
						width="120">
					</el-table-column>
					<el-table-column
						prop="address"
						label="账单日期"
						width="120">
					</el-table-column>
					<el-table-column
						prop="address"
						label="审核人"
						width="100">
					</el-table-column>
					<el-table-column
						prop="address"
						label="初始化时间"
						width="120">
					</el-table-column>
					<el-table-column
						label="状态"
						width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.status === 1">已审核</span>
							<span v-if="scope.row.status === 2">已退回</span>
							<span v-if="scope.row.status === 3">初始化</span>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						width="350">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="view(scope.$index, scope.row)"
								v-if="scope.row.status === 1 || scope.row.status === 2 || scope.row.status === 3">查看</el-button>
							
							<el-button
								size="mini"
								type="primary"
								@click="view(scope.$index, scope.row)"
								v-if="scope.row.status === 2 || scope.row.status === 3">修改</el-button>
							
							<el-button
								size="mini"
								type="primary"
								@click="view(scope.$index, scope.row)"
								v-if="scope.row.status === 2 || scope.row.status === 3">审核</el-button>
							
							<el-button
								size="mini"
								type="primary"
								@click="view(scope.$index, scope.row)"
								v-if="scope.row.status === 2">发送</el-button>
							
							<el-button
								size="mini"
								type="primary"
								@click="back(scope.$index, scope.row)"
								v-if="scope.row.status === 1">退回</el-button>
							
							<el-button
								size="mini"
								type="primary"
								@click="back(scope.$index, scope.row)"
								v-if="scope.row.status === 1">客户确认</el-button>
							
							<el-button
								size="mini"
								type="primary"
								@click="back(scope.$index, scope.row)"
								v-if="scope.row.status === 1">开票确认</el-button>
						</template>
					</el-table-column>
				</el-table>
				
				<table class="table-style-default">
					<tr>
						<th>表头1</th>
						<th>表头2</th>
						<th>表头3</th>
					</tr>
					<tr>
						<td>内容</td>
						<td>内容</td>
						<td>内容</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- bill-table-box end -->
		
		<!-- bill-details begin -->
		<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="billDetailsShow">
			<div class="bg-color-white br6 w800 h600 pd-t30 pd-b60 pd-lr10 pos-abs pos-c">
				<div class="w100p h30 pd-lr10 pos-abs pos-c-t">
					<div class="clear">
						<div class="h30 lh30 text-center">
							2019年1月账单
						</div>
					</div>
					<div @click="closeBillDetails" class="mouse-hand w22 h22 text-center pos-abs pos-c-r r5">
						<span class="f22 el-icon-close"></span>
					</div>
				</div>
				
				<!-- 账单统计表 begin -->
				<div class="h100p overflow-hidden bill-details-list">
					<table class="w100p mg-b10 table-style-default bill-details-table">
						<tr>
							<th>机构</th>
							<td>兴业证券</td>
							<th>账单日期</th>
							<td>2019-02-12</td>
						</tr>
						<tr>
							<th>起始日期</th>
							<td>2019-02-22</td>
							<th>截止日期</th>
							<td>2019-02-26</td>
						</tr>
						<tr>
							<th>总发送条数(条)</th>
							<td>100</td>
							<th>总金额(元)</th>
							<td>27.80</td>
						</tr>
						<tr>
							<th>本期充值(元)</th>
							<td>0</td>
							<th>备注</th>
							<td>无</td>
						</tr>
					</table>
					
					<div class="h26 lh26">账户分类明细</div>
					<table class="w100p mg-b10 table-style-default bill-category-table">
						<tr>
							<th class="w120">账户</th>
							<th>业务类型</th>
							<th>发送条数</th>
							<th>金额</th>
						</tr>
						
						<tr>
							<td rowspan="4">兴业证券主账户</td>
							<td>短信</td>
							<td>69</td>
							<td>3.45</td>
						</tr>
						<tr>
							<td>超级短信</td>
							<td>10</td>
							<td>2</td>
						</tr>
						<tr>
							<td>彩信</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>短信</td>
							<td>69</td>
							<td>5.45</td>
						</tr>
						
						<tr>
							<td rowspan="4">网上营销分账户</td>
							<td>短信</td>
							<td>69</td>
							<td>3.45</td>
						</tr>
						<tr>
							<td>超级短信</td>
							<td>10</td>
							<td>2</td>
						</tr>
						<tr>
							<td>彩信</td>
							<td>20</td>
							<td>3</td>
						</tr>
						<tr>
							<td>短信</td>
							<td></td>
							<td>8.45</td>
						</tr>
						
						<tr>
							<td>合计</td>
							<td></td>
							<td></td>
							<td>27.8</td>
						</tr>
					</table>
					
					<div class="h26 lh26">运营商分类明细</div>
					<table class="w100p mg-b10 table-style-default">
						<tr>
							<th>运营商</th>
							<th>业务类型</th>
							<th>信息类型</th>
							<th>发送条数</th>
							<th>单价</th>
							<th>金额</th>
						</tr>
						
						<tr v-for="(item, index) in operatorData.mobile.list">
							<td>{{ item.operatorName }}</td>
							<td>{{ item.serviceType }}</td>
							<td>{{ item.smsType }}</td>
							<td>{{ item.sentAmount }}</td>
							<td>{{ item.price }}</td>
							<td>3.45</td>
						</tr>
						
						<!-- 移动费用统计 begin -->
						<tr>
							<td rowspan="6">移动</td>
							<td rowspan="4">短信</td>
							<td>验证码</td>
							<td>69</td>
							<td>0.05</td>
							<td>3.45</td>
						</tr>
						<tr>
							<td>网贷</td>
							<td>0</td>
							<td>0.05</td>
							<td>0</td>
						</tr>
						<tr>
							<td>会员</td>
							<td>0</td>
							<td>0.07</td>
							<td>0</td>
						</tr>
						<tr>
							<td>信用卡</td>
							<td>0</td>
							<td>0.05</td>
							<td>0</td>
						</tr>
						<tr>
							<td>超级短信</td>
							<td>不限</td>
							<td>10</td>
							<td>0.2</td>
							<td>2</td>
						</tr>
						<tr>
							<td>彩信</td>
							<td>不限</td>
							<td>0</td>
							<td>0.15</td>
							<td>0</td>
						</tr>
						<tr>
							<td>移动费用小计</td>
							<td colspan="4"></td>
							<td>5.45</td>
						</tr>
						<!-- 移动费用统计 end -->
						
						<!-- 联通费用统计 begin -->
						<tr>
							<td rowspan="3">联通</td>
							<td>短信</td>
							<td>不限</td>
							<td>69</td>
							<td>0.05</td>
							<td>3.45</td>
						</tr>
						<tr>
							<td>超级短信</td>
							<td>彩信</td>
							<td>0</td>
							<td>0.2</td>
							<td>0</td>
						</tr>
						<tr>
							<td>彩信</td>
							<td>不限</td>
							<td>0</td>
							<td>0.15</td>
							<td>0</td>
						</tr>
						<tr>
							<td>联通费用小计</td>
							<td colspan="4"></td>
							<td>3.45</td>
						</tr>
						<!-- 联通费用统计 end -->
						
						<!-- 电信费用统计 begin -->
						<tr>
							<td rowspan="3">电信</td>
							<td>短信</td>
							<td>不限</td>
							<td>0</td>
							<td>0.05</td>
							<td>0</td>
						</tr>
						<tr>
							<td>超级短信</td>
							<td>不限</td>
							<td>0</td>
							<td>0.2</td>
							<td>0</td>
						</tr>
						<tr>
							<td>彩信</td>
							<td>不限</td>
							<td>0</td>
							<td>0.15</td>
							<td>0</td>
						</tr>
						<tr>
							<td>电信费用小计</td>
							<td colspan="4"></td>
							<td>27.80</td>
						</tr>
						<!-- 电信费用统计 end -->
					</table>
				</div>
				<div class="clear">
					<div class="f12 fr h26 lh26">审核人：{{ reviewer }}</div>
				</div>
				<!-- 账单统计表 end -->
				
				<div class="w100p pos-abs pos-c-b b10">
					<div class="text-center">
						<el-button size="small" type="primary">保存</el-button>
					</div>
				</div>
			</div>
		</div>
		
		<!-- bill-details end -->
	</div>
</template>

<script>
	export default {
		name: "bill-manage",
		data() {
			return {
				
				createBillAlarm: false, // 账单生成窗口
				
				checkBillAlarm: false, // 账单审核窗口
				
				// 批量审核账单表单数据
				checkBillForm: {
					checkResult: 1,
					auditor: '李明龙',
					description: '账单已核对无误，同意发布'
				},
				
				billFromMonth: '',
				billToMonth: '',
				
				// 账单月份
				monthList: [
					{id: 1, name: '1月'},
					{id: 2, name: '2月'},
					{id: 3, name: '3月'},
					{id: 4, name: '4月'},
					{id: 5, name: '5月'},
					{id: 6, name: '6月'},
					{id: 7, name: '7月'},
					{id: 8, name: '8月'},
					{id: 9, name: '9月'},
					{id: 10, name: '10月'},
					{id: 11, name: '11月'},
					{id: 12, name: '12月'}
				],
				
				// 账单列表
				billData: [
					{
						status: 1
					},
					{
						status: 2
					},
					{
						status: 3
					},
				],
				
				multipleTable: [],
				
				billDetailsShow: false,
				
				// 运营商账单数据
				operatorData: {
					// 移动账单
					mobile: {
						list: [
							{
								id: 1,
								operatorName: '移动',
								serviceType: '短信',
								smsType: '验证码',
								sentAmount: 69,
								price: 0.05,
								sum: 0
							},
							{
								id: 2,
								operatorName: '移动',
								serviceType: '短信',
								smsType: '网贷',
								sentAmount: 0,
								price: 0.05,
								sum: 0
							},
							{
								id: 3,
								operatorName: '移动',
								serviceType: '短信',
								smsType: '会员',
								sentAmount: 0,
								price: 0.07,
								sum: 0
							},
							{
								id: 4,
								operatorName: '移动',
								serviceType: '短信',
								smsType: '信用卡',
								sentAmount: 0,
								price: 0.05,
								sum: 0
							},
							{
								id: 5,
								operatorName: '移动',
								serviceType: '超级短信',
								smsType: '不限',
								sentAmount: 10,
								price: 0.2,
								sum: 2
							},
							{
								id: 6,
								operatorName: '移动',
								serviceType: '彩信',
								smsType: '不限',
								sentAmount: 69,
								price: 0.05,
								sum: 0
							}
						],
						
						operatorRows: 6,
						serviceTypeRows: 4,
					},
					
					// 联通账单
					unicom: [],
					
					// 电信账单
					telecom: []
				},
				
				reviewer: '王田丽' // 审核人
			};
		},
		
		methods: {
			
			// 打开生成账单窗口
			openCreateBill() {
				this.createBillAlarm = true;
			},
			
			// 取消生成账单
			closeCreateBill() {
				this.createBillAlarm = false;
			},
			
			openCheckBill() {
				this.checkBillAlarm = true;
			},
			
			// 取消审核账单
			closeCheckBill() {
				this.checkBillAlarm = false;
			},
			
			// 表格行勾选
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			
			// 获取表格数据
			getBillData() {
			
			},
			
			// 查看账单明细
			view(index, row) {
				console.log(index, row);
				this.billDetailsShow = true;
			},
			
			closeBillDetails() {
				this.billDetailsShow = false;
			}
		},
		
		mounted() {
			let scrollWrap = $('.bill-details-list');
			let billCategoryTable = $('.bill-category-table');
			scrollWrap.mCustomScrollbar({
				set_width: false,
				set_height: false,
				// horizontalScroll: false,
				axis:"y",
				scrollInertia: 100, // 滚动条惯性(值越大惯性越大)
				scrollEasing: "easeOutCirc",
				mouseWheel: true, //
				autoDraggerLength: true,
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 20
				},
				advanced:{
					updateOnBrowserResize: true,
					updateOnContentResize: true,
					autoExpandHorizontalScroll: true,
					autoScrollOnFocus: true
				},
				callbacks:{
					onScrollStart: function(){},
					onScroll: function(){},
					onTotalScroll: function(){},
					onTotalScrollBack: function(){},
					onTotalScrollOffset: 0,
					whileScrolling: false,
					whileScrollingInterval: 10
				}
			});
			// $('table').resizableColumns({});
			$('th').resizable();
		}
	}
</script>

<style>

</style>
