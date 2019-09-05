<template>
	<div class="bg-color-white h100p num-section-location">
		<div>
			<div class="">
				<el-button class="common-button-medium mg-l20"  @click="newAdd">新增</el-button>
				<el-button class="common-button-medium mg-l20"  @click="sureSave">保存</el-button>
			</div>
			<!--列表-->
			<!--<tableItem
				:lineList="lineList"
				:tableList="tableListData"
				:operationAble="operationAble"
				:checkBoxAble="checkBoxAble"
				:buttonList="buttonList"
			>
			</tableItem>-->
			<table border="1" class="table-style-default" cellspacing="0" cellpadding="2" width="100%">
				<thead>
				<th v-for="(item,index) in lineList"  :width="item.width" calss="pd-tb5 pd-lr10 ui-resizable" >{{item.label}}</th>
				<th width="300">操作</th>
				</thead>
				<tbody>
				<tr v-for="(item1,index) in tableListData">
					<td v-for="(item2,index) in lineList"  :width="item2.width" >{{item1[item2.prop]}}</td>
					<td>
						<span @click="modify(item1)">修改</span>
						<span @click="del(item1)">删除</span>
					</td>
				</tr>
				</tbody>
			</table>
			<!--分页-->
		</div>
	</div>
</template>

<script>
	export default {
		name: "num-section-location",
		data() {
			return {
				lineList:[
					{'label':'号码值','prop':'code','width':"200","class":"tableTh"},
					{'label':'所属省份','prop':'codeNumber','width':"200","class":"tableTh"},
					{'label':'所在市','prop':'channelName','width':"200","class":"tableTh"},
					{'label':'区域代码','prop':'channelType','width':"200","class":"tableTh"},
					{'label':'运营商','prop':'messageType','width':"200","class":"tableTh"},
					{'label':'创建时间','prop':'yunying','width':"200","class":"tableTh"},

				],
				tableListData:[{
					"code": 1,
					"codeNumber": 100,
					"channelName": '哈哈哈',
					"channelType": 'haha',
					"messageType": 'hahahgggg',
					"yunying": 'rrrrrrra',
					"area": 'kkkkkk',
					"channelCode": '6666',
					"channelWord": 'llllll',
				},{
					"code": 2,
					"codeNumber": 101,
					"channelName": '啊啊啊啊',
					"channelType": 'haha',
					"messageType": 'hahahgggg',
					"yunying": 'rrrrrrra',
					"area": 'kkkkkk',
					"channelCode": '6666',
					"channelWord": 'llllll',
				},{
					"code": 3,
					"codeNumber": 102,
					"channelName": '不不不不不不',
					"channelType": 'haha',
					"messageType": 'hahahgggg',
					"yunying": 'rrrrrrra',
					"area": 'kkkkkk',
					"channelCode": '6666',
					"channelWord": 'llllll',
				}],
			};
		},
		mounted(){
			$('th').resizable();
		},
		methods: {
			/*新增*/
			newAdd(){

			},
			/*保存*/
			sureSave(){

			},
			/*修改*/
			modify(item){
				console.log('item',item)
			},
			/*删除*/
			del(item){
				console.log('item',item)
			}
		},

	}
</script>

<style>

</style>
