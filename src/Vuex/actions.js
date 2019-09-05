// import {DEL_LIST,
// 	TABLE_LIST,
// 	WATCH_TABLE_LIST,
// } from "./mutation-types";

export default{
	// delTableList({commit},rowId){
	//  commit(DEL_LIST,rowId)
	// },

	// 设置列表数据
	setTableList({commit}, data) {
		commit('TABLE_LIST', data);
	},
	// 监听列表数据
	setWatchTableList({commit}, data) {
		commit('WATCH_TABLE_LIST', data);
	},
	// 新增框是否显示
	setIsAddForm({commit}, data) {
		commit('IS_ADD_FORM', data);
	},
	// 表格当前行数据
	setTableCurrentRow({commit}, data) {
		commit('TABLE_CURRENT_ROW', data);
	},
	// 列表数据总条数
	setTotalListNum({commit}, data) {
		commit('TOTAL_LIST_NUM', data);
	},
	// 当前的列表pageNum
	setCurrentPageNum({commit}, data) {
		commit('CURRENT_PAGE_NUM', data);
	},
	// 当前的列表pageSize
	setCurrentPageSize({commit}, data) {
		commit('CURRENT_PAGE_Size', data);
	},
	// 新增,修改,查看的是否可编辑
	setInputDisabled({commit}, data) {
		commit('INPUT_DISABLED', data);
	},
}
