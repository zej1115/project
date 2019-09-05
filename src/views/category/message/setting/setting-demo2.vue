<template>
	<!--专门展示表头的合并-->
	<div class="">
		<tableItem
			:lineList="lineList"
			:operationAble="operationAble"
			:checkBoxAble="checkBoxAble"
			:combineAble="combineAble"
			:lineListCombine1="lineListCombine1"
			:lineListCombine2="lineListCombine2"
			:lineListCombine32="lineListCombine32"
			:lineListCombine222="lineListCombine222"
			:buttonList="buttonList"
			:isExportList="isExportList"
			:isManyDelete="isManyDelete"
		>
		</tableItem>
	</div>
</template>

<script>
	import tableItem from '../../../../components/packages/lee-table/src/tableItem'
	export default {
		name: "combineTable",
		components:{
			tableItem
		},
		data(){
			return{
				lineList:[
					// {'label':'月份','prop':'remark','width':"200"},
					{'label':'不合并','prop':'ruleName','width':"200"},
					// {'label':'时间','prop':'updateTime','width':"200"},
					// {'label':'金额','prop':'updateUserName','width':"100"},
					// {'label':'颜色','prop':'insertTime','width':"300"},
				],
				// 是否可操作
				operationAble:true,
				// 是否有复选框
				checkBoxAble:false,
				//是否合并单元格
				combineAble:true,
				// 合并单元格1
				lineListCombine1:[
					{'label':'第一次合并','prop':'remark','width':"200"},
					// {'label':'周期','prop':'ruleName','width':"200"},
					// {'label':'时间','prop':'updateTime','width':"200"},
				],
				// 合并单元格2
				lineListCombine2:[
					{'label':'第一次合并-1','prop':'updateUserName','width':"100"},
					{'label':'第一次合并-2','prop':'insertTime','width':"300"},
				],
				lineListCombine32:[
					{'label':'第二次合并','prop':'updateTime','width':"200"},
				],
				lineListCombine222:[
					{'label':'第二次合并-1','prop':'updateTime','width':"200"},
					{'label':'第二次合并-2','prop':'insertTime','width':"300"},
				],
				// 按钮组合
				buttonList:[
					{'text':'修改','prop':'dictDataValue','width':"200"},
					{'text':'删除','prop':'dictDataValueTwo','width':"200"},
					{'text':'设置权限','prop':'remark','width':"200"},
				],
				// 导出
				isExportList:false,
				// 删除
				isManyDelete:false,
			}
		}
	}
</script>

<style scoped>

</style>
