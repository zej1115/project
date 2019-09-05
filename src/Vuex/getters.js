export default{
	getTableList:state => {/*表格数据*/
		return state.tableList;
	},
	getWatchTableList:state=>{
		return state.watchTableList;
	},
	// 新增框是否显示
	getIsAddForm:state=>{
		return state.isAddForm;
	},
	// 当前行数据
	getTableCurrentRow:state => {
		return state.tableCurrentRow;
	},
	// 列表数据总条数
	getTotalListNum:state => {
		return state.totalListNum;
	},
	// 当前的列表pageNum
	getCurrentPageNum:state => {
		return state.currentPageNum;
	},
	// 当前的列表pageSize
	getCurrentPageSize:state => {
		return state.currentPageSize;
	},
	// 新增,修改,查看的是否可编辑
	getInputDisabled:state => {
		return state.inputDisabled;
	},


}
