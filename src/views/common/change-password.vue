<template>
	<transition name="box2">
		<div class="w100p h100p pos-fix pos-c z-100 change-password" v-if="isShow">
			<div class="black-opacity-50p w100p h100p pos-relative">
				<div class="br6 bg-color-white w400 h280 pos-abs pos-c">
					<div class="f16 h50 lh50 mg-b20 text-center form-title">修改密码</div>
					<div class="pd-lr40 form-content">
						<div class="clear mg-b20">
							<div class="fl w70 h30 lh30 text-right"><span class="required">*</span>旧密码</div>
							<div class="pd-l80">
								<div class="w100p pos-relative">
									<input class="lee-input-inner is-small" type="password" placeholder="输入旧密码" v-model="passwordForm.oldPassword">
									<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
										{{ passwordFormAlarm.oldPassword }}
									</div>
								</div>
							</div>
						</div>
						<div class="clear mg-b20">
							<div class="fl w70 h30 lh30 text-right"><span class="required">*</span>新密码</div>
							<div class="pd-l80">
								<div class="w100p pos-relative">
									<input class="lee-input-inner is-small" type="password" placeholder="输入新密码" v-model="passwordForm.newPassword">
									<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
										{{ passwordFormAlarm.newPassword }}
									</div>
								</div>
							</div>
						</div>
						<div class="clear mg-b20">
							<div class="fl w70 h30 lh30 text-right"><span class="required">*</span>确认密码</div>
							<div class="pd-l80">
								<div class="w100p pos-relative">
									<input class="lee-input-inner is-small" type="password" placeholder="再次输入新密码" v-model="passwordForm.newRePassword">
									<div class="color-red f12 w100p h20 lh20 pos-abs l0 b-m20">
										{{ passwordFormAlarm.newRePassword }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-action">
						<div class="f0 text-center">
							<el-button @click="saveNewPassword" size="small" type="primary">保存</el-button>
							<el-button @click="cancelChangePassword" class="mg-l20" size="small">取消</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "change-password",
		data() {
			return {
				isShow: false,
				
				passwordForm: {
					oldPassword: '',
					newPassword: '',
					newRePassword: ''
				},
				
				passwordFormAlarm: {
					oldPassword: '',
					newPassword: '',
					newRePassword: ''
				}
			};
		},
		
		methods: {
			// 打开密码修改窗口
			openChangePassword() {
				this.resetPasswordForm();
				this.isShow = true;
			},
			
			// 保存新密码
			saveNewPassword() {
				let isTrue = this.checkPassword();
				console.log(isTrue);
			},
			
			// 校验密码
			checkPassword() {
				let isTrue = true;
				let regLetterAndNum = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/g;
				this.passwordFormAlarm.oldPassword = '';
				this.passwordFormAlarm.newPassword = '';
				this.passwordFormAlarm.newRePassword = '';
				if (!this.passwordForm.oldPassword) {
					this.passwordFormAlarm.oldPassword = '请输入旧密码！';
					isTrue = false;
				}
				
				if (this.passwordForm.newPassword) {
					if (regLetterAndNum.test(this.passwordForm.newPassword)) {
						if (this.passwordForm.newRePassword) {
							if (this.passwordForm.newPassword !== this.passwordForm.newRePassword) {
								this.passwordFormAlarm.newRePassword = '两次输入密码不一致！';
								isTrue = false;
							}
						} else {
							this.passwordFormAlarm.newRePassword = '请再次输入新密码！';
							isTrue = false;
						}
					} else {
						this.passwordFormAlarm.newPassword = '密码必须是8-20位字母数字组合';
					}
				} else {
					this.passwordFormAlarm.newPassword = '请输入新密码！';
					isTrue = false;
				}
				
				return isTrue;
			},
			
			// 关闭密码修改窗口
			cancelChangePassword() {
				this.resetPasswordForm();
				this.isShow = false;
			},
			
			resetPasswordForm() {
				this.passwordForm.oldPassword = '';
				this.passwordForm.newPassword = '';
				this.passwordForm.newRePassword = '';
				this.passwordFormAlarm.oldPassword = '';
				this.passwordFormAlarm.newPassword = '';
				this.passwordFormAlarm.newRePassword = '';
			}
		}
	}
</script>
