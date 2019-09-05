<template>
	<div class="h50 pos-abs pos-c-t z-2 Header">
		<div class="h30 pos-abs pos-c-l l30 logo">
			<div class="block h100p" >
				<img class="block h100p" src="../../../static/images/logo.png" alt="logo">
			</div>
		</div>
		<div class="w30 h30 color-change pos-abs pos-c-r r100 z-1000" >
			<div @click="changeColorDown" class="mouse-hand w100p h100p">
				<svg class="iconThemeSkinType" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path d="M679.7 801.4H343c-10.1 0-18.4-8.2-18.4-18.4V543l-12.1 12.1c-3.4 3.4-8.1 5.4-13 5.4s-9.5-1.9-13-5.4l-105-105c-7.2-7.2-7.2-18.8 0-26L377 228.8c3.2-3.2 7.5-5.1 12-5.4h0.2c10.1-0.5 18.7 7.2 19.3 17.3 3.2 54.3 48.3 96.8 102.8 96.8 54.3 0 99.3-42.2 102.7-96.3 0.1-2.6 0.6-5.1 1.8-7.5 3.4-7 10.8-11.2 18.5-10.3 4.5 0.5 8.4 2.5 11.3 5.5L841 424.3c7.2 7.2 7.2 18.8 0 26l-105 105c-3.4 3.4-8.1 5.4-13 5.4s-9.5-1.9-13-5.4l-12.1-12.1v240c0.2 10-8 18.2-18.2 18.2z m-318.4-36.7h300V499.1 471.7c0-10.1 8.2-18.4 18.4-18.4 10.1 0 18.4 8.2 18.4 18.4v19.5l25.1 25.1 79-79-158.4-158.4c-18.6 55.6-71.2 95.3-132.5 95.3-61.2 0-113.8-39.7-132.5-95.3L220.5 437.3l79 79 25.1-25.1v-19.5c0-10.1 8.2-18.4 18.4-18.4s18.4 8.2 18.4 18.4v293z" fill="" p-id="1816"></path>
					<path d="M511.3 977.9c-62.8 0-123.8-12.3-181.2-36.6-55.4-23.5-105.2-57-148-99.8s-76.3-92.5-99.8-148C58 636.1 45.7 575.2 45.7 512.3S58 388.5 82.3 331.1c23.5-55.4 57-105.2 99.8-148s92.5-76.3 148-99.8C387.5 59 448.5 46.7 511.3 46.7c62.8 0 123.8 12.3 181.2 36.6 55.4 23.5 105.2 57 148 99.8s76.3 92.5 99.8 148c24.3 57.4 36.6 118.4 36.6 181.2s-12.3 123.8-36.6 181.2c-23.5 55.4-57 105.2-99.8 148s-92.5 76.3-148 99.8c-57.3 24.3-118.3 36.6-181.2 36.6z m0-894.5c-236.5 0-428.9 192.4-428.9 428.9 0 236.5 192.4 428.9 428.9 428.9 236.5 0 428.9-192.4 428.9-428.9 0-236.5-192.4-428.9-428.9-428.9z" fill="" p-id="1817"></path>
				</svg>
			</div>

			<transition name="box2">
				<div class="br4 overflow-hidden pos-abs t30 r0 theme-list-item" v-if="colorIsDown">
					<div @click="selectTheme(index)" class="color-down" v-for="(item, index) in themeSkinData">
							<div v-show="themeSkinType === item.className" class="redict-svg">
								<svg class="icon-redict" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6392" xmlns:xlink="http://www.w3.org/1999/xlink" ><path d="M946.884919 515.308303 80.423388 1023.999992 329.859284 508.744201 77.115081 0Z" fill="#1296db"></path></svg>
							</div>
							<div class="color-detail">{{item.styleName}}</div>
					</div>
				</div>
			</transition>

		</div>
		<div class="h30 color-change pos-abs pos-c-r r150">
			<div @click="operationDown" class="f16 h30 lh30 mouse-hand">管理员</div>
			<transition name="box2">
				<div class="bg-color-white br4 overflow-hidden pos-abs w120 r0 f14 t30 operation-select" v-if="operationDownData">
					<div @click="openChangePassword" class="h30 lh30 text-ellipsis mouse-hand pd-l30 pd-r10 pos-relative operation-select-item">
						<span>修改密码</span>
						<svg class="w16 h16 pos-abs pos-c-l l10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
							<path d="M539.733333 426.666667c-34.133333-100.266667-130.133333-170.666667-241.066667-170.666667-140.8 0-256 115.2-256 256s115.2 256 256 256c110.933333 0 204.8-70.4 241.066667-170.666667l185.6 0 0 170.666667 170.666667 0 0-170.666667 85.333333 0 0-170.666667L539.733333 426.666667zM298.666667 597.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333s38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333333 85.333333S345.6 597.333333 298.666667 597.333333z"></path>
						</svg>
					</div>
					
					<div class="h30 lh30 text-ellipsis mouse-hand pd-l30 pd-r10 pos-relative operation-select-item">
						<svg class="w16 h16 pos-abs pos-c-l l10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
							<path d="M758.494 309.269c0-153.706-121.349-278.759-270.522-278.759-149.135 0-270.505 125.051-270.505 278.759 0 104.819 56.481 196.214 139.675 243.81-163.206 60.427-280.258 221.445-280.258 410.164 0 16.698 13.146 30.25 29.342 30.25 16.237 0 29.361-13.533 29.361-30.25 0-206.897 163.338-375.23 364.105-375.23 2.464 0 4.814-0.393 7.088-0.979 140.397-9.999 251.715-130.587 251.715-277.761M487.971 527.531c-116.778 0-211.782-97.892-211.782-218.261 0-120.349 95.006-218.243 211.782-218.243 116.795 0 211.802 97.892 211.802 218.243 0.021 120.369-95.006 218.261-211.802 218.261M544.27 685.59c0 16.681 13.161 30.25 29.361 30.25h344.113c16.237 0 29.361-13.549 29.361-30.25 0-16.698-13.124-30.25-29.361-30.25h-344.113c-16.197 0-29.361 13.549-29.361 30.25M917.739 779.040h-344.113c-16.197 0-29.361 13.533-29.361 30.267 0 16.698 13.161 30.25 29.361 30.25h344.113c16.237 0 29.361-13.533 29.361-30.25 0-16.735-13.124-30.267-29.361-30.267M917.739 917.866h-344.113c-16.197 0-29.361 13.533-29.361 30.25s13.161 30.25 29.361 30.25h344.113c16.237 0 29.361-13.533 29.361-30.25s-13.124-30.25-29.361-30.25z" p-id="2243"></path>
						</svg>
						<div>个人信息</div>
					</div>
					<div @click="loginOut" class="h30 lh30 text-ellipsis mouse-hand pd-l30 pd-r10 pos-relative operation-select-item">
						<svg class="w16 h16 pos-abs pos-c-l l10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
							<path d="M514.304 958.977c-57.876 0-114.084-10.893-166.954-32.489-51.101-20.758-96.927-50.515-136.313-88.434-39.386-37.919-70.293-82.105-91.922-131.269-22.363-50.902-33.711-104.984-33.711-160.737 0-66.712 16.989-132.941 49.098-191.619 31.041-56.686 76.133-106.462 130.439-143.931 15.086-10.412 36.047-7.037 46.828 7.455 10.781 14.493 7.344 34.642-7.743 44.989-45.894 31.749-83.979 73.717-110.146 121.565-27.47 50.162-41.388 104.502-41.388 161.541 0 93.061 37.65 180.563 106.007 246.342 68.324 65.812 159.177 102.059 255.805 102.059 96.595 0 187.482-36.248 255.839-102.06 68.357-65.78 105.974-153.281 105.974-246.342 0-56.975-13.885-111.411-41.388-161.54-26.167-47.816-64.285-89.816-110.179-121.502-15.054-10.346-18.558-30.495-7.744-44.989 10.814-14.492 31.743-17.898 46.795-7.454 54.339 37.469 99.498 87.245 130.507 143.93 32.142 58.678 49.131 124.907 49.131 191.619 0 55.754-11.348 109.836-33.744 160.769-21.597 49.166-52.537 93.351-91.923 131.269-39.385 37.919-85.212 67.643-136.313 88.499-52.903 21.466-109.078 32.327-166.954 32.327h-0.001v0.002z m10.08-448.084c-18.524 0-33.544-14.397-33.544-32.264V96.164c0-17.803 15.02-32.296 33.544-32.296 18.525 0 33.578 14.493 33.578 32.296v382.465c0 17.867-15.052 32.264-33.578 32.264z"></path>
						</svg>
						<div>退出</div>
					</div>
				</div>
			</transition>
		</div>
		<div class="h30 lh30 pos-abs pos-c-r r40">
			<div class="fl">
				<div @click="fullScreen" class="mouse-hand w30 h30" v-if="isFullScreen">
					<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M795.5 192H581c-19.6 0-35.6 15.7-36 35.3-0.4 20.3 16.4 36.7 36.7 36.7h128.4L581 393.1c-14 14-14 36.9 0 50.9s36.9 14 50.9 0L760 315.9v129c0 19.6 15.8 35.6 35.3 36 20.2 0.4 36.7-16.4 36.7-36.7V228.5c0-20.1-16.3-36.5-36.5-36.5zM442.2 760H313.8L443 630.9c14-14 14-36.9 0-50.9s-36.9-14-50.9 0L264 708.1V579c0-19.6-15.8-35.6-35.3-36-20.2-0.4-36.7 16.4-36.7 36.7v215.6c0 20.3 16.4 36.7 36.7 36.7H443c19.6 0 35.6-15.7 36-35.3 0.3-20.3-16.5-36.7-36.8-36.7z" fill="#333333"></path>
						<path d="M838 136c27.6 0 50 22.4 50 50v652c0 27.6-22.4 50-50 50H186c-27.6 0-50-22.4-50-50V186c0-27.6 22.4-50 50-50h652m0-72H186c-16.4 0-32.4 3.2-47.5 9.6-14.5 6.1-27.6 14.9-38.8 26.1-11.2 11.2-20 24.2-26.1 38.8-6.4 15.1-9.6 31.1-9.6 47.5v652c0 16.4 3.2 32.4 9.6 47.5 6.1 14.5 14.9 27.6 26.1 38.8 11.2 11.2 24.2 20 38.8 26.1 15.1 6.4 31.1 9.6 47.5 9.6h652c16.4 0 32.4-3.2 47.5-9.6 14.5-6.1 27.6-14.9 38.8-26.1 11.2-11.2 20-24.2 26.1-38.8 6.4-15.1 9.6-31.1 9.6-47.5V186c0-16.4-3.2-32.4-9.6-47.5-6.1-14.5-14.9-27.6-26.1-38.8-11.2-11.2-24.2-20-38.8-26.1-15.1-6.4-31.1-9.6-47.5-9.6z" fill="#333333"></path>
					</svg>
				</div>
				<div @click="exitFullScreen" class="mouse-hand w30 h30" v-if="!isFullScreen">
					<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32">
						<path d="M421.4784 670.0544l-120.576 120.3712a45.312 45.312 0 0 1-64 0 45.1072 45.1072 0 0 1 0-63.8976l123.904-123.6992-111.5136-0.512a45.2096 45.2096 0 1 1 0.4608-90.368l217.1904 1.024c24.8832 0.1536 45.056 20.3264 45.056 45.2096v215.808a45.2096 45.2096 0 0 1-90.5216 0v-103.936z m182.784-315.136l120.576-120.3712a45.312 45.312 0 0 1 64 0 45.1072 45.1072 0 0 1 0 63.8464l-123.904 123.6992 111.5136 0.512a45.2096 45.2096 0 1 1-0.4608 90.4192l-217.1904-1.0752a45.2096 45.2096 0 0 1-45.056-45.1584V250.9824a45.2096 45.2096 0 0 1 90.5216 0v103.936zM170.6496 0h682.7008A170.6496 170.6496 0 0 1 1024 170.6496v682.7008A170.6496 170.6496 0 0 1 853.3504 1024H170.6496A170.6496 170.6496 0 0 1 0 853.3504V170.6496A170.6496 170.6496 0 0 1 170.6496 0z m0 93.0816c-42.8032 0-77.568 34.7648-77.568 77.568v682.7008c0 42.8032 34.7648 77.568 77.568 77.568h682.7008c42.8032 0 77.568-34.7648 77.568-77.568V170.6496c0-42.8032-34.7648-77.568-77.568-77.568H170.6496z" fill="#333333"></path>
					</svg>
				</div>
			</div>
		</div>
		
		<change-password ref="setPassword"></change-password>
	</div>
