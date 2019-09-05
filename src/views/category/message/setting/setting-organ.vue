<template>
	<div class="h100p setting-organ pos-relative">
		<div class="h100p pos-relative">
			<div class="bg-color-white fl w300 h100p pd-tb10 pd-lr10 pos-abs t0 l0 account-list">
				<div class="w100p pd-tb10 pd-lr10 pos-abs pos-c-t">
					<el-input
						placeholder="输入关键字进行过滤"
						size="small"
						clearable
						v-model="filterText">
					</el-input>
				</div>
				<div class="w100p h100p pd-t40 pd-b60">
					<div class="w100p h100p scroll-wrap setting-account-manage-left-box">
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
					<input type="checkbox" class="mg-t20" v-model="checked" @change="getCheckedBox">显示已封存机构 / 部门
				</div>
			</div>
			<div class="pd-l320 organ-right h100p pd-t0 pd-b60">
				<div class="organ-button clear">
					<el-button class="common-button-medium mg-l20" @click="settingOrganAdd" :disabled="addBtnDisabled">新增</el-button>
					<el-button class="common-button-medium mg-l20" @click="settingOrganEdit" :disabled="btnDisabled" >修改</el-button>
					<el-button class="common-button-medium mg-l20" @click="settingOrganDelete" :disabled="btnDisabled" >删除</el-button>
					<el-button class="common-button-medium mg-l20"  @click="settingOrganSafeKeep" :disabled="btnDisabledSafeKeep">封存</el-button>
					<el-button class="common-button-medium mg-l20" @click="settingOrganStartUse" :disabled="btnDisabledStartUse">启用</el-button>
				</div>
				<div class="manage-right-content h100p mg-t30">
					<new-tabs  @changeTab="changeTab" :tableButtons="tableButtons" :currentTab="currentTab" :tabsBox="tabsBoxClassName">
						<template slot="header">
							<div v-show="slot1">
								<!--组织机构代码-->
								<div class="clear pd-b10 pd-t10 pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right">组织机构代码</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												size="small"
												v-model="settingOrganBasicForm.orgCode"
												:disabled="inputDisabled"
												:clearable="clearable"
												:maxlength="50"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--机构名称-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>机构名称</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputDisabled"
												size="small"
												v-model="settingOrganBasicForm.orgName"
												:maxlength="50"
												:clearable="clearable"
												@blur="changeNameTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWordsOrgName" ref="settingFormTest" style="left: 35px;"></testWords>
										</div>
									</div>
								</div>
								<!--机构类型-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10">
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>机构类型</div>
										<div class="h30 pd-l120 pos-relative">
											<el-select v-model="settingOrganBasicForm.orgType" placeholder="请选择" size="small" :disabled="inputDisabled">
												<el-option
													class="w100p"
													v-for="(item,index) in optionsOrType"
													:key="item.value"
													:label="item.label"
													ref="settingForm"
													:value="item.value">
												</el-option>
											</el-select>
											<testWords :testWords="testWordsOrgType" ref="settingFormTest" style="left: 35px;"></testWords>
										</div>
									</div>
								</div>
								<!--上级机构编码-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>上级机构编码</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputOrgUpDisabled"
												size="small"
												v-model="settingOrganBasicForm.orgIdUp"
												:clearable="clearable"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--上级机构名称-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>上级机构名称</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputOrgUpDisabled"
												size="small"
												v-model="settingOrganBasicForm.orgNameUp"
												:clearable="clearable"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--付费方式-->
								<div class="clear pd-b10 pd-lr40">
									<div class="fl w100p  form-field-box mg-b10">
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>付费方式</div>
										<div class="h30 pd-l120 pos-relative">
											<el-select v-model="settingOrganBasicForm.payMethod" placeholder="请选择" size="small" :disabled="inputDisabled">
												<el-option
													class="w100p"
													v-for="(item,index) in optionsPayWay"
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
								<!--机构码号-->
								<div class="clear pd-b10  pd-lr40" v-if="isShowCreateTime">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>机构码号</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												size="small"
												:disabled="inputDisabled"
												v-model="settingOrganBasicForm.orgCodeNum"
												:maxlength="50"
												:clearable="clearable"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										</div>
									</div>
								</div>
								<!--机构签名-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right">机构签名</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												size="small"
												:disabled="inputDisabled"
												v-model="settingOrganBasicForm.orgSignature"
												:maxlength="50"
												:clearable="clearable"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										</div>
									</div>
								</div>
								<!--创建时间-->
								<div class="clear pd-b10  pd-lr40" v-if="isShowCreateTime">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right">创建时间</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												size="small"
												:disabled="inputDisabled"
												v-model="settingOrganBasicForm.createTime"
												:maxlength="50"
												:clearable="clearable"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										</div>
									</div>
								</div>
								<!--创建人-->
								<div class="clear pd-b10  pd-lr40" v-if="isShowCreatePerson">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right">创建人</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												size="small"
												:disabled="inputDisabled"
												v-model="settingOrganBasicForm.orgSignature"
												:maxlength="50"
												:clearable="clearable"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										</div>
									</div>
								</div>
								<div class="m-auto w200">
									<el-button class="common-button" @click="settingOrganSave" :disabled="btnDisabled" v-if="checkShow">保存</el-button>
									<el-button class="common-button" @click="resetForm()" :disabled="btnDisabled" v-if="checkShow">重置</el-button>
								</div>
							
							</div>
						</template>
						<template slot="footer">
							<div v-show="slot2">
								<!--开票类型-->
								<div class="clear pd-b10 pd-t10 pd-lr40">
									<div class="fl w100p  form-field-box mg-b10">
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>开票类型</div>
										<div class="h30 pd-l120 pos-relative">
											<el-select v-model="settingOrganBillingForm.billingType" @change="changeBillingType" placeholder="请选择" size="small" :disabled="inputDisabled">
												<el-option
													class="w100p"
													v-for="(item,index) in optionsInvoiceType"
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
								<!--开票名称-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>开票名称</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputDisabledBillingName"
												size="small"
												v-model="settingOrganBillingForm.billingName"
												:clearable="clearable"
												@blur="changeTo()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--纳税人识别号-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>纳税人识别号</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputDisabled"
												size="small"
												v-model="settingOrganBillingForm.taxpayerId"
												:maxlength="50"
												:clearable="clearable"
												@blur="changeToTaxpayerId()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testTaxpayerId" ref="settingFormTest" style="left: 35px;" ></testWords>
										
										</div>
									</div>
								</div>
								<!--地址-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="dependBillingType">*</span>地址</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputDisabled"
												size="small"
												v-model="settingOrganBillingForm.address"
												:maxlength="200"
												:clearable="clearable"
												@blur="changeToAddress()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWordsAddress" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--电话-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="dependBillingType">*</span>电话</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputDisabled"
												size="small"
												v-model="settingOrganBillingForm.telphone"
												:maxlength="20"
												:clearable="clearable"
												@blur="changeToTelphone()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testWordsTelphone" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--开户行-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="dependBillingType">*</span>开户行</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputDisabled"
												size="small"
												v-model="settingOrganBillingForm.openingBank"
												:maxlength="200"
												:clearable="clearable"
												@blur="changeToOpeningBank()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testOpeningBank" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--银行账号-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="dependBillingType">*</span>银行账号</div>
										<div class="h30 pd-l120 pos-relative">
											<el-input
												class="w100p"
												size="small"
												v-model="settingOrganBillingForm.bankAccount"
												:disabled="inputDisabled"
												:maxlength="50"
												:clearable="clearable"
												@blur="changeToBankAccount()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testBankAccount" ref="settingFormTest" style="left: 35px;"></testWords>
										</div>
									</div>
								</div>
								<!--创建时间-->
								<!--<div class="clear pd-b10 pd-lr40">-->
								<!--<div class="fl w100p  form-field-box mg-b10" >-->
								<!--<div class="fl w100 h30 lh30 text-right"><span class="required">*</span>创建时间</div>-->
								<!--<div class="h30 pd-l120 pos-relative">-->
								<!--<el-input-->
								<!--class="w100p"-->
								<!--size="small"-->
								<!--:disabled="inputDisabled"-->
								<!--v-model="dictTo"-->
								<!--:clearable="clearable"-->
								<!--@blur="changeTo()"-->
								<!--placeholder="请输入"></el-input>-->
								<!--<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>-->
								<!--</div>-->
								<!--</div>-->
								<!--</div>-->
								<div class="m-auto w200">
									<el-button class="common-button" @click="settingOrganSave" :disabled="btnDisabled" v-if="checkShow">保存</el-button>
									<el-button class="common-button" @click="resetForm()" :disabled="btnDisabled" v-if="checkShow">重置</el-button>
								</div>
							</div>
						</template>
						<template slot="footer">
							<div v-show="slot3">
								<!--账单接收邮箱  发送-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w160 h30 lh30 text-right"><span class="required">*</span>账单接收邮箱--发送</div>
										<div class="h30 pd-l180 pos-relative">
											<el-input
												class="w100p"
												:disabled="inputDisabled"
												size="small"
												v-model="ummpMailAddrForm.sendingAddress"
												:maxlength="200"
												:clearable="clearable"
												@blur="changeToSendingAddress()"
												placeholder="请输入"></el-input>
											<testWords :testWords="testSendingAddress" ref="settingFormTest" style="left: 35px;"></testWords>
										
										</div>
									</div>
								</div>
								<!--账单接收邮箱--抄送-->
								<div class="clear pd-b10  pd-lr40">
									<div class="fl w100p  form-field-box mg-b10" >
										<div class="fl w160 h30 lh30 text-right">账单接收邮箱--抄送</div>
										<div class="h30 pd-l180 pos-relative">
											<el-input
												class="w100p"
												size="small"
												v-model="ummpMailAddrForm.copyAddress"
												:disabled="inputDisabled"
												:maxlength="50"
												:clearable="clearable"
												placeholder="请输入"></el-input>
											<!--<testWords :testWords="testCopyAddress" ref="settingFormTest" style="left: 35px;"></testWords>-->
										</div>
									</div>
								</div>
								<div class="m-auto w200">
									<el-button class="common-button" @click="settingOrganSave" :disabled="btnDisabled" v-if="checkShow">保存</el-button>
									<el-button class="common-button" @click="resetForm()" :disabled="btnDisabled" v-if="checkShow">重置</el-button>
								</div>
							</div>
						</template>
					
					</new-tabs>
				</div>
			</div>
		</div>
	
	
	
	</div>
