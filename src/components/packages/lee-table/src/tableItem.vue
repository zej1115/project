<!--列表封装-->
<template>
<div>

	<div class="mg-b10 table-buttons">
		<el-button class="pd-lr20" v-if="isExportList" size="small" type="primary" @click="getExportList">导出</el-button>
		<el-button class="pd-lr20" v-if="isManyDelete" size="small" type="danger" @click="getManyDelete">删除</el-button>
	</div>

	<table class="table-style-default" id="table-style-default" border="1"  cellspacing="0" cellpadding="2" width="100%">
		<thead>
		<!--有合并-->
		<tr v-if="combineAble">
			<!--复选框-->
			<th width="200" v-if="checkBoxAble">
				<template>
					<label class="fl h30 lh30 mg-lr5 mouse-hand pd-l16 pos-relative">
						<input type="checkbox" value=""  v-model="checkedAllTo"/>
					</label>
				</template>
			</th>


			<!--不合并单元格--表头-->

			<th v-for="(item1,index1) in lineList"  :width="item1.width" rowspan="2">{{item1.label}}{{item1.prop}}</th>
			<!--合并单元格--表头1-->

			<th v-for="(item3,index3) in lineListCombine1" :width="item3.width"  colspan="3">{{item3.label}}{{item3.prop}}</th>
			<!--合并单元格--表头2-->
			<th v-for="(item32,index) in lineListCombine32" :width="item32.width"  colspan="3">{{item32.label}}{{item32.prop}}</th>
			<th width="200" v-if="operationAble" rowspan="2">操作</th>
		</tr>
		<tr v-if="combineAble">
			<th v-for="(item6,index6) in lineListCombine2" :width="item6.width">{{item6.label}}{{item6.prop}}</th>
			<th v-for="(item622,index) in lineListCombine222" :width="item622.width">{{item622.label}}{{item622.prop}}</th>

		<!--</tr>-->
		<!--<tr v-if="combineAble">-->
		<!--</tr>-->
		<!--没有合并-->
		<tr v-if="!combineAble" >
			<!--复选框-->
			<th width="200" v-if="checkBoxAble">
				<template>
					<label class="fl h30 lh30 mg-lr5 mouse-hand pd-l16 pos-relative">
						<input type="checkbox" value=""  v-model="checkedAllTo"/>
					</label>
				</template>
			</th>
			<!--不合并单元格--表头-->
			<th class="pd-tb5 pd-lr10" v-for="(item1,index1) in lineList"  :width="item1.width" >{{item1.label}}{{item1.prop}}</th>
			<th class="pd-tb5 pd-lr10" v-if="operationAble">操作</th>
		</tr>
		</thead>

		<!----------------------------------->
		<tbody >
      <!--主表情况-->
			<tr v-for="(item2,index2) in dataList"  @dblclick="dbclickTo(item2)" v-if="!childrenTableAble" class="test" :key="item2.id" @mouseover="trListMouseover(index2)" @mouseleave="trListMouseleave(index2)" :class="{current:num==index2,activeA:isTrActive}" ref="trList">
				<!--合并单元格&#45;&#45;列表数据-->
				<td class="pd-tb10 pd-lr10" align="center" v-for="(item5,index5) in lineListCombine2" v-if="combineAble">{{item2[item5.prop]}}</td>
				<!--复选框-->
				<td class="pd-tb5 pd-lr10" align="center" v-if="checkBoxAble">
					<template>

						<label class="fl h30 lh30 mg-lr5 mouse-hand pd-l16 pos-relative">
							<input type="checkbox" value="" @click="singleCheck(index2)"  v-model="item2.finished"/>
						</label>
					</template>
				</td>
				<!--普通列-->
				<td class="pd-tb5 pd-lr10" align="center" v-for="(item1,index1) in lineList" :class="item1.class"  v-if="!editTableInput">{{item2[item1.prop]}}</td>
				<!--普通列嵌套input框-->
				<td class="pd-tb5 pd-lr10" align="center" v-for="(item1,index1) in lineList" :class="item1.class"  v-if="editTableInput">
					<template>
						<input type="text" v-model="item2[item1.prop]" style="border:1px solid gainsboro">
					</template>
				</td>
				<!--操作列-->
				<td class="pd-tb5 pd-lr10" align="center">
					<div class="w300">
						<div class="f0 inline-block" v-if="operationAble" v-for="(itemOperation,indexOperation) in buttonList">
							<el-button class="mg-lr2 pd-lr10" @click="editList(index2)" size="mini" type="success" v-if="itemOperation.text=='修改'">修改</el-button>
							<el-button class="mg-lr2 pd-lr10" @click="delList(index2)" size="mini" type="danger" v-if="itemOperation.text=='删除'">删除</el-button>
							<el-button class="mg-lr2 pd-lr10" @click="delList(index2)" size="mini" type="primary" v-if="itemOperation.text=='增加子角色'">增加子角色</el-button>
						</div>
					</div>

				</td>
			</tr>
			<!--子表情况-->
			<tr v-for="(item2child,index2) in childrenTableList" @dblclick="dbclickTo(item2child)" v-if="childrenTableAble" class="test" :key="item2child.id" @mouseover="trListMouseover(index2)" @mouseleave="trListMouseleave(index2)" :class="{current:num==index2,activeA:isTrActive}" ref="trList">
				<!--合并单元格&#45;&#45;列表数据-->
				<td class="pd-tb10 pd-lr10" align="center" v-for="(item5,index5) in lineListCombine2" v-if="combineAble">{{item2[item5.prop]}}</td>
				<!--复选框-->
				<td class="pd-tb5 pd-lr10" align="center" v-if="checkBoxAble">
					<template>
						<label class="fl h30 lh30 mg-lr5 mouse-hand pd-l16 pos-relative">
							<input type="checkbox" value="" @click="singleCheck(index2)"  v-model="item2child.finished"/>
						</label>
					</template>
				</td>
				<!--普通列-->
				<td class="pd-tb5 pd-lr10" align="center" v-for="(item1,index1) in lineList" :class="item1.class"  v-if="!editTableInput">{{item2child[item1.prop]}}</td>
				<!--普通列嵌套input框-->
				<td class="pd-tb5 pd-lr10" align="center" v-for="(item1,index1) in lineList" :class="item1.class"  v-if="editTableInput">
					<template>
						<input type="text" v-model="item2child[item1.prop]" style="border:1px solid gainsboro">
					</template>
				</td>
				<!--操作列-->
				<td class="pd-tb5 pd-lr10" align="center">
					<div class="w300">
						<div class="f0 inline-block" v-if="operationAble" v-for="(itemOperation,indexOperation) in buttonList">
							<el-button class="mg-lr2 pd-lr10" @click="delChildList(index2)" size="mini" type="danger" v-if="itemOperation.text=='删除'">删除</el-button>
						</div>
					</div>
				</td>
			</tr>
			<tr class="sumListTr" v-if="sumList">
				<td class="pd-tb5 pd-lr10" align="center">合计</td>
				<!--循环合计-->
				<td class="pd-tb5 pd-lr10" v-for="(item1,index1) in lineList"></td>
				<!--操作栏-->
				<!--操作列-->
				<td class="pd-tb5 pd-lr10 w300"  align="center">
				</td>
			</tr>

		</tbody>
		<!----------------------------------->
	</table>
	<div>
		<span>已选择{{finishCount}}条</span>&nbsp&nbsp&nbsp
		<span>共计{{this.dataList.length}}条</span>
	</div>
	<div class="mg-b20">
		<div class="bg-color-white clear">
			<el-pagination
				background
				class="fr"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="$store.state.currentPageNum"
				:page-sizes="[5, 10, 20]"
				:page-size="5"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalListNum">
			</el-pagination>
		</div>
	</div>

