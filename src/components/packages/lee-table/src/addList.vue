<!--列表内按钮模块封装-->
<template>
	<div class="black-opacity-50p w100p h100p pos-fix pos-c z-1000" v-show="isAddForm">
		<div class="bg-color-white br6 w1080 h670 pos-abs pos-c addFormDiv overflow-scroll">
	<!--<div v-show="isAddForm">-->
	<!--<div>-->
			<div class="f16 h40 lh40 text-center mg-b20 form-title">{{this.$store.state.addTitle}}</div>
			
			<div class="form-content">
				<div class="clear field-box mg-b20">
					<div class="fl w90 h30 lh30 text-right field-name"><span>内容类型:</span></div>
					<div class="pd-l100">
						<el-input size="small" v-model="iForm.dictDataValue" placeholder="请输入内容" :disabled="inputDisabled"></el-input>
					</div>
				</div>
				<div class="clear field-box mg-b20">
					<div class="fl w90 h30 lh30 text-right field-name"><span>缩写:</span></div>
					<div class="pd-l100">
						<el-input size="small" v-model="iForm.dictDataValueTwo" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="clear field-box mg-b20">
					<div class="fl w90 h30 lh30 text-right field-name"><span>状态:</span></div>
					<div class="pd-l100">
						<el-input size="small" v-model="iForm.status" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="clear field-box mg-b20">
					<div class="fl w90 h30 lh30 text-right field-name"><span>备注:</span></div>
					<div class="pd-l100">
						<el-input size="small" v-model="iForm.remark" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="clear field-box mg-b20">
					<div class="fl w90 h30 lh30 text-right field-name"><span>序列:</span></div>
					<div class="pd-l100">
						<el-input size="small" v-model="iForm.score" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
			<el-button @click="addChildrenListTo()" class="fr mg-l20 pd-lr20" size="small" type="success">新增</el-button>
			<!--子表-->
			<!--<div class="bg-color-white pd-lr10 pd-tb10">-->
				<!--列表-->
				<tableItem
					:delTableUrl="delTableUrl"
					:lineList="lineList"
					:operationAble="operationAble"
					:checkBoxAble="checkBoxAble"
					:combineAble="combineAble"
					:isExportList="isExportList"
					:isManyDelete="isManyDelete"
					:sumList="sumList"
					:editTableInput="editTableInput"
					:childrenTableList="childrenTableList"
					:childrenTableAble="childrenTableAble"
					@delChildList="delChildList"
					:buttonList="buttonList"
				>
				</tableItem>
			<!--</div>-->
			<div class="text-center">
				<el-button @click="addListTo" class="pd-lr20" size="small" type="primary">保存</el-button>
				<el-button @click="cancelChange" class="pd-lr20" size="small">取消</el-button>
			</div>

		</div>
	</div>
</template>

<script type="module">
	import {get, post} from './../../../../util/http'
	import {formatGetUrl, trimString, baseUrl} from '../../../../../static/js/common'
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import tableItem from '../../../packages/lee-table/src/tableItem'
	// import {tableTo} from './../../../../../static/js/tableEvent'

    export default {
			name: "addList",
			components: {
				tableItem,

			},
			props:{
        	'addTableUrl':{
						type:String,
						default:function(){
							return ''
						}
					},
			},
			computed: {
				...mapGetters([
					'getTableList',
					'getWatchTableList',
					'getIsAddForm',
					'getInputDisabled'
				]),

				tableList: {
					get: function () {
						return this.getTableList;
					},
					set: function (val) {
						this.setTableList(val);
					}
				},
				watchTableList:{
					get:function(){
						return this.getWatchTableList
					},
					set:function(val){
						return this.setWatchTableList(val)
					}
				},
				isAddForm:{
					get:function(){
						return this.getIsAddForm
					},
					set:function(val){
						return this.setIsAddForm(val)
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
			data(){
        	return{
						// 删除url
						delTableUrl:'http://172.18.12.36:8080/hx/api/dic/MsgContentType/deleteByPrimaryKey',
						// 列表表头
						lineList:[
							{'label':'收支','prop':'dictDataValue','width':"","class":"className"},
							{'label':'年龄','prop':'dictDataValueTwo','width':"","class":"aaa"},
							{'label':'颜色','prop':'remark','width':"","class":"className"},
							{'label':'金额','prop':'dictDataName','width':"","class":"className"},
							{'label':'颜色','prop':'status','width':"","class":"className"},
						],
						childrenTableList:[
							{id: 11,
								dictDataName: "2018-04-16 15:48:21.000",
								insertUserId: 1,
								insertUserName: "admin",
								isConcurrent: 0,
								dictDataValueTwo: "8888888888888888",
								remark: "ddd",
								dictDataValue: "(1)短信通道(2)ios友盟app(3)安卓通道",
								updateTime: "2018-04-22 20:09:39.015",
								updateUserId: 1,
								status: "admin",
								finished:true
							},
							{id: 12,
								dictDataName: "1111111",
								insertUserId: 1,
								insertUserName: "3333333",
								isConcurrent: 0,
								dictDataValueTwo: "5555555555",
								remark: "222222222",
								dictDataValue: "6666666666",
								updateTime: "9999999999999",
								updateUserId: 1,
								status: "666666666",
								finished:true
							},
						],
						// 按钮组合
						buttonList:[
							{'text':'删除','prop':'dictDataValueTwo','width':"200"},
						],
						// 单元格是否可编辑
						editTableInput:true,
						// 是否有子表
						childrenTableAble:true,
						// 是否可操作
						operationAble:true,
						// 是否有复选框
						checkBoxAble:false,
						//是否合并单元格
						combineAble:false,
						// 是否有合计
						sumList: false,
						// 导出功能
						isExportList:false,
						// 删除功能
						isManyDelete:false,
						iForm:{
							dictDataValue:'',
							dictDataValueTwo:'',
							status:'',
							remark:'',
							score:'',
						},

					}
			},
			mounted(){

			},
			created(){
				// tableTo();

			},

			methods:{
				...mapActions([
					'setTableList',
					'setWatchTableList',
					'setIsAddForm',
					'setInputDisabled',
				]),

				cancelChange(){
           this.$store.state.isAddForm=false;
					 this.$store.state.inputDisabled=false;
				},
				// 删除子表
				delChildList(index2){
					this.childrenTableList.splice(index2,1);
					console.log(this.childrenTableList,'还剩多少')
				},
				addChildrenListTo(){
					this.childrenTableList.push({
						  dictDataName: "",
							insertUserId: null,
							insertUserName: "",
							isConcurrent: null,
							dictDataValueTwo: "",
							remark: "",
							dictDataValue: "",
							updateTime: "",
							updateUserId: null,
							status: "",
							finished:false
					})
				},
				addListTo(){
					var iform = {
						dictDataValue: this.iForm.dictDataValue,
						dictDataValueTwo: this.iForm.dictDataValueTwo,
						status: this.iForm.status,
						remark: this.iForm.remark,
						score: this.iForm.score,
						loginToken:123
					};
					let formData = this.$qs.stringify(iform);
					post(this.addTableUrl,formData).then((response) => {
						if (response.data.status === 0) {
							console.log('请求成功');
							this.$store.state.isAddForm=false;
							// this.watchTableList=!this.watchTableList;
							console.log(this.$store.state.tableList.length,'总条数');

						} else {
							console.log('请求失败')
						}
					}, (response) => {
					}).catch(function (response) {

					})
				}
			},

		}
</script>

<style>

</style>
