<template>
	<div class="api-manage-province-network">
		<div class="clear">
			<div class="pd-l10 pd-r10 h36 lh36 fl tabs-title" :class="{lightButton:isMainChannelShow===true}" @click="mainChannelEvent">机构及主备通道</div>
			<div class="pd-l10 pd-r10 h36 lh36 fl tabs-title" :class="{lightButton:!isMainChannelShow===true}" @click="orgChannelEvent">机构及省网通道</div>
		</div>
		<div>
			<template>
				<div v-show="isMainChannelShow">
					<!--列表-->
					<tableItem
						:lineList="lineList"
						:lineListCombine1="lineListCombine1"
						:lineListCombine2="lineListCombine2"
						:lineListCombine32="lineListCombine32"
						:lineListCombine222="lineListCombine222"
						:operationAble="operationAbleLeft"
						:checkBoxAble="checkBoxAble"
						:combineAble="combineAble"
						:buttonList="buttonList"
						:childrenTableAble="childrenTableAble"
						>
					</tableItem>
				</div>
			</template>
			<template>
				<div v-show="!isMainChannelShow">
					<tableItem
						:lineList="lineList"
						:operationAble="operationAbleRight"
						:checkBoxAble="checkBoxAble"
					>
					</tableItem>
					<!--分页-->
					<PaginationList></PaginationList>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import tableItem from '../../../../components/packages/lee-table/src/tableItem'
	export default {
		name: "api-manage-province-network",
		components:{
			tableItem,
		},
		data(){
			return {
				isMainChannelShow: true,
				operationAbleLeft: true,
				operationAbleRight: false,
				checkBoxAble: false,
				combineAble: true,
				// 列表表头
				lineList:[
					{'label':'序号','prop':'','width':"","class":"className"},
					{'label':'机构','prop':'','width':"","class":"aaa"},
					{'label':'账户','prop':'','width':"","class":"className"},
					{'label':'用户','prop':'','width':"","class":"className"},
					{'label':'短信类型','prop':'','width':"","class":"className"},
					{'label':'信息类型','prop':'','width':"","class":"className"},
					{'label':'备注','prop':'','width':"","class":"className"},
					{'label':'启用省网通道','prop':'','width':"","class":"className"},
				],
				/*合并表头*/
				lineListCombine1:[
					{'label':'主通道','prop':'','width':"","class":"aaa"},
				],
				// 合并单元格2
				lineListCombine2:[
					{'label':'移动','prop':'','width':"150"},
					{'label':'联通','prop':'','width':"150"},
					{'label':'电信','prop':'','width':"150"}
				],
				/*合并表头*/
				lineListCombine32:[
					{'label':'备用通道','prop':'','width':"","class":"aaa"},
				],
				// 合并单元格2
				lineListCombine222:[
					{'label':'移动','prop':'','width':"150"},
					{'label':'联通','prop':'','width':"150"},
					{'label':'电信','prop':'','width':"150"}
				],
				// 按钮组合
				buttonList:[
					{'text':'修改','prop':'dictDataValue','width':"200"},
					{'text':'删除','prop':'dictDataValueTwo','width':"200"},
				],
				// 是否有子表
				childrenTableAble:false,
			}
		},
		methods:{
			mainChannelEvent(){
				this.isMainChannelShow = true;
			},
			orgChannelEvent(){
				this.isMainChannelShow = false;
			}
		}
	}
</script>