</div>

</template>

<script>
	import { get, post, $delete } from './../../../../util/http'
	import { formatGetUrl, trimString, baseUrl } from '../../../../../static/js/common'
	import eventVue from './../../../../../static/js/eventBus'
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	// import {tableEvent} from './../../../../../static/js/tableFlex'
    export default {
      name: "tableItem",
			components:{
				// tableButton
			},
			computed:{
				// 获得getters的数据
				...mapGetters([
					'getTableList',
					'getWatchTableList',
					'getTableCurrentRow',
					'getInputDisabled',
					'getCurrentPageSize',
					'getCurrentPageNum',
					'getTotalListNum'
				]),
				dataList:{
					get: function () {
						return this.getTableList;
					},
					set: function (val) {
						this.setTableList(val);
					}
				},
				// tableList: {
				// 	get: function () {
				// 		return this.getTableList;
				// 	},
				// 	set: function (val) {
				// 		this.setTableList(val);
				// 	}
				// },

				// 当前行数据
				tableCurrentRow:{
					get: function () {
						return this.getTableCurrentRow;
					},
					set: function (val) {
						this.setTableCurrentRow(val);
					}
				},
				// 列表数据总条数
				totalListNum:{
					get: function () {
						return this.getTotalListNum;
					},
					set: function (val) {
						this.setTotalListNum(val);
					}
				},
				// input框是否可编辑
				inputDisabled:{
					get: function () {
						return this.getInputDisabled;
					},
					set: function (val) {
						this.setInputDisabled(val);
					}
				},
				// 当前的列表pageSize
				currentPageSize:{
					get: function () {
						return this.getCurrentPageSize;
					},
					set: function (val) {
						this.setCurrentPageSize(val);
					}
				},
				// 当前的列表pageNum
				currentPageNum:{
					get: function () {
						return this.getCurrentPageNum;
					},
					set: function (val) {
						this.setCurrentPageNum(val);
					}
				},
				// watchTableList:{
				// 	get: function () {
				// 		return this.getWatchTableList;
				// 	},
				// 	set: function (val) {
				// 		this.setWatchTableList(val);
				// 	}
				// },
				finishCount(){
					var tableListTo=this.dataList;
					return tableListTo.reduce((total,tableListTo)=>total+(tableListTo.finished?1:0),0)
				},
       // -----------
				checkedAllTo:{
					// 被动选择
					get(){
							return this.finishCount===this.dataList.length;
					},
					// 主动点击
					set(value){
						var tableListTo=this.dataList;
						  tableListTo.forEach(tableListTo=>{
								tableListTo.finished=value;
							})
					}


				}
			},
			watch: {
				getWatchTableList: function (newValue, oldValue) {
					this.searchListData(this.searchFormAll);
				},

			},
			props:{
        	// 列表表头
         'lineList':{
         	   type:Array,
					   default:function(){
					   	  return []
						 }
				 },
				// 子表数据
				'childrenTableList':{
					type:Array,
					default:function(){
						return []
					}
				},

				// 是否有子表
					'childrenTableAble':{
							type:Boolean,
						default:function(){
								return false
							}
						},
				// 是否有操作列
				'operationAble':{
					type:Boolean,
					default:function(){
						return false
					}
				},
				// 是否有复选框列
				'checkBoxAble':{
					type:Boolean,
					default:function(){
						return false
					}
				},
				// 是否合并单元格
				'combineAble':{
					type:Boolean,
					default:function(){
						return false
					}
				},
				// 合并单元格数据1
				'lineListCombine1':{
					type:Array,
					default:function(){
						return []
					}
				},
				// 合并单元格数据2
				'lineListCombine2':{
					type:Array,
					default:function(){
						return []
					}
				},

				// 合并单元格数据2
				'lineListCombine32':{
					type:Array,
					default:function(){
						return []
					}
				},
				// 合并单元格数据222
				'lineListCombine222':{
					type:Array,
					default:function(){
						return []
					}
				},
				// 查询的url
				'firstTableUrl':{
					type:String,
					default:function(){
						return ''
					}
				},

				// url删除
				'tableUrl':{
         	type:String,
					default:function(){
						return ''
					}
				},
				// 点击修改获取当前行数据url
				'editGetIdUrl':{
					type:String,
					default:function(){
						return ''
					}
				},
				// 导出按钮是否存在
				'isExportList':{
         	type:Boolean,
					default:function(){
						return false
					}
				},
				// 删除按钮是否存在
				'isManyDelete':{
					type:Boolean,
					default:function(){
						return false
					}
				},
				// 是否有合计
				'sumList':{
					type:Boolean,
					default:function(){
						return false
					}
				},
				// 按钮组合
				'buttonList':{
					type:Array,
					default:function(){
						return []
					}
				},
				// table单元格是否可编辑
				'editTableInput':{
					type:Boolean,
					default:function(){
						return false
					}
				},

			},
			data(){
      	return{
					query: '',
					isTrActive:true,
					num:0,
					// 查询的数据
					searchFormAll:{},
					// dataList:"",
				}
			},
			created(){
      	// 接收兄弟组件formSearch传过来的东西
				eventVue .$on("send",(data)=>{   //这里最好用箭头函数，不然this指向有问题
					// 调用查询接口
					this.searchFormAll=data;
					console.log(this.searchFormAll,"兄弟组件传过来的数据")
					this.searchListData(this.searchFormAll);
				})

				var arr=Object.keys(this.searchFormAll);
				console.log(arr,"传过来的form对象");
				if(arr.length==0){
					this.searchFormAll={};
					this.searchListData(this.searchFormAll);
				}

			},
			mounted(){
      	// this.firstTableList()
				this.tableEvent();
				// var table=document.getElementsByTagName("table")[0];
				// this.makeSortable(table);
				// $("table-style-default").resizableColumns({});

				$('th').resizable();

			},
			methods:{
				...mapActions([
					'setTableList',
					'setTableCurrentRow',
					'setInputDisabled',
					'setWatchTableList',
					'setCurrentPageSize',
					'setCurrentPageNum',
					'setTotalListNum'
				]),
      	// 行鼠标触碰的时候事件
				trListMouseover(index2){
					this.isTrActive=false;
					this.num=index2;

				},
				// 行鼠标离开的时候事件
				trListMouseleave(index2){
					this.isTrActive=true;

				},
				// 双击事件
				dbclickTo(item2,item2child){
					if(item2){
						// 主表
						console.log(item2.id);
						this.$emit("dbclickTo",item2,item2child);
					}else{
						// 子表
						console.log(item2child.id);
						this.$emit("dbclickTo",item2,item2child);
					}
				},
				// 删除子表
				delChildList(index2){
					this.$emit("delChildList",index2)
				},
				// -----删除功能-------
				delList(index2){
					// 获得当前行id
					var rowId=this.dataList[index2].id;
					var iform = {
						id:rowId,
						loginToken:123,
					};
					let formData = this.$qs.stringify(iform);
					$delete(this.delTableUrl, formData).then(function(response) {
						if (response.data.status === 0){
							alert('删除成功')
							// tableList.splice(index, 1);
							// this.total = this.total - 1;
						} else {
							alert('删除失败')
						}
						})
				},
				// 查询功能
				searchListData(formData){
					var data = {
						pageNum:this.currentPageNum,
						pageSize:this.currentPageSize,
						loginToken:123
					};
					// var dataTo=Object.assign(formData,data);
					var dataTo={...formData,...data};
					console.log(dataTo,"最终提交的数据");
					get(this.firstTableUrl,dataTo).then((response) =>{
						this.dataList = response.data.data.list;
						console.log(this.dataList,"列表数据222222222");
						this.totalListNum=response.data.data.total;
						console.log(this.totalListNum,'总共有几条数据');
						this.setCurrentPageNum(this.currentPageNum);
						this.setCurrentPageSize(this.currentPageSize);

					}, (response) => {
					}) .catch(function (response) {

					})
				},
				// 修改功能
				editList(index2){
					this.$store.state.isAddForm=true;
					this.$store.state.addTitle="修改数据";
					this.$store.state.inputDisabled=false;

					var rowId=this.dataList[index2].id;

					var data = {
						id:rowId,
						loginToken:123
					};
					get(this.editGetIdUrl,data).then((response) => {
              if(response.data.status===0){
                  this.tableCurrentRow=response.data.data;
                  console.log(this.tableCurrentRow,'当前行数据');
							}else{

							}

					}, (response) => {
					}) .catch(function (response) {

					})
				},
				// 导出功能
				getExportList(){
					var tableListTo=this.dataList;
					var arrFinish=tableListTo.filter(item=>item.finished);
					var arrIds = [];
					for(var i=0;i<arrFinish.length;i++){
						arrIds.push(arrFinish[i].id);
					}
					console.log(arrIds,'所勾选的数组')
				},
				// 批量删除功能
				getManyDelete(){
					var tableListTo=this.dataList;
					var arrFinish=tableListTo.filter(item=>item.finished);
					var arrIds = [];
					for(var i=0;i<arrFinish.length;i++){
						arrIds.push(arrFinish[i].id);
					}
					console.log(arrIds,'所勾选的数组')
				},

				// 单个删除
				singleCheck(index2){
					var rowId=this.dataList[index2].id;
				},
				//表格伸缩
				tableEvent(){
					var tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
					var table = document.getElementsByClassName("table-style-default")[0];
					// var table = document.getElementsByTagName("table-style-default");
					for (let j = 0; j < table.rows[0].cells.length; j++) {
						table.rows[0].cells[j].onmousedown = function () {
							//记录单元格
							tTD = this;
							if (event.offsetX > tTD.offsetWidth - 10) {
								tTD.mouseDown = true;
								tTD.oldX = event.x;
								tTD.oldWidth = tTD.offsetWidth;
							}
//记录Table宽度
//table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;
//tTD.tableWidth = table.offsetWidth;
						};
						table.rows[0].cells[j].onmouseup = function () {
//结束宽度调整
							if (tTD == undefined) tTD = this;
							tTD.mouseDown = false;
							tTD.style.cursor = 'default';
						};
						table.rows[0].cells[j].onmousemove = function () {
//更改鼠标样式
							if (event.offsetX > this.offsetWidth - 10)
								this.style.cursor = 'col-resize';
							else
								this.style.cursor = 'default';
//取出暂存的Table Cell
							if (tTD == undefined) tTD = this;
//调整宽度
							if (tTD.mouseDown != null && tTD.mouseDown == true) {
								tTD.style.cursor = 'default';
								if (tTD.oldWidth + (event.x - tTD.oldX)>0)
									tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
//调整列宽
								tTD.style.width = tTD.width;
								tTD.style.cursor = 'col-resize';
//调整该列中的每个Cell
								table = tTD; while (table.tagName != 'TABLE') table = table.parentElement;
								for (j = 0; j < table.rows.length; j++) {
									table.rows[j].cells[tTD.cellIndex].width = tTD.width;
								}
//调整整个表
//table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);
//table.style.width = table.width;
							}
						};
					}
				},

				// 表格排序
				//查找表格的<th>元素，让它们可单击
				makeSortable(table){
			var headers=table.getElementsByTagName("th");
			for(var i=0;i<headers.length;i++){
				(function(n){
					var flag=false;
					headers[n].onclick=function(){
						// sortrows(table,n);
						var tbody=table.tBodies[0];//第一个<tbody>
						var rows=tbody.getElementsByTagName("tr");//tbody中的所有行
						rows=Array.prototype.slice.call(rows,0);//真实数组中的快照

						//基于第n个<td>元素的值对行排序
						rows.sort(function(row1,row2){
							var cell1=row1.getElementsByTagName("td")[n];//获得第n个单元格
							var cell2=row2.getElementsByTagName("td")[n];
							var val1=cell1.textContent||cell1.innerText;//获得文本内容
							var val2=cell2.textContent||cell2.innerText;

							if(val1<val2){
								return -1;
							}else if(val1>val2){
								return 1;
							}else{
								return 0;
							}
						});
						if(flag){
							rows.reverse();
						}
						//在tbody中按它们的顺序把行添加到最后
						//这将自动把它们从当前位置移走，故没必要预先删除它们
						//如果<tbody>还包含了除了<tr>的任何其他元素，这些节点将会悬浮到顶部位置
						for(var i=0;i<rows.length;i++){
							tbody.appendChild(rows[i]);
						}

						flag=!flag;
					}
				}(i));
			}
	},

				// 分页-改变pagesize
				handleSizeChange(val) {
					// 当前页的pagesize
					this.setCurrentPageSize(val);
					console.log(this.currentPageSize,'当前的pagesize')
					this.handleCurrentChange(this.currentPageNum);
				},
				// 分页  改变页码
				handleCurrentChange(val,formData) {
					this.setCurrentPageNum(val);
					this.searchListData(formData);

					// var searchAllData=data;
					// this.currentPageNum=val;
					// // this.setCurrentPageNum(val);
					// // eventVue.$emit("send2",searchAllData,this.$store.state.currentPageNum,this.$store.state.currentPageSize);
					//
					// var data = {
					// 	// fname:this.searchFormList.fname,
					// 	// lname:this.searchFormList.lname,
					// 	pageNum:this.$store.state.currentPageNum,
					// 	pageSize:this.$store.state.currentPageSize,
					// 	loginToken:123
					// };
					// var dataTo={...formData,...data};
					// console.log(dataTo,'分页时传递的数据');
					// get(this.firstTableUrl,dataTo).then((response) => {
					// 	this.dataList = response.data.data.list;
					// 	console.log("返回的值",this.dataList);
					// 	this.totalListNum=response.data.data.total;
					// }, (response) => {
					// }) .catch(function (response) {
					//
					// })
				},

      }
    }
</script>

<style>
	.table-style-default {

	}
	.table-style-default tr {

	}
	.table-style-default tr:hover {

	}
	.table-style-default th {
		background: #49b0bf;
		border: 1px solid #71c7d4;
	}
	.table-style-default td {
		border: 1px solid #dcdfe6;
	}

	.current{
		background:#e4efff;
	}
	.activeA{
		background:#ffff;
	}
	.sumListTr{
		/*position:fixed;*/

	}
	/*.className{
		width:400px;
	}*/
</style>
