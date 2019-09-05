<!--单元格合并实例文件-->
<template>
	<div>
		<button>新增</button>
		<tableItem
			:lineList="lineList"
			:operationAble="operationAble"
			:checkBoxAble="checkBoxAble"
			:combineAble="combineAble"
			:lineListCombine1="lineListCombine1"
			:lineListCombine2="lineListCombine2"
			:buttonList="buttonList"
			:isExportList="isExportList"
			:isManyDelete="isManyDelete"
		>
		</tableItem>
	</div>
</template>

<script>
	import tableItem from './../../common/tableItem'
    export default {
        name: "combineTable",
			components:{
				tableItem
			},
			data(){
				return{
					lineList:[
						// {'label':'月份','prop':'remark','width':"200"},
						{'label':'周期','prop':'ruleName','width':"200"},
						{'label':'时间','prop':'updateTime','width':"200"},
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
						{'label':'月份','prop':'remark','width':"200"},
						// {'label':'周期','prop':'ruleName','width':"200"},
						// {'label':'时间','prop':'updateTime','width':"200"},
					],
					// 合并单元格2
					lineListCombine2:[
						{'label':'金额','prop':'updateUserName','width':"100"},
						{'label':'颜色','prop':'insertTime','width':"300"},
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
					isManyDelete:true,
				}
			}
    }
</script>

<style scoped>

</style>
