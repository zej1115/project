<template>
	<div class="api-manage-channel-record">
		<div>
			<div class="">
				<el-button class="common-button-medium mg-l20"  @click="newAddDialog">新增</el-button>
			</div>
			<!--列表-->
			<tableItem
				:lineList="lineList"
				:firstTableUrl="firstTableUrl"
				:operationAble="operationAble"
				:checkBoxAble="checkBoxAble"
				:buttonList="buttonList"
			>
			</tableItem>
			<!--<table border="1" class="table-style-default" cellspacing="0" cellpadding="2" width="100%">
				<thead>
					<th v-for="(item,index) in lineList"  :width="item.width" calss="pd-tb5 pd-lr10 ui-resizable" >{{item.label}}</th>
					<th width="300">操作</th>
				</thead>
				<tbody>
					<tr v-for="(item1,index) in tableListData">
						<td v-for="(item2,index) in lineList"  :width="item2.width" >{{item1[item2.prop]}}</td>
						<td>
							<span @click="stop(item1)">暂停通道</span>
							<span @click="modifyDialog(item1)">修改</span>
							<span @click="del(item1)">删除</span>
						</td>
					</tr>
				</tbody>
			</table>-->
			<!--分页-->
		</div>
		<div class="w100p h100p pos-fix pos-c z-1000 popup-panel" v-show="newAddDialogIsShow">
			<div class="black-opacity-50p w100p h100p pos-relative">
				<div class="br6 bg-color-white w1000 h500 pos-abs pos-c pd-lr10 pd-tb30">
					<div class="el-icon-close pos-abs t10 r10 f30 z-10 mouse-hand" @click="closeDialog"></div>
					<div class="authorityBox">
						<div class="text-center f20">新增通道登记</div>
						<div class="clear mg-t30">
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道值</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelNumber"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span class="required">*</span><span>通道名称</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelName"
										placeholder="请输入内容">
									</el-input>
									<div v-show="channelNameIsShow" class="pos-abs t30 mustWord">必填</div>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道类型</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-select class="w100p" clearable size="medium"  v-model="channelData.channelType" placeholder="请选择">
										<el-option
											v-for="item in channelTypeArr"
											:key="item.value"
											:label="item.label"
											:value="item.label">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span class="required">*</span><span>通道性质</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-select class="w100p" clearable size="medium"  v-model="channelData.channelProperties" placeholder="请选择">
										<el-option
											v-for="item in channelPropertiesArr"
											:key="item.value"
											:label="item.label"
											:value="item.label">
										</el-option>
									</el-select>
									<div v-show="channelPropertiesIsShow" class="pos-abs t32 mustWord">必选</div>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>应用黑名单</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-select class="w100p" clearable size="medium"  v-model="channelData.applicationBlacklist" placeholder="请选择">
										<el-option
											v-for="item in applicationBlacklistArr"
											:key="item.value"
											:label="item.label"
											:value="item.label">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>所属区域</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelArea"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span class="required">*</span><span>码号</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelCodeNumber"
										placeholder="请输入内容">
									</el-input>
									<div v-show="channelCodeNumberIsShow" class="pos-abs t30 mustWord">必填</div>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道运营商</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-select class="w100p" clearable size="medium"  v-model="channelData.channelOperators" placeholder="请选择">
										<el-option
											v-for="item in channelOperatorsArr"
											:key="item.value"
											:label="item.label"
											:value="item.label">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>签名位置</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.signatureLocation"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>接入IP</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelIP"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>接入端口</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.accessPort"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道账户名</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelAccountName"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道密码</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelPassport"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道通信协议</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelCommunicationProtocol"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道流控</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelFlowControl"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>延迟时间</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelDelayTime"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>短信长度</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelMessageLength"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>长短信长度</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelLongMessageLength"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>发送时使用签名</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelSendingName"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
							<div class="mg-b15 fl form-field-box channelWidth">
								<div class="fl w110 h36 lh36 text-right">
									<span>通道备注</span>
								</div>
								<div class="h36 pd-l120 pos-relative">
									<el-input
										class="mg-b20 w100p"
										:readonly="false"
										:disabled="isEdit"
										size="small"
										v-model="channelData.channelNotes"
										placeholder="请输入内容">
									</el-input>
								</div>
							</div>
						</div>
						<div class="text-center">
							<el-button class="common-button-medium mg-l20" :disabled="channelSave" @click="channelSaveEvent">保存</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	import tableItem from '../../../../components/packages/lee-table/src/tableItem'
	export default {
		name: "api-manage-channel-record",
		components:{
			tableItem,
		},
		data () {
			return {
				// 查询的url
				firstTableUrl:"http://172.18.12.36:8080/hx/api/dic/MsgContentType/selectByMap",
				newAddDialogIsShow: false,
				channelStop: false,
				channelSave: false,
				isEdit: false,
				channelNameIsShow: false,
				channelPropertiesIsShow: false,
				channelCodeNumberIsShow: false,
				channelData: {
					channelNumber: null,
					channelName: '',
					channelType: '',
					channelProperties: '',
					applicationBlacklist: '',
					channelArea: '',
					channelCodeNumber: '',
					channelOperators: '',
					signatureLocation: '',
					channelIP: '',
					accessPort: '',
					channelAccountName: '',
					channelPassport: '',
					channelCommunicationProtocol: '',
					channelFlowControl: '',
					channelDelayTime: '',
					channelMessageLength: '',
					channelLongMessageLength: '',
					channelSendingName: '',
					channelNotes: '',
				},
				lineList:[
					{'label':'序号','prop':'code','width':"200","class":"tableTh"},
					{'label':'通道值','prop':'codeNumber','width':"200","class":"tableTh"},
					{'label':'通道名称','prop':'channelName','width':"200","class":"tableTh"},
					{'label':'通道类型','prop':'channelType','width':"200","class":"tableTh"},
					{'label':'信息类型','prop':'messageType','width':"200","class":"tableTh"},
					{'label':'运营商','prop':'yunying','width':"200","class":"tableTh"},
					{'label':'所属区域','prop':'area','width':"200","class":"tableTh"},
					{'label':'通道号码','prop':'channelCode','width':"200","class":"tableTh"},
					{'label':'通道备注','prop':'channelWord','width':"200","class":"tableTh"},
				],
				operationAble: true,
				checkBoxAble: false,
				buttonList: [
					{'text':'暂停通道','prop':'','width':"200"},
					{'text':'修改','prop':'','width':"200"},
					{'text':'删除','prop':'','width':"200"},
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
				/*通道类型*/
				channelTypeArr: [
					{
						value: '',
						label: '全部'
					},
					{
						value: 0,
						label: '删除'
					},
					{
						value: 1,
						label: '新增'
					},
				],
				/*通道性质*/
				channelPropertiesArr: [
					{
						value: '',
						label: '全部'
					},
					{
						value: 0,
						label: '删除'
					},
					{
						value: 1,
						label: '新增'
					},
				],
				/*应用黑名单*/
				applicationBlacklistArr: [
					{
						value: '',
						label: '全部'
					},
					{
						value: 0,
						label: '删除'
					},
					{
						value: 1,
						label: '新增'
					},
				],
				/*通道运营商*/
				channelOperatorsArr: [
					{
						value: '',
						label: '全部'
					},
					{
						value: 0,
						label: '删除'
					},
					{
						value: 1,
						label: '新增'
					},
				],
			}
		},
		computed:{
			// 获得getters的数据
			...mapGetters([
				'getWatchTableList',
			]),
			watchTableList:{
				get:function(){
					return this.getWatchTableList
				},
				set:function(){
					return this.setWatchTableList(val)
				}
			},
		},
		created(){

		},
		mounted(){
			$('th').resizable();
		},
		methods:{
			// 获取action中数据
			...mapActions([
				'setWatchTableList',
			]),
			/*检验必填项*/
			testMust(){
				if (!this.channelData.channelName) {
					this.channelNameIsShow = true;
				} else {
					this.channelNameIsShow = false;
				}
				if (!this.channelData.channelProperties) {
					this.channelPropertiesIsShow = true;
				} else {
					this.channelPropertiesIsShow = false;
				}
				if (!this.channelData.channelCodeNumber) {
					this.channelCodeNumberIsShow = true;
				} else {
					this.channelCodeNumberIsShow = false;
				}
			},
			/*暂停通道*/
			channelStopEvent(){

			},
			//新增
			newAddDialog(){
				this.newAddDialogIsShow = true;
				this.channelData = {
					channelNumber: null,
						channelName: '',
						channelType: '',
						channelProperties: '',
						applicationBlacklist: '',
						channelArea: '',
						channelCodeNumber: '',
						channelOperators: '',
						signatureLocation: '',
						channelIP: '',
						accessPort: '',
						channelAccountName: '',
						channelPassport: '',
						channelCommunicationProtocol: '',
						channelFlowControl: '',
						channelDelayTime: '',
						channelMessageLength: '',
						channelLongMessageLength: '',
						channelSendingName: '',
						channelNotes: '',
				}
			},
			/*保存*/
			channelSaveEvent(){
				this.testMust();
				let messageForm = {
					channelNumber: this.channelData.channelNumber,
					channelName: this.channelData.channelName,
					channelType: this.channelData.channelType,
					channelProperties: this.channelData.channelProperties,
					applicationBlacklist: this.channelData.applicationBlacklist,
					channelArea: this.channelData.channelArea,
					channelCodeNumber: this.channelData.channelCodeNumber,
					channelOperators: this.channelData.channelOperators,
					signatureLocation: this.channelData.signatureLocation,
					channelIP: this.channelData.channelIP,
					accessPort: this.channelData.accessPort,
					channelAccountName: this.channelData.channelAccountName,
					channelPassport: this.channelData.channelPassport,
					channelCommunicationProtocol: this.channelData.channelCommunicationProtocol,
					channelFlowControl: this.channelData.channelFlowControl,
					channelDelayTime: this.channelData.channelDelayTime,
					channelMessageLength: this.channelData.channelMessageLength,
					channelLongMessageLength: this.channelData.channelLongMessageLength,
					channelSendingName: this.channelData.channelSendingName,
					channelNotes: this.channelData.channelNotes,
				};
				console.log(messageForm)
			},
			closeDialog(){
				this.newAddDialogIsShow = false;
			},
			/*修改*/
			modifyDialog(item){
				console.log('item',item)
				this.newAddDialogIsShow = true;
				this.channelData = {
					channelNumber: null,
					channelName: '',
					channelType: '',
					channelProperties: '',
					applicationBlacklist: '',
					channelArea: '',
					channelCodeNumber: '',
					channelOperators: '',
					signatureLocation: '',
					channelIP: '',
					accessPort: '',
					channelAccountName: '',
					channelPassport: '',
					channelCommunicationProtocol: '',
					channelFlowControl: '',
					channelDelayTime: '',
					channelMessageLength: '',
					channelLongMessageLength: '',
					channelSendingName: '',
					channelNotes: '',
				}
			},
			stop(item){
				console.log('item',item)
			},
			del(item){
				console.log('item',item)
			}

		}
	}
</script>
