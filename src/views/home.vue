<template>
	<div class="w100p h100p home">

		<!-- search-box begin -->
		<div class="bg-color-white mg-b10 pd-lr20 pd-t30 search-box pos-relative">
			<div :class="isHidden?'search-hidden':'search-out'" class="search-box-box">
				<div class="clear overflow-hidden" >
					<div class="fl mg-b15 form-field-box">
						<div class="fl w110 h36 lh36 text-right">
							<span class="required">*</span>项目名称
						</div>
						<div class="h36 pd-l120 pos-relative">
							<el-input
								class="mg-b20 w100p"
								:readonly="false"
								size="small"
								v-model="input"
								placeholder="请输入内容"></el-input>
							<testWords :testWords="testWords"></testWords>
						</div>
						<markedWords :markedTitle="markedTitle"></markedWords>
					</div>
					<div class="fl mg-b15 form-field-box">
						<div class="fl w110 h36 lh36 text-right"><span class="required">*</span>业务环节</div>
						<div class="h36 lh36 pd-l120">
							<el-input
								class="mg-b20 w100p"
								:readonly="false"
								size="small"
								v-model="input"
								placeholder="请输入内容"></el-input>
						</div>
					</div>
					<div class="fl mg-b15 form-field-box">
						<div class="fl w110 h36 lh36 text-right">业务环节</div>
						<div class="h36 lh36 pd-l120">
							<el-input
								class="mg-b20 w100p"
								:readonly="false"
								size="small"
								v-model="input"
								placeholder="请输入内容"></el-input>
						</div>
					</div>
					<div class="fl mg-b15 form-field-box">
						<div class="fl w110 h36 lh36 text-right">项目名称</div>
						<div class="h36 pd-l120">
							<el-input
								class="mg-b20 w100p"
								:readonly="false"
								size="small"
								v-model="input"
								placeholder="请输入内容"></el-input>
						</div>
					</div>
					<div class="fl mg-b15 form-field-box">
						<div class="fl w110 h36 lh36 text-right">业务环节</div>
						<div class="fl pd-t10 pd-l10">
							<el-radio v-model="radio" label="1">选项1</el-radio>
							<el-radio v-model="radio" label="2">选项2</el-radio>
							<el-radio v-model="radio" label="3">选项3</el-radio>
						</div>
					</div>

					<div class="fr">
						<button class="common-button-medium">查询</button>
						<button class="common-button-medium">清空</button>
					</div>
				</div>
			</div>
			<!--索引项收缩start-->
			<!--<div :class="isHiddenUp?'search-hidden-button':'search-hidden-button2'" class="iconUp hidden-up" @click="hiddenUpEvent">
				<svg t="1546412361679"  style="" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3639" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M231.5 577.4L512 296.9l280.5 280.5c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.7-11.7 11.7-30.7 0-42.4L533.2 233.2c-11.7-11.7-30.7-11.7-42.4 0L189 535c-11.7 11.7-11.7 30.7 0 42.4 11.8 11.7 30.8 11.7 42.5 0zM835 748.3L533.2 446.6c-11.7-11.7-30.7-11.7-42.4 0L189 748.3c-11.7 11.7-11.7 30.7 0 42.4s30.7 11.7 42.4 0L512 510.2l280.5 280.5c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.8-11.7 11.8-30.7 0.1-42.4z" p-id="3640" fill="#707070"></path></svg>
			</div>
			<div :class="isHiddenDown?'search-out-button':'search-out-button2'" class="iconDown hidden-up" @click="hiddenUpEvent">
				<svg t="1546412432280"  style="" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4250" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M792.5 446.6L512 727.1 231.5 446.6c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4l301.8 301.7c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8L835 489c11.7-11.7 11.7-30.7 0-42.4-11.8-11.7-30.8-11.7-42.5 0zM490.8 577.4c5.9 5.9 13.5 8.8 21.2 8.8 7.7 0 15.4-2.9 21.2-8.8L835 275.7c11.7-11.7 11.7-30.7 0-42.4s-30.7-11.7-42.4 0L512 513.8 231.5 233.3c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.7 0 42.4l301.7 301.7z" p-id="4251" fill="#707070"></path></svg>
			</div>-->
			<!--索引项收缩end-->
			<searchBox @hiddenUpEvent="hiddenUpEvent" :isHiddenUp="isHiddenUp" :isHiddenDown="isHiddenDown"></searchBox>
		</div>
		<!-- search-box end -->
		<div class="bg-color-white mg-b20 pd-lr20 pd-t20 pd-b20 h700">
			<div class="mg-b20">
				<button class="common-button">新增</button>
				<button class="common-button">修改</button>
				<button class="common-button">删除</button>
				<button class="common-button">导出数据</button>
			</div>
			<div class="h500">
				<my-tabs :tableButtons="tableButtons" @changeTab="changeTab" :tabsBox="tabsBoxClassName" :currentTab="currentTab">
					<keep-alive>
						<component :is="currentContent">
						</component>
					</keep-alive>
				</my-tabs>
			</div>
			<div class="bg-color-white mg-b20 pd-lr20 pd-t20 pd-b20">分页区</div>
		</div>
	</div>
</template>


<script>
	import selected1 from './category/message/mms/mms-mms-model'
	import selected2 from './category/message/mms/mms-mms-sending'
	import myTabs from '../components/navigation/tabs/tabs'
	import markedWords from '../components/packages/marked-words/marked-words'
	import testWords from '../components/packages/marked-words/test-words'
	import searchBox from '../components/search/search-box'
	export default {
		name: 'home',
		components: {
			myTabs,
			'one': selected1,
			'two': selected2,
			markedWords,
			testWords,
			searchBox
		},
		data () {
			return {
				testWords: '必填',
				markedTitle: '此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦此处是一段提示语哦',
				isHiddenUp: true,//向上收缩的箭头
				isHiddenDown: false,//向下展开的箭头*/
				isHidden: false,
				input: 'inputData',
				msg: 'test textarea',
				radio: '1',
				tabsBoxClassName: 'tabs-box',
				currentTab:1,
				currentContent: 'one',
				msg: 'Welcome to Your Vue.js App',
				tableButtons:[
					{
						id:1,
						name:'标签一',
						component: 'one'
					},
					{
						id:2,
						name:'标签二',
						component: 'two'
					}
				],
			}
		},
		created () {
			// console.log('test');
		},
		methods:{
			// 切换选项卡
			changeTab: function (tab) {
				this.currentTab = tab.id;
				this.currentContent = tab.component;
			},

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
		},
		mounted () {
			/*let $home = $('.home');
      $home.mCustomScrollbar({
        set_width: false,
        set_height: false,
        // horizontalScroll: false,
        axis:"xy",
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
      });*/
		}
	}
</script>
