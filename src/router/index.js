import Vue from 'vue'
import Router from 'vue-router'

/* login begin */
import Login from '../views/login'
/* login end */

/* Home begin */
/*import Home from '../views/home'*/
/* Home end */


Vue.use(Router);

let routes = [
	/*{
		path: '/',
		component: Index,
		children: [
			{
				path: '/',
				name: '欢迎页面',
				component : () => import('../views/home')
			}
		]
	},*/

	/* 消息系统 begin */
	{
		path: '/message',
		component: () => import('../views/index-message'),
		children: [
			{
				path: '/',
				name: '消息系统欢迎页面',
				component : () => import('../views/category/message/welcome')
			},

			// 基础设置
			{
				path: '/setting/organ',
				name: '组织机构',
				component : () => import('../views/category/message/setting/setting-organ')
			},
			{
				path: '/setting/permission',
				name: '角色及权限',
				component : () => import('../views/category/message/setting/setting-permission')
			},
			{
				path: '/setting/user-manage',
				name: '用户管理',
				component : () => import('../views/category/message/setting/setting-user-manage')
			},

			{
				path: '/setting/account-record',
				name: '账户登记',
				component : () => import('../views/category/message/setting/setting-account-record')
			},
			{
				path: '/setting/account-manage',
				name: '账户管理',
				component : () => import('../views/category/message/setting/setting-account-manage')
			},
			{
				path: '/setting/account-setting',
				name: '账户级参数设置',
				component : () => import('../views/category/message/setting/setting-account-setting')
			},
			{
				path: '/setting/contact-manage',
				name: '通讯簿管理',
				component : () => import('../views/category/message/setting/setting-contact-manage')
			},
			{
				path: '/setting/sms-keyword',
				name: '常用短语',
				component : () => import('../views/category/message/setting/setting-sms-keyword')
			},
			{
				path: '/setting/setting-demo1',
				name: '演示页面1',
				component : () => import('../views/category/message/setting/setting-demo')
			},
			{
				path: '/setting/setting-demo2',
				name: '演示页面2',
				component : () => import('../views/category/message/setting/setting-demo2')
			},

			// 短信
			{
				path: '/sms/up-sms-model',
				name: '上行短信回复模板',
				component : () => import('../views/category/message/sms/sms-up-sms-model')
			},
			{
				path: '/sms/sms-model',
				name: '短信模板',
				component : () => import('../views/category/message/sms/sms-sms-model')
			},
			{
				path: '/sms/group-sending',
				name: '批量短信发送',
				component : () => import('../views/category/message/sms/sms-group-sending')
			},
			{
				path: '/sms/quick-send',
				name: '快捷短信发送',
				component : () => import('../views/category/message/sms/sms-quick-send')
			},
			{
				path: '/sms/up-sms-manage',
				name: '上行短信管理',
				component : () => import('../views/category/message/sms/sms-up-sms-manage')
			},

			// 彩信
			{
				path: 'mms/mms-sending',
				name: '彩信发送',
				component : () => import('../views/category/message/mms/mms-mms-sending')
			},
			{
				path: 'mms/mms-model',
				name: '彩信模板',
				component : () => import('../views/category/message/mms/mms-mms-model')
			},

			// 统计查询
			{
				path: '/statistical-query/account-record',
				name: '账户报表',
				component : () => import('../views/category/message/statistical-query/statistical-query-account-record')
			},
			{
				path: '/statistical-query/account-change',
				name: '账户变动查询',
				component : () => import('../views/category/message/statistical-query/statistical-query-account-change')
			},
			{
				path: '/statistical-query/amount-record',
				name: '发送量报表',
				component : () => import('../views/category/message/statistical-query/statistical-query-amount-record')
			},
			{
				path: '/statistical-query/sms-sent',
				name: '已发送消息查询',
				component : () => import('../views/category/message/statistical-query/statistical-query-sms-sent')
			},
			{
				path: '/statistical-query/sms-type',
				name: '归档消息查询',
				component : () => import('../views/category/message/statistical-query/statistical-query-sms-type')
			},
			{
				path: '/statistical-query/blacklist',
				name: '黑名单进出查询',
				component : () => import('../views/category/message/statistical-query/statistical-query-blacklist')
			},

			// 组件demo
			{
				path: '/component-demo/tree',
				name: '树形菜单',
				component: () => import('../views/category/component-demo/tree')
			},
			{
				path: '/component-demo/datetime',
				name: '时间日期插件',
				component: () => import('../views/category/component-demo/datetime')
			},
			{
				path: '/component-demo/pagination',
				name: '分页插件',
				component: () => import('../views/category/component-demo/pagination')
			},
			{
				path: '/component-demo/popup-select',
				name: '弹窗选择',
				component: () => import('../views/category/component-demo/popup-select')
			},

		]
	},

	/* 消息系统 end */

	/* 服务系统 begin */
	{
		path: '/service',
		component: () => import('../views/index-service'),
		children: [
			{
				path: '/',
				name: '服务系统欢迎页面',
				component : () => import('../views/category/service/welcome')
			},

			// 公告管理
			{
				path: '/service/notice-manage',
				name: '公告管理',
				component: () => import('../views/category/service/notice-manage')
			},

			// 接口管理
			{
				path: '/service/api-manage/http-sms',
				name: 'HTTP短信接口服务',
				component: () => import('../views/category/service/api-manage/api-manage-http-sms')
			},
			{
				path: '/service/api-manage/cmpp-sms',
				name: 'CMPP短信接口服务',
				component: () => import('../views/category/service/api-manage/api-manage-cmpp-sms')
			},
			{
				path: '/service/api-manage/web-service-mms',
				name: 'WebService短彩信接口服务',
				component: () => import('../views/category/service/api-manage/api-manage-web-service-mms')
			},
			{
				path: '/service/api-manage/db-sms',
				name: '数据库短信接口',
				component: () => import('../views/category/service/api-manage/api-manage-db-sms')
			},
			{
				path: '/service/api-manage/mm7-mms',
				name: 'MM7彩信接口',
				component: () => import('../views/category/service/api-manage/api-manage-mm7-mms')
			},
			{
				path: '/service/api-manage/platform-parameter-setting',
				name: '平台级参数设置',
				component: () => import('../views/category/service/api-manage/api-manage-platform-parameter-setting')
			},
			{
				path: '/service/api-manage/platform-blacklist',
				name: '平台级黑名单',
				component: () => import('../views/category/service/api-manage/api-manage-platform-blacklist')
			},
			{
				path: '/service/api-manage/channel-record',
				name: '通道登记',
				component: () => import('../views/category/service/api-manage/api-manage-channel-record')
			},
			{
				path: '/service/api-manage/banned-word',
				name: '违禁词',
				component: () => import('../views/category/service/api-manage/api-manage-banned-word')
			},
			{
				path: '/service/api-manage/sending-norm',
				name: '发送规则',
				component: () => import('../views/category/service/api-manage/api-manage-sending-norm')
			},
			{
				path: '/service/api-manage/province-network',
				name: '省网通道管理',
				component: () => import('../views/category/service/api-manage/api-manage-province-network')
			},
			{
				path: '/service/api-manage/up',
				name: '上行管理',
				component: () => import('../views/category/service/api-manage/api-manage-up')
			},

			{
				path: '/service/api-manage/status-error-code',
				name: '状态报告错误码',
				component: () => import('../views/category/service/api-manage/api-manage-status-error-code')
			},
			{
				path: '/service/api-manage/num-section',
				name: '号段管理',
				component: () => import('../views/category/service/api-manage/api-manage-num-section')
			},
			{
				path: '/service/api-manage/bill',
				name: '账单管理',
				component: () => import('../views/category/service/api-manage/api-manage-bill')
			},
			{
				path: '/service/api-manage/sms-plan',
				name: '套餐管理',
				component: () => import('../views/category/service/api-manage/api-manage-sms-plan')
			},
			{
				path: '/service/api-manage/dev-api-norm',
				name: '开发接口规范',
				component: () => import('../views/category/service/api-manage/api-manage-dev-api-norm')
			},

			{
				path: '/service/bill-manage',
				name: '服务系统 - 账单管理',
				component: () => import('../views/category/service/bill-manage')
			},

			{
				path: '/service/num-section-location',
				name: '服务系统 - 号段归属省份',
				component: () => import('../views/category/service/num-section-location')
			},

			{
				path: '/service/prepayment-recharge-manage',
				name: '服务系统 - 预付费充值管理',
				component: () => import('../views/category/service/prepayment-recharge-manage')
			},

		]
	},
	/* 服务系统 end */

	{
		path: '/login',
		name: 'Login',
		component: resolve => require(['../views/login'],resolve),
	},

	{
		name: '选择系统',
		path: '/select-system',
		component: () => import('../views/select-system'),
	},

	{
		path: '/forgot-password',
		name: 'forgot-password',
		component: () => import('../views/common/forgot-password')
	},

	//if url not found, to this path
	{
		path: '*',
		redirect : '/select-system'
	}
];

let router = new Router({
	routes
});


router.beforeEach((to, from, next) => {
	let loginToken = window.sessionStorage.getItem('loginToken');
	// console.log(to.path);
	// console.log(loginToken);

	if (loginToken) {
		if (to.path === '/login') {
			router.push('/');
		} else {
			next();
		}
	} else {
		if (to.path === '/login' || to.path === '/forgot-password') {
			next();
		} else {
			router.push('/login');
		}
	}
});

export default router;
