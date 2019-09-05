<template>
	<div class="bg-color-white h100p prepayment-recharge-manage">
		预付费充值管理页面
		<div class="pd-tb10 pd-lr10 table-box">
			<table border="1" cellspacing="0" cellpadding="2" class="w100p table-style-default">
				<tr>
					<th v-for="(item, index) in tableData.headList">{{ item.name }}</th>
				</tr>
				<tr class="table-row" v-for="(item, index) in tableData.bodyList">
					<td rowspan="1" colspan="1">{{ index + 1 }}</td>
					
					<td rowspan="1" colspan="1">{{ item.accountName }}</td>
					<td rowspan="1" colspan="1">
						<span v-if="item.status === 1">开票已确认</span>
						<span v-if="item.status === 2">充值已确认</span>
					</td>
					<td rowspan="1" colspan="1">{{ item.topUpDatetime }}</td>
					<td rowspan="1" colspan="1">{{ item.beforeTopUpBalance }}</td>
					
					<td rowspan="1" colspan="1">{{ item.topUpAmount }}</td>
					<td rowspan="1" colspan="1">{{ item.afterTopUpBalance }}</td>
					<td rowspan="1" colspan="1">{{ item.confirmTopUpDatetime }}</td>
					<td rowspan="1" colspan="1">{{ item.confirmInvoiceDatetime }}</td>
					<td rowspan="1" colspan="1">{{ item.note }}</td>
					<td rowspan="1" colspan="1">
						<button @click="openConfirmInvoiceAlarm" class="lee-btn-text-primary" v-if="item.status === 1">开票确认</button>
						<button @click="openConfirmTopUpAlarm" class="lee-btn-text-primary" v-if="item.status === 2">充值确认</button>
					</td>
				</tr>
			</table>
			
			<div class="black-opacity
			<!-- 充值确认窗口 begin --50p w100p h100p pos-fix pos-c z-1000" v-show="confirmTopUpAlarm">
				<div class="bg-color-white br6 w500 h180 pd-lr10 pos-abs pos-c">
					<div class="f16 h40 lh40 text-center">充值确认</div>
					<div class="form-content">
						<p class="lh26">国信证券股份有限公司，于2019年01月16日充值：<span class="color-red">2000</span>，已到账</p>
					</div>
					<div class="pd-t10 form-action">
						<div class="clear f0 text-center">
							<button class="mg-r20 lee-btn is-small lee-btn-primary">确定</button>
							<button @click="closeConfirmTopUpAlarm" class="lee-btn is-small lee-btn-primary">取消</button>
						</div>
					</div>
					
					<div @click="closeConfirmTopUpAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
						<span class="f22 el-icon-close"></span>
					</div>
				</div>
			</div>
			<!-- 充值确认窗口 end -->
			
			<!-- 开票确认窗口 begin -->
			<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="confirmInvoiceAlarm">
				<div class="bg-color-white br6 w500 h200 pd-lr10 pos-abs pos-c">
					<div class="f16 h40 lh40 text-center">开票确认</div>
					<div class="form-content">
						<p class="lh26">国信证券股份有限公司，申请充值专票开票，纳税人识别号：<span class="color-red">914403001922784000</span>，金额：<span class="color-red">2000</span>，发票已开</p>
					</div>
					<div class="pd-t10 form-action">
						<div class="clear f0 text-center">
							<button class="mg-r20 lee-btn is-small lee-btn-primary">确定</button>
							<button @click="closeConfirmInvoiceAlarm" class="lee-btn is-small lee-btn-primary">取消</button>
						</div>
					</div>
					
					<div @click="closeConfirmInvoiceAlarm" class="mouse-hand w22 h22 text-center pos-abs t5 r5">
						<span class="f22 el-icon-close"></span>
					</div>
				</div>
			</div>
			<!-- 开票确认窗口 end -->
		</div>
		
		<div class="h50"></div>
		
		<div class="bg-color-white pd-lr10 pd-tb10">
			<!--列表-->
			<tableItem
				:firstTableUrl="firstTableUrl"
				:lineList="lineList"
				:operationAble="operationAble"
				:checkBoxAble="checkBoxAble"
				:buttonList="buttonList">
			</tableItem>
		</div>
	</div>
