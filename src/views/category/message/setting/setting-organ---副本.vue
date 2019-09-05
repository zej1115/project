<template>
	<div class="setting-organ">
		<div class="w400 h600 bg-color-white fl mg-l10 inline-block overflow-scroll-y">
			<div class="w300 inline-block mg-t10">
				<el-input
					placeholder="模糊搜索"
					size="small"
					v-model="filterText">
				</el-input>
			</div>
			<div  class="w70 inline-block fr mg-t10">
				<!--<button class="common-button" @click="filterTree(val)">确定</button>-->
			</div>
			<el-tree
				class="filter-tree"
				:data="data2"
				:props="defaultProps"
				default-expand-all
				:filter-node-method="filterNode"
				ref="tree2">
			</el-tree>
			<input type="checkbox" class="mg-t20">显示已封存项目
		</div>
		<div class="bg-color-white w500  mg-l150 fl inline-block">
			<div class="bg-color-white w450 h50  inline-block">

				<button class="common-button">新增</button>
				<button class="common-button">修改</button>
				<button class="common-button">删除</button>
				<button class="common-button" @click="saveSetting">保存</button>
				<button class="common-button" @click="saveDate">封存</button>
				<button class="common-button">启用</button>
				<button class="common-button" @click="resetForm()">重置</button>
			</div>
			<div class="w500">
				<new-tabs  @changeTab="changeTab" :tableButtons="tableButtons" :currentTab="currentTab" :tabsBox="tabsBoxClassName">
					<template slot="header">
						<div v-show="slot1">
							<!--一个input框-->
							<div class="clear pd-b10 pd-t10 pd-lr40">
								<div class="fl w100p  form-field-box mg-b10"  v-for="(item,index) in organizationFormListBasic">
									<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="item.required">*</span>{{item.title}}</div>
									<div class="h30 pd-l120 pos-relative">
										<el-input
											class="w100p inputTo"
											:readonly="item.readonly"
											:size="item.size"
											:model="(item.prop)"
											:clearable="clearable"
											@blur="changeTo(index,item)"
											ref="settingForm"
											:placeholder="item.placeholder"></el-input>
										<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>

									</div>
								</div>
							</div>
							<!--下拉菜单-->
							<div class="clear pd-b10 pd-lr40">
								<div class="fl w100p  form-field-box mg-b10"  v-for="(itemSe,index) in organizationFormListBasicSelect">
									<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="itemSe.required">*</span>{{itemSe.title}}</div>
									<div class="h30 pd-l120 pos-relative">
										<el-select v-model="itemSe.prop" :placeholder="itemSe.placeholder" :size="itemSe.size">
											<el-option
												v-for="(itemSeOp,index) in (itemSe.options)"
												:key="itemSeOp.value"
												:label="itemSeOp.label"
												ref="settingForm"
												:value="itemSeOp.value">
											</el-option>
										</el-select>
										<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
									</div>
								</div>
							</div>
							<!----------日期----------->
							<div class="clear pd-b10 pd-lr40">
								<div class="fl w100p  form-field-box mg-b10"  v-for="(item,index) in organizationFormListBasicDate">
									<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="item.required">*</span>{{item.title}}</div>
									<div class="h30 pd-l120 pos-relative">
										<el-date-picker
											class="w100p"
											v-model='item.prop.dateOr1'
											type="date"
											ref="settingForm"
											:size="item.size"
											:placeholder="item.placeholder">
										</el-date-picker>
										<testWords :testWords="testWords" ref="settingFormTest" style="left: 35px;"></testWords>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template slot="footer">
						<div v-show="slot2">
							<div class="clear pd-b10 pd-t10 pd-lr40">
								<div class="fl w100p  form-field-box mg-b10"  v-for="(item,index) in organizationFormListInvoice">
									<div class="fl w100 h30 lh30 text-right"><span class="required" v-if="item.required">*</span>{{item.title}}</div>
									<div class="h30 pd-l120 pos-relative">
										<el-input
											class="w100p"
											:readonly="item.readonly"
											:size="item.size"
											:model="(item.prop)"
											@blur="changeToSe"
											ref="settingForm1"
											:placeholder="item.placeholder"></el-input>
										<testWords :testWords="testWords" style="left: 35px;"></testWords>
									</div>
								</div>
							</div>
						</div>
					</template>
				</new-tabs>
			</div>
		</div>

	</div>
</template>

