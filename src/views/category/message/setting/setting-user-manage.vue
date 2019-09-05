<template>
	<div class="h100p setting-user-manage pos-relative">
		<div class="h100p pos-relative">
			<div class="permission-left pos-abs t0 w300 h100p">
				<div class=" pos-abs t0 clear">
					<el-input
						class="fl search-role"
						placeholder="模糊搜索"
						size="small"
						clearable
						v-model="filterText">
					</el-input>
				</div>
				<div class="h100p pd-t40 pd-b60 ">
					<div class="h100p overflow-hidden tree-scroll">
						<el-tree
							class="filter-tree"
							:data="data2"
							:props="defaultProps"
							default-expand-all
							:filter-node-method="filterNode"
							@node-click="handleNodeClick"
							ref="tree2">
						</el-tree>
					</div>
				</div>
				<div  class="text-center pos-abs l33 b25">
					<input type="checkbox" class="mg-t20" v-model="checked" @change="getCheckedBox">显示已封存项目
				</div>
			</div>
			
			<div class="pd-l320 permission-right h100p">
				<div class="bg-color-white h100p pd-tb10 pd-lr10 pos-relative" style="box-shadow: #afafaf 2px 2px 10px 0;">
					<div class="permission-button clear">
						<el-button class="common-button" size="small" :disabled="btnDisabled" @click="settingOrganAdd">新增</el-button>
						<!--<el-button class="common-button" :disabled="btnDisabled" @click="settingOrganEdit">查看</el-button>-->
						<!--<el-button class="common-button" :disabled="btnDisabled" @click="settingOrganEdit">修改</el-button>-->
						<!--<el-button class="common-button" :disabled="btnDisabled" @click="settingOrganDelete">删除</el-button>-->
						<el-button class="common-button" size="small"  @click="saveDate" :disabled="btnDisabled">封存</el-button>
						<el-button class="common-button" size="small" :disabled="btnDisabled" @click="startUse()">启用</el-button>
						<el-button class="common-button" size="small" @click="saveSetting()" :disabled="btnDisabled">同步用户</el-button>
						<el-button class="common-button" size="small" @click="resetForm()" :disabled="btnDisabled">EXCEL导入</el-button>
						<el-button class="common-button" size="small" @click="assignRole()" :disabled="btnDisabled">分配角色</el-button>
						<el-button class="common-button" size="small" @click="resetForm()" :disabled="btnDisabled">分配机构账户</el-button>
						<el-button class="common-button" size="small" @click="resetForm()" :disabled="btnDisabled">重置密码</el-button>
					</div>
					
					<!--列表-->
					<tableItem
						:firstTableUrl="firstTableUrl"
						:editGetIdUrl="editGetIdUrl"
						:delTableUrl="delTableUrl"
						:lineList="lineList"
						:operationAble="operationAble"
						:checkBoxAble="checkBoxAble"
						:combineAble="combineAble"
						:sumList="sumList"
						:editTableInput="editTableInput"
						:buttonList="buttonList">
					
					</tableItem>
					
					<div class="w400 pd-l50 pos-abs l0 b10">
						<new-tabs  @changeTab="changeTab" :tableButtons="tableButtons" :currentTab="currentTab" :tabsBox="tabsBoxClassName">
							<template slot="header">
								<div v-show="slot1">
									<el-button class="common-button" size="small">安徽分公司</el-button>
									<el-button class="common-button" size="small">北京分公司账户</el-button>
								</div>
							</template>
							<template slot="footer">
								<div v-show="slot2">
									<el-button class="common-button" size="small">业务操作人角色</el-button>
								</div>
							</template>
						</new-tabs>
					</div>
				</div>
			</div>
		</div>


		

		<!--新增弹出框-->
		<div class="w100p h100p pos-fix pos-c z-1000 popup-panel " v-show="authorityDialogShow">
			<div class="black-opacity-50p w100p h100p pos-relative">
				<div class="br6 bg-color-white w800 h500 pos-abs pos-c overflow-hidden settingUserScrollY">
					<div class="el-icon-close pos-abs t20 r50 f30 z-10  mouse-hand" @click="closeAuthority"></div>
					<!--机构-->
					<div class="clear pd-b10 mg-t30  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10">
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>机构</div>
							<div class="h30 pd-l120 pos-relative">
								<el-select v-model="value" placeholder="请选择" size="small" :disabled="inputDisabled">
									<el-option
										class="w100p"
										v-for="(item,index) in options"
										:key="item.value"
										:label="item.label"
										ref="settingForm"
										:value="item.value">
									</el-option>
								</el-select>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
							</div>
						</div>
					</div>
					<!--部门-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10">
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>部门</div>
							<div class="h30 pd-l120 pos-relative">
								<el-select v-model="value" placeholder="请选择" size="small" :disabled="inputDisabled">
									<el-option
										class="w100p"
										v-for="(item,index) in options"
										:key="item.value"
										:label="item.label"
										ref="settingForm"
										:value="item.value">
									</el-option>
								</el-select>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
							</div>
						</div>
					</div>
					<!--创建人-->
					<div class="clear pd-b10 pd-t10 pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>创建人</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--用户名-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>用户名</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--用户密码-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>用户密码</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--密码确认-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>密码确认</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--绑定ip-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>绑定ip</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--邮箱地址-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>邮箱地址</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--用户类型-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10">
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>用户类型</div>
							<div class="h30 pd-l120 pos-relative">
								<el-select v-model="value" placeholder="请选择" size="small" :disabled="inputDisabled">
									<el-option
										class="w100p"
										v-for="(item,index) in options"
										:key="item.value"
										:label="item.label"
										ref="settingForm"
										:value="item.value">
									</el-option>
								</el-select>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
							</div>
						</div>
					</div>
					<!--接口类型-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10">
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>接口类型</div>
							<div class="h30 pd-l120 pos-relative">
								<el-select v-model="value" placeholder="请选择" size="small" :disabled="inputDisabled">
									<el-option
										class="w100p"
										v-for="(item,index) in options"
										:key="item.value"
										:label="item.label"
										ref="settingForm"
										:value="item.value">
									</el-option>
								</el-select>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
							</div>
						</div>
					</div>
					<!--接口账户-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>接口账户</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--接口密码-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>接口密码</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--手机-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>手机</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<!--是否绑定ip-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>是否绑定ip</div>
							<div class="h30 pd-l120 pos-relative">
								<input
									type="checkbox"
									v-model="dictTo">绑定
								<input
									type="checkbox"
									v-model="dictTo">不绑定
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
							</div>
						</div>
					</div>
					<!--是否绑定手机号-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>是否绑定手机号</div>
							<div class="h30 pd-l120 pos-relative">
								<input
									type="checkbox"
									v-model="dictTo">绑定
								<input
									type="checkbox"
									v-model="dictTo">不绑定
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
							</div>
						</div>
					</div>
					<!--访问ip/域名-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>访问ip/域名</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>

					<!--用户说明-->
					<div class="clear pd-b10  pd-lr40">
						<div class="fl w100p  form-field-box mg-b10" >
							<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>用户说明</div>
							<div class="h30 pd-l120 pos-relative">
								<el-input
									class="w100p"
									size="small"
									v-model="dictTo"
									:disabled="inputDisabled"
									:clearable="clearable"
									@blur="changeTo()"
									placeholder="请输入"></el-input>
								<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

							</div>
						</div>
					</div>
					<div class="mg-l300">
						<button class="common-button-medium mg-l20" @click="">保存</button>
						<button class="common-button-medium mg-l20" @click="closeAuthority">取消</button>
					</div>
				</div>
			</div>
		</div>
		<!--分配角色-->
		<div class="w100p h100p pos-fix pos-c z-1000 popup-panel " v-show="authorityDialogAssign">
			<div class="black-opacity-50p w100p h100p pos-relative">
				<div class="br6 bg-color-white w800 h500 pos-abs pos-c overflow-hidden settingUserScrollY">
					<div class="el-icon-close pos-abs t20 r50 f30 z-10  mouse-hand" @click="closeAssignRole"></div>
					<el-tree
						class="filter-tree"
						:data="data2"
						:props="defaultProps"
						default-expand-all
						:filter-node-method="filterNode"
						@node-click="handleNodeClick"
						ref="tree2">
					</el-tree>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { get, post } from '../../../../util/http'
	import tableItem from '../../../../components/packages/lee-table/src/tableItem'
	import newTabs from '../../../../components/navigation/tabs/newTabs'
	import testWords from '../../../../components/packages/marked-words/test-words'
	export default {
		name: "setting-user-manage",
		components:{
			tableItem,
			newTabs,
			testWords
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		data(){
			return{
				value:"",
				options:[],
				checked:false,
				// 选项卡显示
				slot1:true,
				slot2:false,
				// 过滤数据
				filterText: '',
				// 新增框是否显示
				authorityDialogShow:false,
				// 分配角色
				authorityDialogAssign:false,
				// 树形控件所有数据
				data2: [],
				// 树形控件数据的配置
				defaultProps: {
					children: 'childTSMenuTreeMsgVo',
					label: 'name'
				},
				// 查询时url
				firstTableUrl:"http://172.18.12.36:8080/hx/api/BusinessType/selectByMap",
				// 删除url
				delTableUrl:'http://172.18.12.36:8080/hx/api/dic/MsgContentType/deleteByPrimaryKey',
				// 新增url
				addTableUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/insertSelective",
				// 点击修改获取当前行数据url
				editGetIdUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByPrimaryKey",
				// 列表表头
				lineList:[
					{'label':'并行串行','prop':'msgStrategyName','width':"","class":"className"},
					{'label':'名称','prop':'name','width':"","class":"aaa"},
					{'label':'主名称','prop':'insertTime','width':"","class":"className"},
					{'label':'规则','prop':'insertUserName','width':"","class":"className"},
					{'label':'是否检查','prop':'msgStrategyRule','width':"","class":"className"},
				],
				// 按钮组合
				buttonList:[
					{'text':'修改','prop':'dictDataValue','width':"200"},
					{'text':'删除','prop':'dictDataValueTwo','width':"200"},
				],
				checkboxList:[
					{'label':'月份','prop':'dictDataValue','width':"","class":"className","saveCheckTo":false},
					{'label':'周期','prop':'dictDataValueTwo','width':"","class":"aaa","saveCheckTo":true},
					{'label':'时间','prop':'remark','width':"","class":"className","saveCheckTo":false},
					{'label':'金额','prop':'dictDataName','width':"","class":"className","saveCheckTo":true},
					{'label':'颜色','prop':'status','width':"","class":"className","saveCheckTo":true},
				],
				// 是否有复选框
				checkBoxAble:true,
				// 是否有操作栏
				operationAble:true,
				//是否合并单元格
				combineAble:false,
				// 是否有合计
				sumList: false,
				// 单元格是否可编辑
				editTableInput:false,
				// 选项卡按钮
				tableButtons:[
					{id:1,name:"已分配机构信息"},
					{id:2,name:"已分配角色"},
				],
				currentTab:1,
				tabsBoxClassName: 'tabs-box',
				// 按钮是否可点击
				btnDisabled:true,
				testWords:"",
				clearable:true,
				inputDisabled:false,
				// input框绑定值
				dictTo:""
			}
		},
		created(){
			this.getOrangizationData();
			
		},
		mounted() {
			let treeScroll = $('.tree-scroll');
			treeScroll.mCustomScrollbar({
				set_width: false,
				set_height: false,
				// horizontalScroll: false,
				axis:"y",
				scrollInertia: 100, // 滚动条惯性(值越大惯性越大)
				scrollEasing: "easeOutCirc",
				mouseWheel: true, //
				autoDraggerLength: true,
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 20
				},
				advanced:{
					updateOnBrowserResize: true,
					updateOnContentResize: true,
					autoExpandHorizontalScroll: true,
					autoScrollOnFocus: true
				},
				callbacks:{
					onScrollStart: function(){},
					onScroll: function(){},
					onTotalScroll: function(){},
					onTotalScrollBack: function(){},
					onTotalScrollOffset: 0,
					whileScrolling: false,
					whileScrollingInterval: 10
				}
			});
		},
		methods:{
			getCheckedBox(){

			},
			// 获取树形控件数据
			getOrangizationData(){
				var data = {
					orgId:1,
					loginToken:123
				};
				get("http://172.18.12.36:8080/hx/api/org/selectManageRoleMenuTree",data).then((response) =>{
					this.data2 = response.data.data.list;

				}, (response) => {
				}) .catch(function (response) {

				})
			},
			// 树形控件模糊搜索
			filterNode(value, data){
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			// 树形控件节点被点击
			handleNodeClick(data,node) {
				// 点击时的id
				console.log(node.id);
				// 按钮是否可点击
				this.btnDisabled=false;
				// input框是否可点击
				this.inputDisabled=false;

			},
			// 切换选项卡
			changeTab(item, tab) {

				if(item.id===1){
					this.slot1=true;
					this.slot2=false;
				}else{
					this.slot1=false;
					this.slot2=true;
				}
				this.currentTab = item.id;
				console.log(this.currentTab,'------------');
				// this.currentContent = tab.component;
			},
			// 点击新增,出现新增框
			settingOrganAdd(){
				this.authorityDialogShow = true;
			},
			// 关闭新增框
			closeAuthority(){
				this.authorityDialogShow = false;
			},
			// input框输入失去焦点
			changeTo(){

			},
			// 同步用户
			saveSetting(){
				this.$message({
					message:'已同步用户',
					type: 'success'
				});
			},
			// 启用
			startUse(){
				this.$message({
					message:'已启用',
					type: 'success'
				});
			},
			// 重置
			resetForm(){

			},
			// 分配角色
			assignRole(){
				this.authorityDialogAssign=true;
			},
			// 关闭分配角色
			closeAssignRole(){
				this.authorityDialogAssign = false;
			},


			// 封存
			saveDate(){
				this.$message({
					message:'已封存',
					type: 'success'
				});
			},
			// 删除
			settingOrganDelete(){

			},
			// 修改
			settingOrganEdit(){
         this.authorityDialogShow=true;
			},
		}
	}
</script>