</template>

<script>
	import tableItem from '../../../components/packages/lee-table/src/tableItem'
	export default {
		name: "prepayment-recharge-manage",
		components: {
			tableItem
		},
		data() {
			return {
				// 查询的url
				firstTableUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByMap",
				
				// 是否可操作
				operationAble:true,
				
				// 是否有复选框
				checkBoxAble:true,
				
				// 列表表头
				lineList:[
					{'label':'消息内容类型','prop':'dictDataValue','width':"","class":"className"},
					{'label':'状态','prop':'status','width':"","class":"aaa"},
					{'label':'备注','prop':'remark','width':"","class":"className"},
					{'label':'排序','prop':'score','width':"","class":"className"},
					{'label':'消息','prop':'dictDataValueTwo','width':"","class":"className"},
				],
				
				// 按钮组合
				buttonList:[
					{'text':'修改','prop':'dictDataValue','width':"200"},
					{'text':'删除','prop':'dictDataValueTwo','width':"200"},
					{'text':'设置权限','prop':'remark','width':"200"},
				],
				
				tableData: {
					headList: [
						{id: 1, name: '序号'},
						{id: 2, name: '账户'},
						{id: 3, name: '状态'},
						{id: 4, name: '充值时间'},
						{id: 5, name: '充值前余额'},
						
						{id: 6, name: '本次充值余额'},
						{id: 7, name: '充值后余额'},
						{id: 8, name: '充值确认日期'},
						{id: 9, name: '开票确认日期'},
						{id: 10, name: '备注'},
						
						{id: 11, name: '操作'},
					],
					bodyList: [
						{id: 1, accountName: '安徽分公司机构账户', status: 1, topUpDatetime: '', beforeTopUpBalance: 10000, topUpAmount: 2000, afterTopUpBalance: 12000, confirmTopUpDatetime: '2019-02-26', confirmInvoiceDatetime: '2019-02-28', note: ''},
						{id: 2, accountName: '北京分公司机构账户', status: 2, topUpDatetime: '', beforeTopUpBalance: 16000, topUpAmount: 3000, afterTopUpBalance: 19000, confirmTopUpDatetime: '2019-02-22', confirmInvoiceDatetime: '2019-02-26', note: ''},
						{id: 3, accountName: '山东分公司机构账户', status: 1, topUpDatetime: '', beforeTopUpBalance: 12000, topUpAmount: 4000, afterTopUpBalance: 16000, confirmTopUpDatetime: '2019-02-16', confirmInvoiceDatetime: '2019-02-16', note: ''},
						{id: 4, accountName: '广东分公司机构账户', status: 2, topUpDatetime: '', beforeTopUpBalance: 10000, topUpAmount: 6000, afterTopUpBalance: 16000, confirmTopUpDatetime: '2019-02-09', confirmInvoiceDatetime: '2019-02-02', note: ''},
						{id: 5, accountName: '深圳分公司机构账户', status: 2, topUpDatetime: '', beforeTopUpBalance: 20000, topUpAmount: 8000, afterTopUpBalance: 28000, confirmTopUpDatetime: '2019-01-26', confirmInvoiceDatetime: '2019-01-28', note: ''}
					]
				},
				
				confirmTopUpAlarm: false,
				confirmInvoiceAlarm: false,
			}
		},
		
		methods: {
			// 打开充值确认窗口
			openConfirmTopUpAlarm() {
				this.confirmTopUpAlarm = true;
			},
			
			// 确认充值操作
			
			
			// 关闭充值确认窗口
			closeConfirmTopUpAlarm() {
				this.confirmTopUpAlarm = false;
			},
			
			// 打开开票确认窗口
			openConfirmInvoiceAlarm() {
				this.confirmInvoiceAlarm = true;
			},
			
			// 关闭开票确认窗口
			closeConfirmInvoiceAlarm() {
				this.confirmInvoiceAlarm = false;
			},
		}
	}
</script>

<style>
	.table-row { transition: all .1s; }
	.table-row:hover { background: #e4efff; }
</style>
