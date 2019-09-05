<template>
	<div class="setting-demo">
		<!-- search-box begin -->
		<div class="bg-color-white mg-b10 pd-lr20 pd-t20 pos-relative search-box">
			<div :class="isHidden?'search-hidden':'search-out'" class="search-box-box">
				<formSearch ref="search"></formSearch>
			</div>

			<!--索引项收缩start-->
			<searchBox @hiddenUpEvent="hiddenUpEvent" :isHiddenUp="isHiddenUp" :isHiddenDown="isHiddenDown"></searchBox>
			<!--索引项收缩end-->
		</div>
		<!-- search-box end -->
		<!--查询项-->
		<div class="clear bg-color-white pd-lr10 pd-tb10">
			<!--:for="'label-' + (index + 1)"-->
			<!--:for="label- `${index + 1}`"-->
			<!--定制列表-->
			<div class="fl mg-l20">
				<div class="clear">
					<div class="fl">
						<label class="fl h30 lh30 mg-lr5 mouse-hand pd-l16 pos-relative"
									 :for="`label-`+`${index + 1}`"
									 v-for="(item1,index) in checkboxList">
							<input class="pos-abs pos-c-l" :id="`label-`+`${index + 1}`" type="checkbox" v-model="item1.saveCheckTo">
							<span>{{item1.label}}</span>
						</label>
					</div>
					<el-button @click="saveCheck()" class="fl mg-l20 pd-lr15" size="small" type="primary">确定</el-button>
				</div>
			</div>
			<el-button @click="addListTo()" class="fl mg-l20 pd-lr20" size="small" type="success">新增</el-button>
		</div>

		<div class="bg-color-white pd-lr10 pd-tb10">
			<!--列表-->
			<tableItem
				:firstTableUrl="firstTableUrl"
				:editGetIdUrl="editGetIdUrl"
				:delTableUrl="delTableUrl"
				:lineList="lineList"
				:operationAble="operationAble"
				:checkBoxAble="checkBoxAble"
				:combineAble="combineAble"
				:isExportList="isExportList"
				:isManyDelete="isManyDelete"
				:sumList="sumList"
				:editTableInput="editTableInput"
				:childrenTableAble="childrenTableAble"
				:buttonList="buttonList"
				@dbclickTo="dbclickTo"
			>
			</tableItem>
		</div>

		<!--新增修改框-->
		<div class="">
			<addList :addTableUrl="addTableUrl"></addList>
		</div>
	</div>
</template>

<script type="module">
	import markedWords from './../../../../components/packages/marked-words/marked-words'
	import testWords from './../../../../components/packages/marked-words/test-words'
	import tableItem from './../../../../components/packages/lee-table/src/tableItem'
	import addList from './../../../../components/packages/lee-table/src/addList'
	import formSearch from './../../../../components/packages/lee-table/src/formSearch'
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import searchBox from './../../../../components/search/search-box'
	// import {tableEvent} from './../../../../static/js/tableFlex'
	export default {
		name: "setting-demo",
		components: {
			formSearch,
			tableItem,
			addList,
			markedWords,
			testWords,
			searchBox
		},
		data () {
			return {
				isHiddenUp: true,//向上收缩的箭头
				isHiddenDown: false,//向下展开的箭头*/
				isHidden: false,

				testWords: '必填',
				markedTitle: '此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦',
				projectName: '',
				input1: '',
				input2: '',
				input3: '',
				input4: '',
				radio: 1,
				// 查询的url
				firstTableUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByMap",
				// 删除url
				delTableUrl:'http://172.18.12.36:8080/hx/api/dic/MsgContentType/deleteByPrimaryKey',
				// 新增url
				addTableUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/insertSelective",
				// 点击修改获取当前行数据url
				editGetIdUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByPrimaryKey",
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
				checkboxList:[
					{'label':'月份','prop':'dictDataValue','width':"","class":"className","saveCheckTo":false},
					{'label':'周期','prop':'dictDataValueTwo','width':"","class":"aaa","saveCheckTo":true},
					{'label':'时间','prop':'remark','width':"","class":"className","saveCheckTo":false},
					{'label':'金额','prop':'dictDataName','width':"","class":"className","saveCheckTo":true},
					{'label':'颜色','prop':'status','width':"","class":"className","saveCheckTo":true},
				],
				// 是否有子表
				childrenTableAble:false,
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
				sumList: false,
				// 单元格是否可编辑
				editTableInput:false
			}
		},
		created () {

		},
		mounted(){
			$('.table-style-default').resizableColumns({});
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
				set:function(val){
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
		methods: {

			/*收起索引区*/
			hiddenUpEvent(){
				if(this.isHidden){
					this.isHiddenDown = false;
					this.isHidden = false;
					this.isHiddenUp = true;
				}else{
					this.isHiddenDown = true;
					this.isHidden = true;
					this.isHiddenUp = false;
				}
			},

			// 获取action中数据
			...mapActions([
				'setWatchTableList',
				'setInputDisabled',
			]),
			// 点击新增
			addListTo(){
				this.$store.state.isAddForm=true;
				this.$store.state.addTitle="新增数据";
				this.$store.state.inputDisabled=false;
			},
			// 双击行
			dbclickTo(item2,item2child){
				if(item2){
					this.$store.state.isAddForm=true;
					this.$store.state.inputDisabled=true;
				}
			},
			saveCheck(){
				this.lineList=this.checkboxList.filter(item=>item.saveCheckTo);
				console.log(this.checkboxList,'选择的');
			},
			// 切换选项卡
			changeTab: function (tab) {
				this.currentTab = tab.id;
				this.currentContent = tab.component;
			},
			/*收起索引区*/
			hiddenUp(){
				if(this.isHiddenUp){
					this.isHiddenDown = true;
					this.isHidden = false;
					this.isHiddenUp = false;
				}else{
					this.isHiddenDown = false;
					this.isHidden = true;
					this.isHiddenUp = true;
				}
			},
		},
	}
</script>
<style>
	/*新增弹出框样式*/
	.addFormDiv {

	}
</style>