<script>
	import { get, post } from '../../../../util/http'
	import myTabs from '../../../../components/navigation/tabs/tabs'
	import newTabs from '../../../../components/navigation/tabs/newTabs'
	import testWords from '../../../../components/packages/marked-words/test-words'
	export default {
		name: "setting-organ",
		components:{
			myTabs,
			newTabs,
			testWords
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		data() {
			return {
				// 必填
				tableButtons:[
					{id:1,name:"基本信息"},
					{id:2,name:"开票信息"},
				],
				clearable:true,
				value1:"",
				valueTo:"",
				testWords:"",
				todo:{"text":"123","name":"lln"},
				filterText: '',
				currentContent: '',
				slot1:true,
				slot2:false,
				tabsBoxClassName: 'tabs-box',
				organizationFormListBasic:[
					{title:"机构编码",placeholder:"请输入",prop:"dictTo",size:"small",readonly:false,required:false},
					{title:"组织机构编码",placeholder:"请输入",prop:"status",size:"small",readonly:false,required:true},
					{title:"机构名称",placeholder:"请输入",prop:"dictValue",size:"small",readonly:false,required:false},
					// {title:"机构类型",placeholder:"请输入",prop:"name",size:"small",readonly:false,required:true},
					{title:"上级机关编码",placeholder:"请输入",prop:"nameId",size:"small",readonly:false,required:false},
					{title:"上级机构名称",placeholder:"请输入",prop:"username",size:"small",readonly:false,required:true},
					{title:"付费方式",placeholder:"请输入",prop:"dictData",size:"small",readonly:false,required:false},
					{title:"机构签名",placeholder:"请输入",prop:"status",size:"small",readonly:false,required:true},
					// {title:"创建时间",placeholder:"请输入",prop:"status",size:"small",readonly:false,required:false},
				],
				// 下拉菜单
				organizationFormListBasicSelect:[
					{title:"机构类型",placeholder:"请选择",prop:"", size:"small",readonly:false,required:true,options:[
							{
								value: '1',
								label: '黄金糕'
							}, {
								value: '2',
								label: '双皮奶'
							}, {
								value: '3',
								label: '蚵仔煎'
							}, {
								value: '4',
								label: '龙须面'
							}, {
								value: '5',
								label: '北京烤鸭'
							}
						]
					},
				],
				organizationFormListBasicDate:[
					{title:"创建时间",placeholder:"请选择时间",prop:{dateOr1:""}, size:"small",readonly:false,required:true},
					// {title:"创建时间",placeholder:"请选择时间",prop:{dateOr2:""}, size:"small",readonly:false,required:true},
				],
				organizationFormListInvoice:[
					{title:"开票类型",placeholder:"请输入",prop:"dictDataValue",size:"small",readonly:false,required:false},
					{title:"开票名称",placeholder:"请输入",prop:"status",size:"small",readonly:false,required:false},
					{title:"纳税人识别号",placeholder:"请输入",prop:"dictDataValue",size:"small",readonly:false,required:true},
					{title:"地址",placeholder:"请输入",prop:"status",size:"small",readonly:false,required:false},
					{title:"电话",placeholder:"请输入",prop:"dictDataValue",size:"small",readonly:false,required:true},
					{title:"开户行",placeholder:"请输入",prop:"status",size:"small",readonly:false,required:false},
					{title:"银行账号",placeholder:"请输入",prop:"dictDataValue",size:"small",readonly:false,required:true},
					{title:"创建时间",placeholder:"请输入",prop:"status",size:"small",readonly:false,required:false},
				],
				data2: [],
				defaultProps: {
					children: 'childTSMenuTreeMsgVo',
					label: 'name'
				},
				// 选项卡数据
				tabsBoxClassName: 'tabs-box',
				currentTab:1,
				searchAll:{}
			};
		},
		created(){
			this.getOrangizationData();
		},
		mounted(){

		},
		methods: {
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
			filterNode(value, data){
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			// 重置
			resetForm(){
				for(var i=0;i<this.organizationFormListBasic.length;i++){
					this.organizationFormListBasic[i].prop="";
				}
			},
			// 过滤模糊搜索树形控件
			// filterTree(val){
			// 	this.$refs.tree2.filter(val);
			// },
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
			changeTo(index,item){
				var itemTitle=item.title;
				var valueStr=this.$refs.settingForm[index].$data.currentValue;
				this.valueTo=valueStr;
				console.log(this.valueTo);
				// 如果是必填项
				if(item.required){
					// 必填项为空
					if(!valueStr){
						this.$refs.settingFormTest[index].testWords="请输入"+itemTitle;
					}else{
						// 必填项不为空
						this.$refs.settingFormTest[index].testWords='';
					}
				}


			},
			saveDate(){
				console.log(this.$refs.dateForm[0])
			},
			// 保存
			saveSetting(){

				for(var i=0;i<this.$refs.settingForm.length;i++){
					// 普通input框的v-model
					var searchModel=[];
					searchModel.push(this.$refs.settingForm[i].$attrs.model);
					// 普通input框输入的值
					var searchCurrentValue=[];
					searchCurrentValue.push(this.$refs.settingForm[i].$data.currentValue);
					// 时间插件的v-model
					searchModel.push("dateOr1");
					// 时间插件的输入的值
					searchCurrentValue.push(this.organizationFormListBasicDate[0].prop.dateOr1.toString());
					console.log(this.organizationFormListBasicSelect[0].prop,'下拉菜单呢');
					for (var j=0;j<searchModel.length;j++){
						this.searchAll[searchModel[j]]=searchCurrentValue[j];
					}
					if(this.organizationFormListBasic[i].required){
						// if()
						this.$refs.settingFormTest[i].testWords="请输入";
					}
				}
				console.log(this.searchAll)

				// for(var i=0;i<this.organizationFormListBasic[i].length;i++){
				// 	alert("22")
				//
				// }

			},
			changeToSe(){

			}
		},

	}
</script>