</template>

<script>
	import { get, post } from './../../../../util/http'
	import newTabs from './../../../../components/navigation/tabs/newTabs'
	import testWords from './../../../../components/packages/marked-words/test-words'
	export default {
		name: "setting-organ",
		components:{
			newTabs,
			testWords
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		computed:{
		
		
		},
		data() {
			return {
				data2:[],
				// 按钮是否可点击
				btnDisabled:true,
				// 新增按钮是否可点击
				addBtnDisabled:true,
				// 封存是否可点击
				btnDisabledSafeKeep:true,
				// 启用是否可点击
				btnDisabledStartUse:true,
				// 普通文本框是否可点击
				inputDisabled:true,
				// 开票名称是否可点击
				inputDisabledBillingName:true,
				// 上级机构编码与上级机构名称是否可点击
				inputOrgUpDisabled:true,
				// 显示已封存项目
				checked:false,
				// 是否显示保存重置按钮
				checkShow:false,
				// 是否显示创建时间
				isShowCreateTime:true,
				// 是否显示创建人
				isShowCreatePerson:true,
				// 必填
				tableButtons:[
					{id:1,name:"基本信息"},
					{id:2,name:"开票信息"},
					{id:3,name:"开票账单接收邮箱地址"},
				],
				// 下拉菜单
				value:"",
				// 机构类型下拉菜单
				optionsOrType:[
					{
						value: '0',
						label: '公司'
					}, {
						value: '1',
						label: '部门'
					}
				],
				optionsPayWay:[
					{
						value: '0',
						label: '预付费'
					}, {
						value: '1',
						label: '后付费'
					}
				],
				optionsInvoiceType:[
					{
						value: '0',
						label: '专票'
					}, {
						value: '1',
						label: '普票'
					}
				],
				// 依赖于开票信息的选择情况
				dependBillingType:false,
				// 新增修改框字段
				// 基本信息
				settingOrganBasicForm:{
					orgId:"",       //机构编码
					orgCode:"",     //组织机构代码
					orgName:"",      //机构名称
					orgType:"",      //机构类型
					orgIdUp:"",      //上级机构编码
					orgNameUp:"",      //上级机构名称
					payMethod:"",      //付费方式
					orgCodeNum:"",      //机构码号
					orgSignature:"",   //机构签名
					createTime:"",     //创建人
					createUser:""
				},
				
				// 开票信息
				settingOrganBillingForm:{
					orgPriId:"",      //机构主键ID
					billingType:"",      //开票类型
					billingName:"",      //开票名称
					taxpayerId:"",      //纳税人识别码
					address:"",      //地址
					telphone:"",      //电话
					openingBank:"",      //开户行
					bankAccount:"",      //银行账号
				},
				// 邮箱接收
				ummpMailAddrForm:{
					sendingAddress:"",   //发送邮箱
					copyAddress:""       //抄送邮箱
				},
				// 基本信息
				ummpOrganization:{},
				ummpBilling:{},
				// 校验字段
				testWordsOrgName:"",   //机构名称
				testWordsOrgType:"",  //机构类型
				// input框校验提示信息
				testTaxpayerId:"",   //纳税人识别号
				testOpeningBank:"",   //开户行
				testBankAccount:"",    //银行账号
				testWordsTelphone:"",   //电话
				testWordsAddress:"",    //地址
				testSendingAddress:"",  //发送邮箱
				testCopyAddress:"",  //抄送邮箱
				
				
				// 是否是新增时
				settingOrgAddNum:null,
				// 是否为修改时
				settingOrgEditNum:null,
				settingOrgRequestUrl:null,
				clearable:true,
				value1:"",
				valueTo:"",
				testWords:"",
				todo:{"text":"123","name":"lln"},
				filterText: '',
				currentContent: '',
				slot1:true,
				slot2:false,
				slot3:false,
				// 选项卡数据
				tabsBoxClassName: 'tabs-box',
				currentTab:1,
				// 树形控件部分数据
				orgWithData: [],
				// 树形控件全部数据
				orgWithAllData: [],
				defaultProps: {
					children: 'children',
					label: 'orgName'
				},
				
				searchAll:{},
				nodeId:"",             //点击树形控件的当前行id
				nodeData:[]            //点击树形控件的data数据
			};
		},
		created(){
			// 判断是否点击复选框
			this.getCheckedAllTo();
		},
		mounted() {
			let settingOrganScrollY = $('.settingOrganScrollY');
			settingOrganScrollY.mCustomScrollbar({
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
			getOrangizationData(){
				let data = {
					id:8,
					// loginToken:123
				};
				post("http://172.18.12.21:10558/org/initTree",data).then((response) =>{
					this.orgWithData = response.data.data.orgWithBills;
					this.data2=this.orgWithData;
					console.log(this.orgWithData,'多少')
					
				}, (response) => {
				}) .catch(function (response) {
				
				})
			},
			// 点击复选框
			getCheckedBox(){
				this.getCheckedAllTo();
			},
			getOrangizationAllData(){
				let data = {
					id:8,
					// loginToken:123
				};
				post("http://172.18.12.21:10558/org/initTreeAll",data).then((response) =>{
					this.orgWithAllData = response.data.data.orgWithBills;
					this.data2=this.orgWithAllData;
					// return false;
				}, (response) => {
				}) .catch(function (response) {
				
				})
			},
			filterNode(value, data){
				if (!value) return true;
				return data.orgName.indexOf(value) !== -1;
			},
			// 树形控件节点被点击
			handleNodeClick(data,node) {
				// 按钮可点击
				this.btnDisabled=false;
				// 封存按钮可点击
				this.btnDisabledSafeKeep=false;
				// 启用是否可点击
				this.btnDisabledStartUse=false;
				// 点击时的data数据
				this.nodeData=node.data;
				// 点击时的id
				this.nodeId=node.data.id;
				
				// 将选项卡回到基本信息处
				this.currentTab = 1;
				this.slot1=true;
				this.slot2=false;
				this.slot3=false;
				// 各种input框都是不可编辑的
				this.inputDisabled=true;
				console.log(this.nodeData,'-----------------')
				// es6对象的结构赋值
				let {orgId,orgCode,orgName,orgType,orgIdUp,orgNameUp,payMethod,orgCodeNum,orgSignature,createTime}=this.nodeData;
				
				this.ummpOrganization={
					orgId:orgId,
					orgCode:orgCode,
					orgName:orgName,
					orgType:orgType,
					orgIdUp:orgIdUp,
					orgNameUp:orgNameUp,
					payMethod:payMethod,
					orgCodeNum:orgCodeNum,
					orgSignature:orgSignature,
					createTime:createTime
				};
				
				// 点击时封存启用按钮显示情况
				if(this.nodeData.flag==="0"){
					// 未封存状态 ---启用不可点击,封存可点击
					this.btnDisabledSafeKeep=false;
					this.btnDisabledStartUse=true;
				}else{
					// 封存状态  ---启用可点击,封存不可点击
					this.btnDisabledSafeKeep=true;
					this.btnDisabledStartUse=false;
				}
				// 点击时出现基本信息的内容
				this.settingOrganBasicForm=this.ummpOrganization;
				console.log(this.ummpOrganization,'基本信息');
				// 新增按钮可是否可点击
				console.log(this.ummpOrganization.orgType,"机构类型")
				if(this.settingOrganBasicForm.orgType==="1"){
					// 如果是部门,则不能点击
					this.addBtnDisabled=true;
				}else{
					// 如果是公司,则能点击
					this.addBtnDisabled=false;
				}
				
			},
			
			// 校验组织机构名称
			changeNameTo(){
				if(this.settingOrganBasicForm.orgName){
					this.testWordsOrgName="";
				}else{
					this.testWordsOrgName="请输入机构名称";
				}
			},
			// 点击新增
			settingOrganAdd(){
				this.dictTo="";
				// 普通input框是否可点击
				this.inputDisabled=false;
				// 上级机构编码与上级机构名称不可点击
				this.inputOrgUpDisabled=true;
				// 是否显示保存重置按钮
				this.checkShow=true;
				
				// 将选项卡回到基本信息处
				this.currentTab = 1;
				// 创建时间是否显示
				this.isShowCreateTime=false;
				// 创建人是否显示
				this.isShowCreatePerson=false;
				this.slot1=true;
				this.slot2=false;
				this.slot3=false;
				// 新增时的标识
				this.settingOrgAddNum=1;
				// 修改的表述数据为null
				this.settingOrgEditNum=null;
				// 清空输入框数据
				this.resetForm();
				// 上级机构编码
				this.settingOrganBasicForm.orgIdUp=this.nodeData.orgId;
				
				console.log(this.settingOrganBasicForm.orgIdUp);
				// 上级机构名称
				this.settingOrganBasicForm.orgNameUp=this.nodeData.orgName;
				// 开票名称
				this.settingOrganBillingForm.billingName=this.nodeData.billingName;
				console.log(this.nodeData,"开票信息");
			},
			// 点击修改
			settingOrganEdit(){
				// 普通input框是否可点击
				this.inputDisabled=false;
				this.inputDisabledBillingName=true;
				// 上级机构编码与上级机构名称不可点击
				this.inputOrgUpDisabled=true;
				// 是否显示保存重置按钮
				this.checkShow=true;
				// 新增的标识数据为空
				this.settingOrgAddNum=null;
				// 修改的标识数据为1;
				this.settingOrgEditNum=1;
				// 将选项卡回到基本信息处
				this.currentTab = 1;
				// 创建时间是否显示
				this.isShowCreateTime=false;
				// 创建人是否显示
				this.isShowCreatePerson=false;
				this.slot1=true;
				this.slot2=false;
				this.slot3=false;
				// 清空输入框数据
				// this.resetForm();
				// // 上级机构编码清空
				this.settingOrganBasicForm.orgIdUp=this.nodeData.orgIdUp;
				// // 上级机构名称清空
				this.settingOrganBasicForm.orgNameUp=this.nodeData.orgNameUp;
				// 基本信息与开票信息赋值
				this.settingOrganBasicForm=this.ummpOrganization;
			},
			// 点击删除
			settingOrganDelete(){
				let data = {
					id:this.nodeId,
				};
				post("http://172.18.12.21:10558/org/delOrg",data).then((response) =>{
					if(response.data.error==="0"){
						this.$message({
							message:response.data.error_description,
							type: 'success'
						});
						this.resetForm();
						this.btnDisabled=true;
						this.btnDisabledSafeKeep=true;
						this.btnDisabledStartUse=true;
						this.getCheckedAllTo();
					}else{
						this.$message({
							message:response.data.error_description,
							type: 'error'
						});
					}
					
				}, (response) => {
				}) .catch(function (response) {
				
				})
			},
			// 重置
			resetForm(){
				if(this.settingOrgAddNum!==1&&this.settingOrgEditNum==1) {
					// 修改框内重置
					// 点击时出现基本信息的内容
					let {orgId,orgCode,orgName,orgType,orgIdUp,orgNameUp,payMethod,orgCodeNum,orgSignature,createTime,createUser}=this.nodeData;
					
					this.settingOrganBasicForm={
						orgId:orgId,
						orgCode:orgCode,
						orgName:orgName,
						orgType:orgType,
						orgIdUp:orgIdUp,
						orgNameUp:orgNameUp,
						payMethod:payMethod,
						orgCodeNum:orgCodeNum,
						orgSignature:orgSignature,
						createTime:createTime,         //创建时间
						createUser:createUser,          //创建人
					};
					this.getBillDate();
					this.getFindMailDate();
				}else{
					
					
					
					
					// alert(111)
					// 新增框
					// 清空输入框数据
					// 基本信息
					this.settingOrganBasicForm={
						orgId:"",       //机构编码
						orgCode:"",     //组织机构代码
						orgName:"",      //机构名称
						orgType:"",      //机构类型
						orgIdUp:"",      //上级机构编码
						orgNameUp:"",      //上级机构名称
						payMethod:"",      //付费方式
						orgCodeNum:"",       //机构码号
						orgSignature:"",      //机构签名
						createTime:"",         //创建时间
						createUser:"",          //创建人
						
					}
					this.settingOrganBillingForm={
						orgPriId:"",      //机构主键ID
						billingType:"",      //开票类型
						billingName:"",      //开票名称
						taxpayerId:"",      //纳税人识别码
						address:"",      //地址
						telphone:"",      //电话
						openingBank:"",      //开户行
						bankAccount:"",      //银行账号
					}
					this.ummpMailAddrForm={
						sendingAddress:"",   //发送邮箱
						copyAddress:""       //抄送邮箱
					}
					this.settingOrganBasicForm.orgIdUp=this.nodeData.orgId;
					console.log(this.settingOrganBasicForm.orgIdUp);
					// 上级机构名称
					this.settingOrganBasicForm.orgNameUp=this.nodeData.orgName;
					// 开票名称
					this.settingOrganBillingForm.billingName=this.nodeData.billingName;
					console.log(this.nodeData,"开票信息");
				}
				
			},
			// 判断是否点击已经封存复选框
			getCheckedAllTo(){
				if(this.checked){
					this.getOrangizationAllData();
				}else{
					this.getOrangizationData();
				}
			},
			// 切换选项卡
			changeTab(item, tab) {
				
				// 如果不是新增也不是修改
				if(!this.nodeId&&this.settingOrgAddNum!==1&&this.settingOrgEditNum!==1) {
					// 如果没点节点
					if(item.id===1){
						this.slot1=true;
						this.slot2=false;
						this.slot3=false;
						this.currentTab = item.id;
						// this.currentTab = item.id;
					}else if(item.id===2){
						this.slot1=false;
						this.slot2=true;
						this.slot3=false;
						this.currentTab = item.id;
						
					}else{
						this.slot1=false;
						this.slot2=false;
						this.slot3=true;
						this.currentTab = item.id;
					}
				}else if(this.nodeId&&this.settingOrgAddNum!==1&&this.settingOrgEditNum!==1){
					// 如果点击了节点但是没有点击新增和修改按钮
					if(item.id===1){
						this.slot1=true;
						this.slot2=false;
						this.slot3=false;
						this.currentTab = item.id;
						this.getBillDate();
						this.getFindMailDate();
						// this.currentTab = item.id;
					}else if(item.id===2){
						this.slot1=false;
						this.slot2=true;
						this.slot3=false;
						this.currentTab = item.id;
						this.getBillDate();
						this.getFindMailDate();
					}else{
						this.slot1=false;
						this.slot2=false;
						this.slot3=true;
						this.currentTab = item.id;
						this.getBillDate();
						this.getFindMailDate();
					}
					
				}else if(this.settingOrgAddNum!==1&&this.settingOrgEditNum==1){
					// 如果是修改
					if(this.settingOrganBasicForm.orgType==="1"){
						// 如果机构类型是部门,则不能
						// 如果点击的是部门
						this.slot1=true;
						this.slot2=false;
						this.slot3=false;
						this.currentTab = 1;
					}else {
						if (item.id === 1) {
							this.slot1 = true;
							this.slot2 = false;
							this.slot3 = false;
							this.currentTab = item.id;
							// 掉接口获得开票信息数据
							// this.$nextTick(function(){
							this.getBillDate();
							this.getFindMailDate();
							// })
							
						} else if (item.id === 2) {
							this.slot1 = false;
							this.slot2 = true;
							this.slot3 = false;
							this.currentTab = item.id;
							// 掉接口获得开票信息数据
							// this.$nextTick(function(){
							this.getBillDate();
							this.getFindMailDate();
							// })
						} else {
							this.slot1 = false;
							this.slot2 = false;
							this.slot3 = true;
							this.currentTab = item.id;
							// 掉接口获得开票信息数据
							// this.$nextTick(function(){
							this.getBillDate();
							this.getFindMailDate();
							// })
						}
					}
					
				}else{
					this.settingOrganBillingForm.billingName=this.nodeData.orgName;
					// 新增
					if(this.settingOrganBasicForm.orgType==="1"){
						// 如果机构类型是部门,则不能
						// 如果点击的是部门
						this.slot1=true;
						this.slot2=false;
						this.slot3=false;
						this.currentTab = 1;
						
					}else{
						if(item.id===1){
							this.slot1=true;
							this.slot2=false;
							this.slot3=false;
							this.currentTab = item.id;
							// this.resetForm();
						}else if(item.id===2){
							this.slot1=false;
							this.slot2=true;
							this.slot3=false;
							this.currentTab = item.id;
							// this.resetForm();
						}else{
							this.slot1=false;
							this.slot2=false;
							this.slot3=true;
							this.currentTab = item.id;
							// this.resetForm();
						}
					}
					
					
					
				}
			},
			
			// 调用开票信息的接口
			getBillDate(){
				let data = {
					orgId: this.nodeId,
				};
				get("http://172.18.12.21:10558/org/findBilling", data).then((response) => {
					console.log(response.data,"返回")
					if (response.data.error === "0") {
						let billData = response.data.data.UmmpBilling;
						console.log(billData,"请求到的")
						let {billingType, taxpayerId, address, telphone, openingBank, bankAccount} = billData;
						this.ummpBilling = {
							billingType: billingType,
							
							taxpayerId: taxpayerId,
							address: address,
							telphone: telphone,
							openingBank: openingBank,
							bankAccount: bankAccount
						}
						this.settingOrganBillingForm = this.ummpBilling;
						this.settingOrganBillingForm.billingName=this.nodeData.orgName;
						console.log(this.settingOrganBillingForm,"转换后的");
					} else {
						this.$message({
							message: response.data.error_description,
							type: 'error'
						});
					}
					
				}, (response) => {
				}).catch(function (response) {
				
				})
			},
			
			// 调用接收邮箱地址接口
			getFindMailDate(){
				let data = {
					orgId: this.nodeId,
				};
				get("http://172.18.12.21:10558/org/findMail", data).then((response) => {
					console.log(response.data,"返回")
					if (response.data.error === "0") {
						let MailAddrData = response.data.data.UmmpMailAddr;
						console.log(MailAddrData,"请求到的")
						let {copyAddress, sendingAddress} = MailAddrData;
						this.ummpMailAddrForm = {
							copyAddress: copyAddress,
							sendingAddress:sendingAddress,
						}
						
						console.log(this.ummpMailAddrForm,"转换后的")
					} else {
						this.$message({
							message: response.data.error_description,
							type: 'error'
						});
					}
					
				}, (response) => {
				}).catch(function (response) {
				
				})
			},
			// 校验--地址
			changeToAddress(){
				if(this.settingOrganBillingForm.billingType==="0"){
					if(!this.settingOrganBillingForm.address){
						this.testWordsAddress="地址不能为空"
					}
				}
			},
			// 校验--电话
			changeToTelphone(){
				if(this.settingOrganBillingForm.billingType==="0"){
					if(!this.settingOrganBillingForm.telphone){
						this.testWordsTelphone="电话不能为空"
					}else{
						var myreg=/^[1-9]\d*$/g;
						if(!myreg.test(this.settingOrganBillingForm.telphone)){
							this.settingOrganBillingForm.telphone="";
							this.testWordsTelphone="电话不能为汉字";
						}else{
							this.testWordsTelphone="";
						}
					}
				}else{
					var myreg=/^[1-9]\d*$/g;
					if(!myreg.test(this.settingOrganBillingForm.telphone)){
						this.settingOrganBillingForm.telphone="";
						this.testWordsTelphone="电话不能为汉字";
					}else{
						this.testWordsTelphone="";
					}
				}
				
			},
			// 校验开票类型
			changeBillingType(){
				if(this.settingOrganBillingForm.billingType==="0"){
					// 专票       开票名称、纳税人识别码、地址、电话、开户行、银行账号为必填
					this.dependBillingType=true;
				}else{
					// 普票    开票名称、纳税人识别码
					this.dependBillingType=false;
					this.testOpeningBank="";           //开户行
					this.testWordsAddress="";           //地址
					this.testWordsTelphone="";          //电话
					this.testBankAccount="";           //银行账号
				}
			},
			// 校验--纳税人识别码
			changeToTaxpayerId(){
				if(!this.settingOrganBillingForm.taxpayerId){
					this.testTaxpayerId="纳税人识别码不能为空"
				}else{
					var myreg=/^[1-9]\d*$/g;
					if(!myreg.test(this.settingOrganBillingForm.taxpayerId)){
						this.settingOrganBillingForm.taxpayerId="";
						this.testTaxpayerId="纳税人识别码不能为汉字";
					}else{
						this.testTaxpayerId="";
					}
				}
			},
			// 校验--开户行
			changeToOpeningBank(){
				if(this.settingOrganBillingForm.billingType==="0"){
					if(!this.settingOrganBillingForm.openingBank){
						this.testOpeningBank="开户行不能为空"
					}
				}
				
			},
			// 校验--银行账号
			changeToBankAccount(){
				if(this.settingOrganBillingForm.billingType==="0"){
					if(!this.settingOrganBillingForm.bankAccount){
						this.testBankAccount="银行账号不能为空";
						
					}else{
						var myreg=/^[1-9]\d*$/g;
						if(!myreg.test(this.settingOrganBillingForm.bankAccount)){
							this.settingOrganBillingForm.bankAccount="";
							this.testBankAccount="银行账号不能为汉字";
						}else{
							this.testBankAccount="";
						}
					}
				}else{
					var myreg=/^[1-9]\d*$/g;
					if(!myreg.test(this.settingOrganBillingForm.bankAccount)){
						this.settingOrganBillingForm.bankAccount="";
						this.testBankAccount="银行账号不能为汉字";
					}else{
						this.testBankAccount="";
					}
				}
				
			},
			// 校验发送邮箱
			changeToSendingAddress(){
				if(!this.ummpMailAddrForm.sendingAddress){
					this.testSendingAddress="账单接收邮箱--发送不能为空"
				}
			},
			
			changeTo(index,item){
			
			},
			// 启用
			settingOrganStartUse(){
				let data = {
					id:this.nodeId,
				};
				post("http://172.18.12.21:10558/org/thawOrg",data).then((response) =>{
					if(response.data.error==="0"){
						this.$message({
							message:response.data.error_description,
							type: 'success'
						});
						// 封存按钮可点击
						this.btnDisabledSafeKeep=false;
						// 启用可点击
						this.btnDisabledStartUse=true;
						this.getCheckedAllTo();
					}else{
						this.$message({
							message:response.data.error_description,
							type: 'error'
						});
					}
					
				}, (response) => {
				}) .catch(function (response) {
				
				})
			},
			// 封存
			settingOrganSafeKeep(){
				let data = {
					id:this.nodeId,
				};
				post("http://172.18.12.21:10558/org/frozenOrg",data).then((response) =>{
					if(response.data.error==="0"){
						this.$message({
							message:response.data.error_description,
							type: 'success'
						});
						// 封存按钮可点击
						this.btnDisabledSafeKeep=true;
						// 启用可点击
						this.btnDisabledStartUse=false;
						this.getCheckedAllTo();
					}else{
						this.$message({
							message:response.data.error_description,
							type: 'error'
						});
					}
					
				}, (response) => {
				}) .catch(function (response) {
				
				})
			},
			// 清空校验
			
			resetTest(){
				// 校验字段
				this.testWordsOrgName="";   //机构名称
				this.testWordsOrgType="";  //机构类型
				// input框校验提示信息
				this.testTaxpayerId="";   //纳税人识别号
				this.testOpeningBank="";   //开户行
				this.testBankAccount="";    //银行账号
				this.testWordsTelphone="";   //电话
				this.testWordsAddress="";    //地址
				this.testSendingAddress="";  //发送邮箱
				this.testCopyAddress="";  //抄送邮箱
			},
			
			// 保存
			settingOrganSave(){
				// 如果机构类型选择了部门
				if(this.settingOrganBasicForm.orgType==="1"){
					if(this.settingOrganBasicForm.orgName&&this.settingOrganBasicForm.orgType&&this.settingOrganBasicForm.orgIdUp&&this.settingOrganBasicForm.orgNameUp&&this.settingOrganBasicForm.payMethod){
						let data = {
							// 基本信息
							ummpOrganization:{
								orgId:this.settingOrganBasicForm.orgId,
								orgCode:this.settingOrganBasicForm.orgCode,     //组织机构代码
								orgName:this.settingOrganBasicForm.orgName,      //机构名称
								orgType:this.settingOrganBasicForm.orgType,      //机构类型
								orgIdUp:this.settingOrganBasicForm.orgIdUp,      //上级机构编码
								orgNameUp:this.settingOrganBasicForm.orgNameUp,      //上级机构名称
								payMethod:this.settingOrganBasicForm.payMethod,      //付费方式
								orgSignature:this.settingOrganBasicForm.orgSignature,      //机构签名
							},
							// 开票信息
							ummpBilling:{
								orgPriId:this.nodeId,
								billingType:this.settingOrganBillingForm.billingType,      //开票类型
								billingName:this.nodeData.orgName,      //开票名称
								taxpayerId:this.settingOrganBillingForm.taxpayerId,      //纳税人识别码
								address:this.settingOrganBillingForm.address,      //地址
								telphone:this.settingOrganBillingForm.telphone,      //电话
								openingBank:this.settingOrganBillingForm.openingBank,      //开户行
								bankAccount:this.settingOrganBillingForm.bankAccount,      //银行账号
							},
							ummpMailAddr:{
								sendingAddress:this.ummpMailAddrForm.sendingAddress,   //发送邮箱
								copyAddress:this.ummpMailAddrForm.copyAddress       //抄送邮箱
							}
							
							
						};
						console.log(this.nodeData.orgIdUp,'上级机构编码')
						if(this.settingOrgAddNum===1){
							// 新增时保存
							this.settingOrgRequestUrl="http://172.18.12.21:10558/org/addOrg";
						}else{
							
							// 修改时保存
							this.settingOrgRequestUrl="http://172.18.12.21:10558/org/updateOrg";
							data.ummpOrganization.id=this.nodeId;
							data.ummpBilling.id=this.nodeId;
						}
						post(this.settingOrgRequestUrl,data).then((response) =>{
							if(response.data.error==="0"){
								this.$message({
									message:response.data.error_description,
									type: 'success'
								});
								if(this.settingOrgAddNum===1){
									// 新增时
									// this.getOrangizationData();
									this.getCheckedAllTo();
									this.resetTest();
									this.resetForm();
								}else{
									// 非新增时
									this.getCheckedAllTo();
									this.resetTest();
								}
								
							}else{
								this.$message({
									message:response.data.error_description,
									type: 'error'
								});
							}
							
						}, (response) => {
						}) .catch(function (response) {
						
						})
					}else{
						this.$message({
							message: '请将红色 * 号的输入框填写完整',
							type: 'warning'
						});
					}
				}else{
					// 如果机构类型选择了公司
					if(this.settingOrganBillingForm.billingType==="0"){
						// 专票
						if(this.settingOrganBasicForm.orgName&&this.settingOrganBasicForm.orgType&&this.settingOrganBasicForm.orgIdUp&&this.settingOrganBasicForm.orgNameUp&&this.settingOrganBasicForm.payMethod&&this.settingOrganBillingForm.billingType&&this.settingOrganBillingForm.billingName&&this.settingOrganBillingForm.taxpayerId&&this.settingOrganBillingForm.telphone&&this.settingOrganBillingForm.openingBank&&this.settingOrganBillingForm.bankAccount&&this.ummpMailAddrForm.sendingAddress){
							let data = {
								// 基本信息
								ummpOrganization:{
									orgId:this.settingOrganBasicForm.orgId,
									orgCode:this.settingOrganBasicForm.orgCode,     //组织机构代码
									orgName:this.settingOrganBasicForm.orgName,      //机构名称
									orgType:this.settingOrganBasicForm.orgType,      //机构类型
									orgIdUp:this.settingOrganBasicForm.orgIdUp,      //上级机构编码
									orgNameUp:this.settingOrganBasicForm.orgNameUp,      //上级机构名称
									payMethod:this.settingOrganBasicForm.payMethod,      //付费方式
									orgSignature:this.settingOrganBasicForm.orgSignature,      //机构签名
								},
								// 开票信息
								ummpBilling:{
									orgPriId:this.nodeId,
									billingType:this.settingOrganBillingForm.billingType,      //开票类型
									billingName:this.settingOrganBillingForm.billingName,      //开票名称
									taxpayerId:this.settingOrganBillingForm.taxpayerId,      //纳税人识别码
									address:this.settingOrganBillingForm.address,      //地址
									telphone:this.settingOrganBillingForm.telphone,      //电话
									openingBank:this.settingOrganBillingForm.openingBank,      //开户行
									bankAccount:this.settingOrganBillingForm.bankAccount,      //银行账号
								},
								ummpMailAddr:{
									sendingAddress:this.ummpMailAddrForm.sendingAddress,   //发送邮箱
									copyAddress:this.ummpMailAddrForm.copyAddress       //抄送邮箱
								}
								
								
							};
							console.log(this.nodeData.orgIdUp,'上级机构编码')
							if(this.settingOrgAddNum===1){
								// 新增时保存
								this.settingOrgRequestUrl="http://172.18.12.21:10558/org/addOrg";
							}else{
								
								// 修改时保存
								this.settingOrgRequestUrl="http://172.18.12.21:10558/org/updateOrg";
								data.ummpOrganization.id=this.nodeId;
								data.ummpBilling.id=this.nodeId;
							}
							post(this.settingOrgRequestUrl,data).then((response) =>{
								if(response.data.error==="0"){
									this.$message({
										message:response.data.error_description,
										type: 'success'
									});
									if(this.settingOrgAddNum===1){
										// 新增时
										// this.getOrangizationData();
										this.getCheckedAllTo()
										this.resetTest();
										this.resetForm();
									}else{
										// 非新增时
										this.getCheckedAllTo();
										this.resetTest();
									}
									
								}else{
									this.$message({
										message:response.data.error_description,
										type: 'error'
									});
								}
								
							}, (response) => {
							}) .catch(function (response) {
							
							})
						}else{
							this.$message({
								message: '请将红色 * 号的输入框填写完整',
								type: 'warning'
							});
						}
					}else{
						// 普票
						if(this.settingOrganBasicForm.orgName&&this.settingOrganBasicForm.orgType&&this.settingOrganBasicForm.orgIdUp&&this.settingOrganBasicForm.orgNameUp&&this.settingOrganBasicForm.payMethod&&this.settingOrganBasicForm.orgSignature&&this.settingOrganBillingForm.billingType&&this.settingOrganBillingForm.billingName&&this.settingOrganBillingForm.taxpayerId&&this.ummpMailAddrForm.sendingAddress){
							let data = {
								// 基本信息
								ummpOrganization:{
									orgId:this.settingOrganBasicForm.orgId,
									orgCode:this.settingOrganBasicForm.orgCode,     //组织机构代码
									orgName:this.settingOrganBasicForm.orgName,      //机构名称
									orgType:this.settingOrganBasicForm.orgType,      //机构类型
									orgIdUp:this.settingOrganBasicForm.orgIdUp,      //上级机构编码
									orgNameUp:this.settingOrganBasicForm.orgNameUp,      //上级机构名称
									payMethod:this.settingOrganBasicForm.payMethod,      //付费方式
									orgSignature:this.settingOrganBasicForm.orgSignature,      //机构签名
								},
								// 开票信息
								ummpBilling:{
									orgPriId:this.nodeId,
									billingType:this.settingOrganBillingForm.billingType,      //开票类型
									billingName:this.settingOrganBillingForm.billingName,      //开票名称
									taxpayerId:this.settingOrganBillingForm.taxpayerId,      //纳税人识别码
									address:this.settingOrganBillingForm.address,      //地址
									telphone:this.settingOrganBillingForm.telphone,      //电话
									openingBank:this.settingOrganBillingForm.openingBank,      //开户行
									bankAccount:this.settingOrganBillingForm.bankAccount,      //银行账号
								},
								ummpMailAddr:{
									sendingAddress:this.ummpMailAddrForm.sendingAddress,   //发送邮箱
									copyAddress:this.ummpMailAddrForm.copyAddress       //抄送邮箱
								}
								
								
							};
							console.log(this.nodeData.orgIdUp,'上级机构编码')
							if(this.settingOrgAddNum===1){
								// 新增时保存
								this.settingOrgRequestUrl="http://172.18.12.21:10558/org/addOrg";
							}else{
								
								// 修改时保存
								this.settingOrgRequestUrl="http://172.18.12.21:10558/org/updateOrg";
								data.ummpOrganization.id=this.nodeId;
								data.ummpBilling.id=this.nodeId;
							}
							post(this.settingOrgRequestUrl,data).then((response) =>{
								if(response.data.error==="0"){
									this.$message({
										message:response.data.error_description,
										type: 'success'
									});
									if(this.settingOrgAddNum===1){
										// 新增时
										// this.getOrangizationData();
										this.getCheckedAllTo()
										this.resetForm();
										this.resetTest();
									}else{
										// 非新增时
										this.getCheckedAllTo();
										this.resetTest();
									}
									
								}else{
									this.$message({
										message:response.data.error_description,
										type: 'error'
									});
								}
								
							}, (response) => {
							}) .catch(function (response) {
							
							})
						}else{
							this.$message({
								message: '请将红色 * 号的输入框填写完整',
								type: 'warning'
							});
						}
					}
					
					
				}
				
				
				
				
			}
		},
		
	}
</script>
<style>
	.settingOrgan{
		-moz-box-shadow:3px 2px 12px #333333; -webkit-box-shadow:3px 2px 12px #333333; box-shadow:3px 2px 12px #333333;
	}
</style>