</template>

<script>
	import changePassword from './change-password'
	export default {
		name: "Header",
		props: [
			'themeSkinData',//所有的主题
			'themeSkinType'//当前的主题类型
		],
		components: {
			changePassword
		},
		data () {
			return {
				isFullScreen: true,
				colorIsDown: false,//换肤下拉
				operationDownData: false,//退出下拉
			}
		},
		methods: {
			// 换肤
			changeColorDown(e){
				this.operationDownData = false;
				e.stopPropagation();
				if(this.colorIsDown){
					this.colorIsDown = false;
				}else{
					this.colorIsDown = true;
				}

			},

			// set theme
			selectTheme(index) {
				this.$emit('setTheme', index);
				window.localStorage.setItem('themeId', index);
			},

			//个人信息和退出下拉
			operationDown(e) {
				this.colorIsDown = false;
				e.stopPropagation();
				if (this.operationDownData) {
					this.operationDownData = false;
				}else{
					this.operationDownData = true;
				}
			},
			
			// 打开修改密码窗口
			openChangePassword() {
				this.$emit('openChangePassword', true);
				this.$refs.setPassword.openChangePassword();
			},

			// login out
			loginOut() {
				//发请求，请求成功后退出登录
				window.sessionStorage.removeItem('loginToken');
				this.$router.push('/login');
			},

			// Turn to full screen
			fullScreen() {
				let docElm = document.documentElement;
				//W3C
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen();
					this.isFullScreen = false;
				}
				//FireFox
				else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen();
					this.isFullScreen = false;
				}
				//Chrome等
				else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen();
					this.isFullScreen = false;
				}
				//IE11
				else if (docElm.msRequestFullscreen) {
					docElm.msRequestFullscreen();
					this.isFullScreen = false;
				}
			},

			// Turn to windows
			exitFullScreen() {
				if (document.exitFullscreen) {
					document.exitFullscreen();
					this.isFullScreen = true;
				}
				else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
					this.isFullScreen = true;
				}
				else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
					this.isFullScreen = true;
				}
				else if (document.msExitFullscreen) {
					document.msExitFullscreen();
					this.isFullScreen = true;
				}
				if(typeof cfs != "undefined" && cfs) {
					cfs.call(el);
					this.isFullScreen = true;
				}
			}
		},

		mounted() {
			/*$('body').on('click', (e) => {
				e.stopPropagation();
				this.colorIsDown = false;
				this.operationDownData = false;
			});*/

		document.body.addEventListener('click',(e)=>{
			e.stopPropagation();
			this.colorIsDown = false;
			this.operationDownData = false;
			},false);
		}
	}
</script>
