import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex);

export default  new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})

// export const store = new Vuex.Store({
// 	// add state attribute
// 	state: {
// 		loginToken: '',
// 		menuList: [], // menu list data
// 		colorSkinName: 'default' //theme style data
// 	},
// 	getters: {
//
// 	},
//
// 	// set state attribute
// 	mutations: {
// 		// set menu data
// 		setMenuList(state, data) {
// 			state.menuList = data;
// 		},
//
// 		// set theme style
// 		setThemeStyle(state, name) {
// 			state.colorSkinName = name;
// 		}
// 	},
// 	actions: {
//
// 	}
// });
