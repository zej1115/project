<template>
	<div class="w100p h100p pos-fix pos-c z-100 forgot-password">
		<div class="black-opacity-50p w100p h100p pos-relative">
			<div class="br6 bg-color-white w500 h300 pd-t10 pd-lr20 pos-abs pos-c">
				<!-- step begin -->
				<div class="mg-b30 pd-l20 pd-r20 step-form-menu">
					<div class="clear h50 pos-relative step-list">
						<div class="w100p h2 pos-abs pos-c h-line">
							<div class="fl h100p progress-bar"></div>
						</div>
						<div class="w26 h26 text-center pos-abs step-menu-item"
								 :class="'step-menu-item-' + (index + 1)" v-for="(item, index) in stepList">
							<div class="w80 h52 pos-abs pos-t0" style="margin-left: -40px; left: 50%;">
								<div class="w26 h26 block-center text-center pos-relative">
									<span class="w100p h100p pos-abs pos-c icon-circle-o" v-if="item.isActive">{{ index + 1 }}</span>
									<span class="f26 w100p h100p pos-abs pos-c el-icon-circle-check-outline" v-if="item.isSuccess"></span>
								</div>
								<div class="h26 lh26 text-center">{{ item.name }}</div>
							</div>
						</div>
					</div>
				</div>
				<!-- step begin -->
				
				<div class="pd-lr50 password-form">
					<div class="clear mg-b20">
						<div class="fl w60 h30 lh30 text-right">用户名</div>
						<div class="pd-l70">
							<label class="pos-relative">
								<input class="lee-input-inner is-small" type="text">
							</label>
						</div>
					</div>
					
					<div class="clear mg-b20">
						<div class="fl w60 h30 lh30 text-right">手机号</div>
						<div class="pd-l70">
							<label class="pos-relative">
								<input class="lee-input-inner is-small" type="text">
							</label>
						</div>
					</div>
					
					<div class="clear mg-b20">
						<div class="fl w60 h30 lh30 text-right">验证码</div>
						<div class="pd-l70">
							<label class="block pd-r90 pos-relative">
								<input class="lee-input-inner is-small" type="text">
								<el-button class="w80 pos-abs pos-c-r" size="small" type="primary">获取</el-button>
							</label>
						</div>
					</div>
				</div>
				
				<div class="form-action">
					<div class="clear text-center">
						<el-button size="small" type="primary">下一步</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import leeStep from '../../components/navigation/step/step'
	export default {
		name: "forgot-password",
		components: {
			leeStep
		},
		data() {
			return {
				stepList: [
					{ id: 1, name: '身份验证', isActive: true, isSuccess: false },
					{ id: 2, name: '重置密码', isActive: true, isSuccess: false },
					{ id: 3, name: '重置成功', isActive: true, isSuccess: false },
				]
			}
		}
	}
</script>

<style>
	.step-form-menu .step-list .h-line { background: #c5c5c5; }
	.step-form-menu .step-list .progress-bar { background: #409eff; transition-duration: .5s; }
	.step-form-menu .step-menu-item { background: #fff; cursor: pointer; margin-top: -13px; margin-left: -13px; top: 50%; z-index: 10; }
	.step-form-menu .step-menu-item .icon-circle-o { border: 2px solid #c5c5c5; border-radius: 50%; line-height: 22px; transition-duration: .5s; }
	.step-form-menu .step-menu-item span { color: #c5c5c5; }
	.step-form-menu .step-menu-item i { color: #c5c5c5; }
	.step-form-menu .step-menu-item-1 { left: 0; }
	.step-form-menu .step-menu-item-2 { left: 50%; }
	.step-form-menu .step-menu-item-3 { left: 100%; }
	.step-form-menu .step-list .is-active span { color: #409eff; }
	.step-form-menu .step-list .is-active .icon-circle-o { border: 2px solid #409eff; }
	.step-form-menu .step-list .is-success .el-icon-circle-check-outline { color: #67c23a; }
	.step-form-menu .step-list .num { color: #c5c5c5; }
	.step-form-menu .step-list .text { color: #c5c5c5; }
	.step-form-menu .step-list .is-active .num { color: #409eff; }
	.step-form-menu .step-list .is-active .text { color: #409eff; }
</style>
