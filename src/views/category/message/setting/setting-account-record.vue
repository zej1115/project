<template>
		<div class="bg-color-white pd-lr10 pd-tb10">
			<!--列表-->
			<tableItem
				:firstTableUrl="firstTableUrl"
				:lineList="lineList"
				:operationAble="operationAble"
				:buttonList="buttonList"
			>
			</tableItem>
			
		</div>
</template>

<script>
	import tableItem from './../../../../components/packages/lee-table/src/tableItem'
	export default {
		name: "setting-account-record",
		components: {
			tableItem
		},
		data() {
			return {
				// 查询的url
				firstTableUrl: "http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByMap",
				
				// 是否可操作
				operationAble: true,
				
				// 是否有复选框
				checkBoxAble: true,
				
				// 列表表头
				lineList: [
					{'label':'消息内容类型','prop':'dictDataValue','width':"","class":"className"},
					{'label':'状态','prop':'status','width':"","class":"aaa"},
					{'label':'备注','prop':'remark','width':"","class":"className"},
					{'label':'排序','prop':'score','width':"","class":"className"},
					{'label':'消息','prop':'dictDataValueTwo','width':"","class":"className"},
				],
				
				// 按钮组合
				buttonList: [
					{'text':'修改','prop':'dictDataValue','width':"200"},
					{'text':'删除','prop':'dictDataValueTwo','width':"200"},
					{'text':'设置权限','prop':'remark','width':"200"},
				],
			}
		}
	}
</script>

