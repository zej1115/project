<template>
	<div class="form-search">

		<div class="clear">
			<div class="fl w300 form-field-box mg-b10">
				<div class="fl w60 h30 lh30 text-right">消息内容类型</div>
				<div class="h30 pd-l70">
					<el-input
						class="w100p"
						size="small"
						v-model="searchForm.dictDataValue"
						@blur="changeTo1"
						ref="searchForm1"
						placeholder="请输入"></el-input>
				</div>
			</div>
			
			<div class="fl w300 form-field-box mg-b10">
				<div class="fl w60 h30 lh30 text-right">备注</div>
				<div class="h30 pd-l70">
					<el-input
						class="w100p"
						size="small"
						v-model="searchForm.remark"
						@blur="changeTo2"
						ref="searchForm2"
						placeholder="请输入"></el-input>
				</div>
			</div>
			<div class="fr mg-l20">
				<el-button @click="searchList()" class="pd-lr20" size="small" type="primary">查询</el-button>
			</div>
		</div>


	</div>

</template>

<script>
	import { get, post } from './../../../../util/http'
	import { formatGetUrl, trimString, baseUrl } from '../../../../../static/js/common'
	import eventVue from './../../../../../static/js/eventBus'
	
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
    export default {
			name: "form-search",
      props:{
			},
			computed: {
				...mapGetters([
					'getTableList',
					'getWatchTableList',
					'getCurrentPageNum',
					'getCurrentPageSize',
				]),
         // 列表数据
				tableList: {
					get: function () {
						return this.getTableList;
					},
					set: function (val) {
						this.setTableList(val);
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
				// 当前的列表pageSize
				currentPageSize:{
					get: function () {
						return this.getCurrentPageSize;
					},
					set: function (val) {
						this.setCurrentPageSize(val);
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
				watchTableList:{
					get:function(){
						return this.getWatchTableList
					},
					set:function(){
						return this.setWatchTableList(val)
					}
				}

			},
			data(){
        	return{
						searchForm:{
							dictDataValue:"",
							remark:""
						},
      
					}
			},
			mounted(){
			},
			methods:{
        	...mapActions([
						'setTableList',
						'setWatchTableList',
						'setTotalListNum',
						'setCurrentPageNum',
						'setCurrentPageSize',
					]),
				changeTo1(){
        		console.log(this.searchForm.dictDataValue,'3333333');
				},
				changeTo2(){
					console.log(this.searchForm.remark,'44444');
				},
				searchList(){
					var searchAllData={
						dictDataValue:this.searchForm.dictDataValue,
						remark:this.searchForm.remark
				   };
					eventVue.$emit("send",searchAllData);
				}
			}
    }
</script>

