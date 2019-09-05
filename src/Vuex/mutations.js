// import {DEL_LIST,
// 	TABLE_LIST,
// 	WATCH_TABLE_LIST
//
// } from "./mutation-types";

export default {

	// set menu data
	setMenuList(state, data) {
		state.menuList = data;
	},

	// set theme style
	setThemeStyle(state, name) {
		state.colorSkinName = name;
	},

	// DEL_LIST(state,rowId){
	//     alert(rowId);
	//
	// },
	// -----------
	TABLE_LIST(state, data) {//表格数据
		state.tableList=data;
	},
	// 表格数据是否改变
	WATCH_TABLE_LIST(state, data) {//监听表格数据变化
		state.watchTableList=data;
	},
	// 新增框是否显示
	IS_ADD_FORM(state, data) {//监听表格数据变化
		state.isAddForm=data;
	},
	TABLE_CURRENT_ROW(state, data) {//更新表格当前行数据
		state.tableCurrentRow=data;
	},
	// 列表数据总条数
	TOTAL_LIST_NUM(state, data) {
		state.totalListNum=data;
	},
	// 当前的列表pageNum
	CURRENT_PAGE_NUM(state, data) {
		state.currentPageNum=data;
	},
	// 当前的列表pageSize
	CURRENT_PAGE_Size(state, data) {
		state.currentPageSize=data;
	},
	// 新增,修改,查看的是否可编辑
	INPUT_DISABLED(state, data) {
		state.inputDisabled=data;
	},

}
