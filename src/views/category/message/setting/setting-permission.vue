<template>
	<div class="setting-permission h100p">
		<div class="h100p pos-relative">
			<div class="permission-left pd-tb10 pd-lr10 pos-abs t0 w300 h100p">
				<!--<div class="pos-abs t0 clear">-->
					<!--<el-input-->
						<!--class="fl search-role"-->
						<!--placeholder="输入关键字进行过滤"-->
						<!--clearable-->
						<!--v-model="filterText">-->
					<!--</el-input>-->
					<!--&lt;!&ndash;<button class="common-button-medium fl search-role-sure">确定</button>&ndash;&gt;-->
				<!--</div>-->

				<div class="w100p pd-tb10 pd-lr10 pos-abs pos-c-t">
					<el-input
						placeholder="输入关键字进行过滤"
						size="small"
						v-model="filterText">
					</el-input>
				</div>

				<div class="h100p pd-t40 pd-b60 ">
					<div class="h100p tree-left-box">
						<el-tree
							class="filter-tree"
							:data="initTree"
							:highlight-current="true"
							:expand-on-click-node="false"
							@node-click="handleNodeClickRole"
							@node-contextmenu="handleNodeContextmenu"
							:props="defaultProps"
							default-expand-all
							:filter-node-method="filterNode"
							accordion
							ref="tree2">
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<span>{{ node.label }}</span>
						</span>
						</el-tree>
					</div>
					<!--鼠标右键点击出现角色组操作弹框-->
					<div v-show="roleGroupVisible" id="role-group">
						<el-menu
							id = "rightClickMenu"
							class="el-menu-vertical"
							@select="handleRightSelect"
							active-text-color="#fff"
							text-color="#fff">
							<el-menu-item index="1" class="menuItem" >
								<span slot="title">角色组新增</span>
							</el-menu-item>
							<el-menu-item index="2" class="menuItem"  v-show="isRoot">
								<span slot="title">角色组修改</span>
							</el-menu-item>
							<el-menu-item index="3" class="menuItem"  v-show="isRoot">
								<span slot="title">角色组删除</span>
							</el-menu-item>
						</el-menu>
					</div>
				</div>
				<div class="text-center pos-abs l33 b25">
					<el-checkbox @change="sealUpEvent" v-model="checked">显示已封存角色</el-checkbox>
				</div>
			</div>
			<div class="pd-l320 permission-right h100p pd-t0 pd-b60">
				<div class="bg-color-white clear pd-tb10 pd-lr10">
					<el-button class="common-button-medium mg-l20" @click="roleAdd(roleNode,currentNodeData)" size="small" :disabled="roleAddButton">角色新增</el-button>
					<el-button class="common-button-medium mg-l20" @click="roleModify" size="small" :disabled="disabledButton3">角色修改</el-button>
					<el-button class="common-button-medium mg-l20" @click="roleDelete(roleNode,currentNodeData)" size="small" :disabled="disabledButton3">角色删除</el-button>
					<el-button class="common-button-medium mg-l20" @click="roleAuthority" size="small" :disabled="disabledButton3">设置权限</el-button>
					<el-button class="common-button-medium mg-l20" @click="roleSave" size="small" :disabled="isNotAbledStatus">封存</el-button>
					<el-button class="common-button-medium mg-l20" @click="roleStart" size="small" :disabled="abledStatus">启用</el-button>
				</div>
				<div class="manage-right-content h100p">
					<div class="right-content-title">
						<span v-show="isRole">角色组</span>
						<span v-show="!isRole">角色</span>
					</div>
					<div class="right-content-box" v-model="roleData">
						<div class="mg-b15 form-field-box" v-show="isRole">
							<div class="fl w100 h36 lh36 text-right">
								<span class="required" ></span><span v-show="isRole">上级角色组</span>
							</div>
							<div class="h36 pd-l120 pos-relative" >
								<el-input
									class="mg-b20 w100p"
									:readonly="false"
									:disabled="roleGroupUpNameIsDisabled"
									size="small"
									v-model="roleData.upRoleGroup"
									placeholder="请输入内容">
								</el-input>
							</div>
						</div>
						<div class="mg-b15 form-field-box" v-show="!isRole">
							<div class="fl w100 h36 lh36 text-right">
								<span class="required"></span>所属角色组
							</div>
							<div class="h36 pd-l120 pos-relative">
								<el-input
									class="mg-b20 w100p"
									:readonly="false"
									:disabled="roleGroupUpNameIsDisabled"
									size="small"
									v-model="roleData.belongToRoleGroup"
									placeholder="请输入内容">
								</el-input>
							</div>
						</div>
						<div class="mg-b15 form-field-box">
							<div class="fl w100 h36 lh36 text-right">
								<div v-show="isRole">
									<span class="required" v-show="readDetail">*</span><span>角色组编码</span>
								</div>
								<div v-show="!isRole">
									<span class="required" v-show="readDetail">*</span><span>角色编码</span>
								</div>
							</div>
							<div class="h36 pd-l120 pos-relative">
								<el-input
									class="mg-b20 w100p"
									:readonly="false"
									maxlength="50"
									@blur="testRoleCode"
									:disabled="rightDisabled"
									size="small"
									v-model="roleData.roleGroupCode"
									placeholder="请输入内容">
								</el-input>
								<i v-show="codeIsMust" class="pos-abs t30 lf isCodeNumber">必填</i>
								<i v-show="isCodeNumber" class="pos-abs t30 lf isCodeNumber">请填写非中文编码</i>
							</div>
						</div>
						<div class="mg-b15 form-field-box">
							<div class="fl w100 h36 lh36 text-right">
								<div v-show="isRole">
									<span class="required" v-show="readDetail">*</span><span >角色组名称</span>
								</div>
								<div v-show="!isRole">
									<span class="required" v-show="readDetail">*</span><span >角色名称</span>
								</div>
							</div>
							<div class="h36 pd-l120 pos-relative">
								<el-input
									class="mg-b20 w100p"
									:readonly="false"
									maxlength="50"
									@blur="testRoleName"
									:disabled="rightDisabled"
									size="small"
									v-model="roleData.roleGroupName"
									placeholder="请输入内容">
								</el-input>
								<i v-show="nameIsMust" class="pos-abs t30 lf isCodeNumber">必填</i>
							</div>
						</div>
						<div class="mg-b15 form-field-box">
							<div class="fl w100 h36 lh36 text-right">
								<div v-show="isRole">
									<span class="required" v-show="readDetail"></span><span>角色组描述</span>
								</div>
								<div v-show="!isRole">
									<span class="required" v-show="readDetail"></span><span >角色描述</span>
								</div>
							</div>
							<div class="h36 pd-l120 pos-relative">
								<el-input
									type="textarea"
									class="mg-b20 w100p"
									maxlength="200"
									:readonly="false"
									:disabled="rightDisabled"
									size="small"
									v-model="roleData.roleGroupDes"
									placeholder="请输入内容">
								</el-input>
								<!--<i v-show="desIsMust" class="pos-abs t30 lf isCodeNumber">必填</i>-->
							</div>
						</div>
						<div class="mg-b15 form-field-box" v-show="isShowCreateTime">
							<div class="fl w100 h36 lh36 text-right">
								<span class="required"></span>创建时间
							</div>
							<div class="h36 pd-l120 pos-relative">
								<el-input
									class="mg-b20 w100p"
									:readonly="true"
									:disabled="rightDisabled"
									size="small"
									v-model="roleData.createTime"
									placeholder="">
								</el-input>
							</div>
						</div>
					</div>
					<div class="handle-button">
						<el-button class="common-button-medium mg-r20" :disabled="rightDisabled" size="small" v-show="readDetail" @click="saveEdit(roleNode,currentNodeData)">保存</el-button>
						<el-button class="common-button-medium" :disabled="rightDisabled" size="small" v-show="readDetail" @click="cancelButton">重置</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="w100p h100p pos-fix pos-c z-1000 popup-panel" v-show="authorityDialogShow">
			<div class="black-opacity-50p w100p h100p pos-relative">
				<div class="br6 bg-color-white w800 h500 pos-abs pos-c">
					<div class="el-icon-close pos-abs t20 r50 f30 z-10 mouse-hand" @click="closeAuthority"></div>
					<div class="authorityBox">
						<div class="mg-t30 w500 h450">
							<el-tree
								:data="authorityDataArr"
								show-checkbox
								accordion
								:default-checked-keys="defaultCheckedKeys"
								:default-expanded-keys="defaultExpandKey"
								@click="getCheckedKeys"
								node-key="id"
								:check-on-click-node="true"
								ref="authorityTree"
								@check="handleChecked"
								:props="defaultPropsAuthority">
							</el-tree>
						</div>
						<div class="pos-abs b30 r30">
							<button class="common-button-medium mg-l20" @click="authoritySure">确定</button>
							<button class="common-button-medium mg-l20" @click="authorityCancle">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { get, post } from '../../../../util/http'
	import {trimString} from '../../../../../static/js/common'
	export default {
		name: "setting-permission",
		data () {
			return {
				isRoot:true,//根节点能否被修改和删除
				readDetail: true,
				defaultExpandKey:[],
				defaultCheckedKeys:[],
				roleGroupUpNameIsDisabled: true,
				disabledButton3: true,
				isNotAbledStatus: true,//封存
				abledStatus: true,//启用
				rightDisabled: true,//右边输入框状态
				roleAddButton: true,//角色新增
				currentNodeId: '',//当前选中的节点id
				isShowCreateTime: false,
				roleGroupVisible: false,//角色组
				filterText: '',
				currentNodeData:null,
				currentNodeFrozenFlag:null,//当前节点是否被封存  0是未封存  1是已封存
				roleNode:null,
				authorityDialogShow: false,//设置权限弹框
				roleData:{
					upRoleGroup: '',//上级角色组
					roleGroupCode: '',//角色组编码
					roleGroupName: '',//角色组名称
					roleGroupDes: '',//角色组描述
					createTime: '',//创建时间
					belongToRoleGroup: '',//所属角色组
				},
				isRepeatCode: false,//角色编码
				isRepeatName: false,//角色名称
				isRepeatGroupCode: false,//角色组编码
				isRepeatGroupName: false,//角色组名称
				isCodeNumber: false,
				isRole: false,
				defaultProps:{
					label: 'roleGroupName',
					children: 'children'
				},
				defaultPropsAuthority:{
					label: 'name',
					children: 'children'
				},
				initTree:[],
				isRoleGroup: null,//是否是角色组'0'是角色组'1'是角色
				isNewAdd: null,//是否是新增'0'是新增'1'是修改
				saveUrl: '',
				authorityDataArr: [],
				testCodeUrl:'',
				testNameUrl:'',
				paramCode:{},
				paramName:{},
				treeUrl: 'http://172.18.12.21:10558/role/initTreeNoFrozen',
				checked: false,//控制显示已封存状态
				codeIsMust: false,
				nameIsMust: false,
				desIsMust: false,
			}
		},
		watch: {
			filterText (val) {
				this.$refs.tree2.filter(val);
			}
		},
		created(){
			//初始化机构数据
			this.getInitTree(this.treeUrl);
		},
		mounted(){
			let menuBoxWrap = $('.tree-left-box');
			menuBoxWrap.mCustomScrollbar({
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
		methods: {
			/*初始化树形数据start*/
			getInitTree(treeUrl){
				post(treeUrl).then((response) =>{
					console.log('后台获取的数据',response.data.data);
					this.initTree = response.data.data.roleWithGroupAlls;
					console.log('树形数据',this.initTree);
				}) .catch(function (response) {

				})
			},
			/*初始化树形数据end*/
			filterNode(value, data) {
				if (!value) return true;
				return data.roleGroupName.indexOf(value) !== -1;
			},
			/*左击角色和角色组*/
			handleNodeClickRole(data,node){
				this.readDetail = false;
				this.isCodeNumber = false;
				this.codeIsMust = false;
				this.nameIsMust = false;
/*
				this.desIsMust = false;
*/
				console.log('左击节点node',node,'左击节点data',data);
				this.roleNode = node;
				this.roleGroupVisible = false; //角色组增删改的显示与否
				this.isShowCreateTime = true; //创建时间显示与否
				this.rightDisabled = true;//右侧表单不可编辑
				this.roleGroupUpNameIsDisabled = true;
				/*判断是角色还是角色组*/
				if (data.flag === "0") {
					/*角色组*/
					this.isRole = true;
					this.roleAddButton = false;
					this.disabledButton3 = true;
					this.isRoleGroup = '0';
					this.isNotAbledStatus = true;
					this.abledStatus = true;
					/*点击节点右侧展示详细信息*/
					/*发请求*/
					let params = {
						id:data.id,
						flag:'0'
					};
					post("http://172.18.12.21:10558/role/GetRoleInfo",params).then((response) =>{
						console.log('后台获取的数据',response.data.data);
						this.roleData.upRoleGroup = response.data.data.RoleGroup.roleGroupNameUp;//上级角色组
						this.roleData.roleGroupCode = response.data.data.RoleGroup.roleGroupCode;//角色组编码
						this.roleData.roleGroupName =response.data.data.RoleGroup.roleGroupName;//角色组名称
						this.roleData.roleGroupDes = response.data.data.RoleGroup.roleGroupDesc;//角色组描述
						this.roleData.createTime = response.data.data.RoleGroup.createTime;//创建时间
						this.currentNodeData = response.data.data.RoleGroup;
					}) .catch(function (response) {

					})
				} else if(data.flag === "1"){
					/*角色*/
					this.isRole = false;
					this.roleAddButton = true;
					this.disabledButton3 = false;
					this.isRoleGroup = '1';
					/*点击节点右侧展示详细信息*/
					/*发请求*/
					let params = {
						id:data.id,
						flag:'1'
					};
					post("http://172.18.12.21:10558/role/GetRoleInfo",params).then((response) =>{
						console.log('后台获取的数据',response.data.data);
						this.roleData.belongToRoleGroup=response.data.data.Role.roleGroupNameUp;//上级角色组
						this.roleData.roleGroupCode= response.data.data.Role.roleCode;//角色组编码
						this.roleData.roleGroupName=response.data.data.Role.roleName;//角色组名称
						this.roleData.roleGroupDes= response.data.data.Role.roleDesc;//角色组描述
						this.roleData.createTime= response.data.data.Role.createTime;//创建时间
						this.currentNodeData = response.data.data.Role;
						if(this.currentNodeData.frozenFlag === '0'){
							this.isNotAbledStatus = false;
							this.abledStatus = true;
						}else{
							this.isNotAbledStatus = true;
							this.abledStatus = false;
						}

					}) .catch(function (response) {

					})
				}
			},
			/*右键出角色组增删改操作*/
			handleNodeContextmenu(event, object, value, element){
				console.log(event, object, value, element);
				if(object.flag === "0"){
					/*角色组*/
					if(object.roleGroupCode === 'root'){
						/*根节点不允许被修改删除*/
						if(object.id===this.currentNodeData.id){
							this.roleGroupVisible = true;
							this.isRoot = false;
						}else{
							this.roleGroupVisible = false;
						}
						document.body.addEventListener('click',(e)=>{
							e.stopPropagation();
							this.roleGroupVisible = false;
						});
						let menu = document.querySelector("#role-group");
						/* 菜单定位基于鼠标点击位置 */
						menu.style.left = event.clientX -150 + "px";
						menu.style.top = event.clientY -100 + "px";
						menu.style.position = "absolute"; // 为新创建的DIV指定绝对定位
						menu.style.width = 130 + "px";
					}else{
						/*如果是角色组并且不是根节点再进行是否是当前选中行的判断*/
						this.isRoot = true;
						if(object.id===this.currentNodeData.id){
							this.roleGroupVisible = true;
						}else{
							this.roleGroupVisible = false;
						}
						document.body.addEventListener('click',(e)=>{
							e.stopPropagation();
							this.roleGroupVisible = false;
						});
						let menu = document.querySelector("#role-group");
						/* 菜单定位基于鼠标点击位置 */
						menu.style.left = event.clientX -150 + "px";
						menu.style.top = event.clientY -100 + "px";
						menu.style.position = "absolute"; // 为新创建的DIV指定绝对定位
						menu.style.width = 130 + "px";
					}

				}else if(object.flag === "1"){
					/*不是角色组禁止弹框出现*/
					this.roleGroupVisible = false;
				}
			},
			/*角色组增删改*/
			handleRightSelect(key){
				console.log('选择角色组操作key',key);
				if (key==='1') {
					this.roleGroupVisible = false;
					this.roleGroupAdd(this.roleNode,this.currentNodeData)
				} else if (key==='2') {
					this.roleGroupVisible = false;
					this.roleGroupModify(this.roleNode,this.currentNodeData)
				} else if (key==='3') {
					this.roleGroupVisible = false;
					this.roleGruopDel(this.roleNode,this.currentNodeData)
				}
			},
			/*角色组新增*/
			roleGroupAdd(node,data){
				this.readDetail = true;
				this.rightDisabled = false;
				this.roleGroupUpNameIsDisabled = true;
				this.isShowCreateTime = false;
				this.isNewAdd = '0';
				this.isRole = true;
				this.roleData.roleGroupCode = '';
				this.roleData.roleGroupDes = '';
				this.roleData.roleGroupName = '';
				this.roleData.upRoleGroup = data.roleGroupName;

			},
			/*角色组修改*/
			roleGroupModify(node,data){
				this.readDetail = true;
				this.rightDisabled = false;
				this.isRole = true;
				this.isShowCreateTime = false;
				this.isNewAdd = '1';
			},
			/*角色组删除*/
			roleGruopDel(node,data){
				this.rightDisabled = true;
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: data.id,
					};
					console.log('删除时参数',params);
					post("http://172.18.12.21:10558/role/delRoleGroup",params).then((response) =>{
						console.log('角色组后台获取的数据',response);
						if (response.data.error != '5006') {
							const parent = node.parent;
							const children = parent.data.children || parent.data;
							const index = children.findIndex(d => d.id === data.id);
							children.splice(index, 1);
							this.getInitTree(this.treeUrl);//保存成功时刷新树形结构
							this.roleData.roleGroupCode = '';
							this.roleData.roleGroupDes = '';
							this.roleData.roleGroupName = '';
							this.roleData.upRoleGroup = '';
							this.roleData.createTime = '';
							this.isRole = false;
							this.readDetail = true;
							this.isShowCreateTime = false;
						} else if (response.data.error === '5006') {
							this.$message({
								type: 'warning',
								message: response.data.error_description
							});
						}

					}) .catch(function (response) {

					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			/*校验角色和角色组编码重复与否*/
			testRoleCode(){
				if(this.roleData.roleGroupCode){
					this.testCodeNumber();//校验是否是数字
					if(!this.isCodeNumber){//先判断是否是数字在判断是角色组还是角色编码
						if (this.isRole) {
							/*角色组编码唯一性*/
							if(this.isNewAdd === '0'){
								/*角色组编码新增时唯一性*/
								this.testCodeUrl = "http://172.18.12.21:10558/role/checkRoleGroupCode";
								this.paramCode = {
									roleGroupCode : this.roleData.roleGroupCode
								};
							}else{
								/*角色组编码修改时唯一性*/
								this.testCodeUrl = "http://172.18.12.21:10558/role/checkRoleGroupCodeForUpdate";
								this.paramCode = {
									roleGroupCode : this.roleData.roleGroupCode,
									gid: this.currentNodeData.id
								};
							}
							get(this.testCodeUrl,this.paramCode).then((response) =>{
								console.log('后台获取的数据',response);
								if(response.data.error === "0"){
									this.isRepeatGroupCode = false;
									this.codeIsMust = false;
								}else{
									this.$message({
										message: response.data.error_description,
										type: 'error'
									});
									this.isRepeatGroupCode = true;
								}

							}) .catch(function (response) {
								alert('请求失败')
							})
						} else if (!this.isRole) {
							/*角色*/
							if(this.isNewAdd === '0'){
								/*角色编码新增时唯一性*/
								this.testCodeUrl = "http://172.18.12.21:10558/role/checkRoleCode"
								this.paramCode = {
									roleCode : this.roleData.roleGroupCode
								};
							}else{
								/*角色编码修改时唯一性*/
								this.testCodeUrl = "http://172.18.12.21:10558/role/checkRoleCodeForUpdate"
								this.paramCode = {
									rid:this.currentNodeData.id,
									roleCode : this.roleData.roleGroupCode
								};
							}
							get(this.testCodeUrl,this.paramCode).then((response) =>{
								console.log('后台获取的数据',response);
								if(response.data.error === "0"){
									this.isRepeatCode = false;
									this.codeIsMust = false;
								}else{
									this.$message({
										message: response.data.error_description,
										type: 'error'
									});
									this.isRepeatCode = true;
								}

							}) .catch(function (response) {
								alert('请求失败')
							})
						}
					}
				}else{
					this.codeIsMust = true;
				}
			},
			/*角色组名称和角色名称唯一性*/
			testRoleName(){
				if(this.roleData.roleGroupName){
					if (this.isRole) {
						/*角色组名称唯一性*/
						if(this.isNewAdd === "0"){
							/*新增时角色组名唯一性*/
							this.testNameUrl = "http://172.18.12.21:10558/role/checkRoleGroupName";
							this.paramName = {
								roleGroupName  : this.roleData.roleGroupName
							};
						}else{
							/*修改时角色组名唯一性*/
							this.testNameUrl = "http://172.18.12.21:10558/role/checkRoleGroupNameForUpdate";
							this.paramName = {
								gid: this.currentNodeData.id,
								roleGroupName  : this.roleData.roleGroupName
							};
						}
						get(this.testNameUrl,this.paramName).then((response) =>{
							console.log('后台获取的数据',response);
							if(response.data.error === "0"){
								this.isRepeatGroupName = false;
								this.nameIsMust = false;
							}else{
								this.$message({
									message: response.data.error_description,
									type: 'error'
								});
								this.isRepeatGroupName = true;
							}

						}) .catch(function (response) {
							alert('请求失败')
						})
					} else if (!this.isRole) {
						/*角色名称唯一性*/

						if(this.isNewAdd === "0"){
							/*新增时角色名唯一性*/
							this.testNameUrl = "http://172.18.12.21:10558/role/checkRoleName";
							this.paramName = {
								roleName  : this.roleData.roleGroupName
							};
						}else{
							/*修改时角色名唯一性*/
							this.testNameUrl = "http://172.18.12.21:10558/role/checkRoleNameForUpdate";
							this.paramName = {
								roleName  : this.roleData.roleGroupName,
								rid: this.currentNodeData.id
							};
						}
						get(this.testNameUrl,this.paramName).then((response) =>{
							console.log('后台获取的数据',response);
							if(response.data.error === "0"){
								this.isRepeatName = false;
								this.nameIsMust = false;
							}else{
								this.$message({
									message: response.data.error_description,
									type: 'error'
								});
								this.isRepeatName = true;
							}

						}) .catch(function (response) {
							alert('请求失败')
						})
					}
				}else{
					this.nameIsMust = true;
				}
			},
			/*角色新增*/
			roleAdd(node,data){
				this.readDetail = true;
				this.rightDisabled = false;
				this.isShowCreateTime = false;
				this.roleGroupUpNameIsDisabled = true;
				this.roleData.roleGroupCode = '';
				this.roleData.roleGroupDes = '';
				this.roleData.roleGroupName = '';
				this.roleData.belongToRoleGroup = data.roleGroupName;
				console.log('00000',node,data);
				this.isRole = false;
				this.isRoleGroup ='1';
				this.isNewAdd = '0';
			},
			/*角色修改*/
			roleModify(node,data){
				this.readDetail = true;
				this.rightDisabled = false;
				this.isRoleGroup ='1';
				this.isNewAdd = '1';
				this.isShowCreateTime = false;
			},
			/*角色删除*/
			roleDelete(node,data) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						rid: data.id,
					};
					console.log('删除时参数',params);
					post("http://172.18.12.21:10558/role/delRole",params).then((response) =>{
						console.log('后台获取的数据',response);
						const parent = node.parent;
						const children = parent.data.children || parent.data;
						const index = children.findIndex(d => d.id === data.id);
						children.splice(index, 1);
						this.disabledButton3 = true;
						this.isNotAbledStatus = true;
						this.getInitTree(this.treeUrl);//保存成功时刷新树形结构
						this.roleData.roleGroupCode = '';
						this.roleData.roleGroupDes = '';
						this.roleData.roleGroupName = '';
						this.roleData.upRoleGroup = '';
						this.roleData.createTime = '';
						this.isShowCreateTime = false;
					}) .catch(function (response) {
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			/*保存-*/
			saveEdit(node,data){
				this.roleAddButton = true;
				this.mustCode();
				this.mustName();
				/*this.mustDes();*/
				this.testRoleCode();
				this.testRoleName();
				console.log(this.isRepeatGroupCode);
				console.log(this.isRepeatGroupName);
				console.log(this.isRepeatCode);
				console.log(this.isRepeatName);
				/*要判断是角色组保存还是角色保存   要判断是新增保存还是修改保存*/
				if (this.isRoleGroup === '0' && this.isNewAdd === '0') {
					/*角色组新增保存*/
					this.saveUrl = "http://172.18.12.21:10558/role/addRoleGroup";
					let params = {
						pid: data.id,
						roleGroupCode : trimString(this.roleData.roleGroupCode),
						roleGroupDesc: trimString(this.roleData.roleGroupDes),
						roleGroupName: trimString(this.roleData.roleGroupName),
						roleGroupDescUp: this.currentNodeData.roleGroupDesc,
						roleGroupCodeUp: this.currentNodeData.roleGroupCode,
						roleGroupNameUp: this.currentNodeData.roleGroupName
					};
					console.log('保存时参数',params);
					if(!this.codeIsMust&&!this.nameIsMust&&!this.isCodeNumber){
						if(!this.isRepeatGroupCode&&!this.isRepeatGroupName){
							this.newAddPost(node,data,params);
						}else{
							this.rightDisabled = false;
							this.$message({
								message: '角色编码或名称重复',
								type: 'warning'
							});
						}
					}else{
						this.$message({
							message: '请正确填写必填项',
							type: 'warning'
						});
					}
				} else if (this.isRoleGroup === '0' && this.isNewAdd === '1') {
					/*角色组修改保存*/
					this.saveUrl = "http://172.18.12.21:10558/role/updateRoleGroup";
					let params = {
						id : data.id,
						roleGroupName  : trimString(this.roleData.roleGroupName),
						roleGroupCode : trimString(this.roleData.roleGroupCode),
						roleGroupDesc  : trimString(this.roleData.roleGroupDes),
					};
					console.log('保存时参数',params);
					if(!this.codeIsMust&&!this.nameIsMust&&!this.isCodeNumber){
						if(!this.isRepeatGroupCode&&!this.isRepeatGroupName){
							this.modifyPost(node,data,params);
						}else{
							this.rightDisabled = false;
							this.$message({
								message: '角色编码或名称重复',
								type: 'warning'
							});
						}
					}else{
						this.$message({
							message: '请正确填写必填项',
							type: 'warning'
						});
					}
				} else if (this.isRoleGroup === '1' && this.isNewAdd === '0') {
					/*角色新增保存*/
					this.saveUrl = "http://172.18.12.21:10558/role/addRole";
					let params = {
						roleCode : trimString(this.roleData.roleGroupCode),
						gid : data.id,
						roleDesc : trimString(this.roleData.roleGroupDes),
						roleName : trimString(this.roleData.roleGroupName),
					};
					console.log('保存时参数',params);
					if(!this.codeIsMust&&!this.nameIsMust&&!this.isCodeNumber){
						if(!this.isRepeatCode&&!this.isRepeatName){
							this.newAddPost(node,data,params);
						}else{
							this.rightDisabled = false;
							this.$message({
								message: '角色编码或名称重复',
								type: 'warning'
							});
						}
					}else{
						this.$message({
							message: '请正确填写必填项',
							type: 'warning'
						});
					}
				} else if (this.isRoleGroup === '1' && this.isNewAdd === '1') {
					/*角色修改保存*/
					this.saveUrl = "http://172.18.12.21:10558/role/updateRole";
					let params = {
						rid : data.id,
						roleCode: trimString(this.roleData.roleGroupCode),
						roleName : trimString(this.roleData.roleGroupName),
						roleDesc : trimString(this.roleData.roleGroupDes),
					};
					console.log('保存时参数',params);
					if(!this.codeIsMust&&!this.nameIsMust&&!this.isCodeNumber){
						if(!this.isRepeatCode&&!this.isRepeatName){
							this.modifyPost(node,data,params);
						}else{
							this.rightDisabled = false;
							this.$message({
								message: '角色编码或名称重复',
								type: 'warning'
							});
						}
					}else{
						this.$message({
							message: '请正确填写必填项',
							type: 'warning'
						});
					}

				}
			},
			/*角色和角色组新增发请求*/
			newAddPost(node,data,params){
				post(this.saveUrl,params).then((response) =>{
					console.log('后台获取的数据',response);
					const newChild = { id: data.id, label: this.roleData.roleGroupName, children: [] };
					if (!data.children) {
						this.$set(data, 'children', []);
					}
					data.children.push(newChild);
					this.$message({
						message: '操作成功',
						type: 'success'
					});
					console.log('保存后的数据',data);
					this.getInitTree(this.treeUrl);//保存成功时刷新树形结构
					this.rightDisabled = true;
				}).catch(function (response) {

				})
			},
			/*角色和角色组修改发请求*/
			modifyPost(node,data,params){
				post(this.saveUrl,params).then((response) =>{
					console.log('后台获取的数据',response);
					if(response.data.error === "0"){
						this.getInitTree(this.treeUrl);//保存成功时刷新树形结构
						this.rightDisabled = true;//保存成功时让右侧禁止点击
						this.$message({
							message: response.data.error_description,
							type: 'success'
						});
					}else{
						this.$message({
							message: response.data.error_description,
							type: 'error'
						});
					}
				}) .catch(function (response) {

				})
			},
			/*设置权限弹框显示*/
			roleAuthority(roleDetail){
				this.authorityDialogShow = true;
				/*发请求获取默认权限*/
				let params = {
					rid : this.currentNodeData.id.toString()
				};
				console.log('保存时参数',params);

				post("http://172.18.12.21:10558/role/menu/initTree",params).then((response) =>{
					console.log('后台获取的数据',response);
					if(response.data.error === "0"){
						this.authorityDataArr = response.data.data.menus;
						/*设置默认选中项*/
						this.defaultCheckedKeys=[];
						this.defaultExpandKey=[];
						this.chooseItem(this.authorityDataArr);
						 console.log('所有的默认选项',this.defaultCheckedKeys);
						console.log('所有的默认选项pid',this.defaultExpandKey);
						//需要获取到默认选中的id
						this.setCheckedKeys(this.defaultCheckedKeys);
					}
				}).catch(function (response) {

				})
			},
			//递归获取默认的勾选项
			chooseItem(data){
				for (let item of data) {
					// console.log('item',item);
					if (item.flag === "1") {
						this.defaultCheckedKeys.push(item.id);
						this.defaultExpandKey.push(item.pid);
					}
					if (
						item.children !== null &&
						item.children !== undefined &&
						item.children.length!==0
					) {
						this.chooseItem(item.children);
					}

				}
			},
			handleChecked(node) {
				console.log('勾选node',node);
			},
			/*设置权限确认按钮*/
			authoritySure(){
				let checked = this.$refs.authorityTree.getCheckedNodes();
				console.log('checked节点',checked);
				let checkedIdArr = [];
				for(let i=0;i<checked.length;i++){
					checkedIdArr.push(checked[i].id);
				}
				console.log(checkedIdArr);
				/*发请求*/
				let params = {
					rid:''+this.currentNodeData.id,
					mids:checkedIdArr
				};
				console.log(checkedIdArr);
				post("http://172.18.12.21:10558/role/menu/setMenu",params).then((response) =>{
					console.log('后台获取的数据',response);
					if(response.data.error === "0"){
						this.authorityDialogShow = false;
						this.$message({
							message: '权限设置成功',
							type: 'success'
						});
					}else{
						this.$message({
							message: response.data.error_description,
							type: 'warning'
						});
					}

				}).catch(function (response) {

				})
			},

			/*重置*/
			cancelButton(){
				this.isCodeNumber = false;
				/*判断是新增的重置还是修改的重置*/
				if(this.isNewAdd === "0"){
					/*新增的重置*/
					this.roleData.upRoleGroup = this.currentNodeData.roleGroupName;
					this.roleData.roleGroupName = '';
					this.roleData.roleGroupCode = '';
					this.roleData.roleGroupDes = '';
				}else if(this.isNewAdd === "1"){
					/*角色组修改的重置*/
					if(this.isRoleGroup === "0"){
						this.roleData.roleGroupName = this.currentNodeData.roleGroupName;
						this.roleData.roleGroupCode = this.currentNodeData.roleGroupCode;
						this.roleData.roleGroupDes = this.currentNodeData.roleGroupDesc;
					}else if(this.isRoleGroup === "1"){
						/*角色修改的重置*/
						this.roleData.roleGroupName = this.currentNodeData.roleName;
						this.roleData.roleGroupCode = this.currentNodeData.roleCode;
						this.roleData.roleGroupDes = this.currentNodeData.roleDesc;
					}
				}
			},
			/*关闭设置权限弹框*/
			closeAuthority(){
				this.$confirm('此操作将关闭该窗口, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.authorityDialogShow = false;
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消关闭'
					});
				});
			},
			/*选择权限*/
			getCheckedKeys() {
				console.log(this.$refs.tree.getCheckedKeys());
			},

			/*取消设置权限按钮*/
			authorityCancle(){
				this.$refs.authorityTree.setCheckedKeys(this.defaultCheckedKeys);
			},
			sealUpEvent(){
				if(this.checked){
					this.treeUrl = "http://172.18.12.21:10558/role/initTree";
				}else{
					this.treeUrl = "http://172.18.12.21:10558/role/initTreeNoFrozen";
				}
				this.getInitTree(this.treeUrl);
			},
			/*正则校验编码是数字形式*/
			testCodeNumber(){
				//var reg = /[\\u4E00-\\u9FFF]+/;
				var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
				if (reg.test(this.roleData.roleGroupCode)) {
					this.isCodeNumber = true;//含有中文
					return false;
				}else{
					this.isCodeNumber = false;
				}
			},
			/*封存*/
			roleSave(node,data){
				let params = {
					rid: this.currentNodeData.id
				};
				console.log('保存时参数',params);

				post("http://172.18.12.21:10558/role/frozenRole",params).then((response) =>{
					console.log('后台获取的数据',response);
					if(response.data.error === "0"){
						this.$message({
							type: 'success',
							message: response.data.error_description
						});
						this.getInitTree(this.treeUrl);
					}else{
						this.$message({
							type: 'error',
							message: response.data.error_description
						});
					}

				}).catch(function (response) {

				})
			},
			/*启用*/
			roleStart(node,data){
				let params = {
					rid: this.currentNodeData.id
				};
				console.log('保存时参数',params);

				post("http://172.18.12.21:10558/role/thawRole",params).then((response) =>{
					console.log('后台获取的数据',response);
					if(response.data.error === "0"){
						this.$message({
							type: 'success',
							message: response.data.error_description
						});
						this.getInitTree(this.treeUrl);
					}else{
						this.$message({
							type: 'error',
							message: response.data.error_description
						});
					}
				}).catch(function (response) {

				})
			},
			/*编码必填校验*/
			mustCode(){
				if(this.roleData.roleGroupCode){
					this.codeIsMust = false;
				}else{
					this.codeIsMust = true;
				}
			},
			/*名称必填校验*/
			mustName(){
				if(this.roleData.roleGroupName){
					this.nameIsMust = false;
				}else{
					this.nameIsMust = true;
				}
			},
			/*描述必填校验*/
			/*mustDes(){
				if(this.roleData.roleGroupDes){
					this.desIsMust = false;
				}else{
					this.desIsMust = true;
				}
			}*/
		},
	}
</script>

