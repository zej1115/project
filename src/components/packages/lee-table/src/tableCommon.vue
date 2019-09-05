<!--列表封装模块调用-->
<template>
	<div>
		<!--查询项-->
		<formSearch
			:firstTableUrl="firstTableUrl"
		>
		</formSearch>

		<button @click="addListTo()" class="mg-b10">新增</button>
		<!--列表-->
		<tableItem
			:editGetIdUrl="editGetIdUrl"
			:delTableUrl="delTableUrl"
			:lineList="lineList"
			:operationAble="operationAble"
			:checkBoxAble="checkBoxAble"
			:combineAble="combineAble"
			:isExportList="isExportList"
			:isManyDelete="isManyDelete"
			:sumList="sumList"
			:buttonList="buttonList"
		>
		</tableItem>
		<!--新增修改框-->
		<!--<div class="addFormDiv">-->
      <addList
         :addTableUrl="addTableUrl"
			></addList>
		<!--</div>-->

	</div>

</template>

<script>
	import tableItem from './tableItem'
	import addList from './addList'
	import formSearch from './formSearch'
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import {get,post} from './../../request/http'
	import {formatGetUrl, getButtonList, getButtonStatus, getApiList,trimString,baseUrl} from './../../request/common'
    export default {
        name: "tableCommon",
			components:{
				formSearch,
				tableItem,
				   addList
			},
			computed:{
        	// 获得getters的数据
				...mapGetters([
					// 'getTableList',
					'getWatchTableList'
				]),
				watchTableList:{
					get:function(){
						return this.getWatchTableList
					},
					set:function(){
						return this.setWatchTableList(val)
					}
				}
			},
			data(){
        	return{
						// 删除url
						delTableUrl:'http://172.18.12.36:8080/hx/api/dic/MsgContentType/deleteByPrimaryKey',
						// 首次初始化数据url
						firstTableUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByMap",
						// 新增url
						addTableUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/insertSelective",
						// 点击修改获取当前行数据url
						editGetIdUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByPrimaryKey",
           // 列表表头
						lineList:[
							{'label':'月份','prop':'dictDataValue','width':"","class":"className"},
							{'label':'周期','prop':'dictDataValueTwo','width':"","class":"aaa"},
							{'label':'时间','prop':'remark','width':"","class":"className"},
							{'label':'金额','prop':'dictDataName','width':"","class":"className"},
							{'label':'颜色','prop':'status','width':"","class":"className"},
						],
						// 按钮组合
						buttonList:[
							{'text':'修改','prop':'dictDataValue','width':"200"},
							{'text':'删除','prop':'dictDataValueTwo','width':"200"},
							{'text':'设置权限','prop':'remark','width':"200"},
						],
						// 导出功能
						isExportList:true,
						// 删除功能
						isManyDelete:true,

						// 是否可操作
						operationAble:true,
						// 是否有复选框
						checkBoxAble:true,
						//是否合并单元格
						combineAble:false,
						// 是否有合计
						sumList:false
					}
			},

      created(){

			},
			mounted(){

			},
			methods:{
				...mapActions([
					'setWatchTableList'
				]),
        	// 点击新增
				addListTo(){
					this.$store.state.isAddForm=true;
				},
			}
    }
</script>

<style scoped>
	/*新增弹出框样式*/
	.addFormDiv{
		width:300px;
		height:300px;
		border:1px solid;
		/*display:none;*/
		position:absolute;
		z-index:3;
		background:white;
		top:30%;
		left:40%;

	}


</style>
