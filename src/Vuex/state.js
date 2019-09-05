export default{
	loginToken: '',
	menuList: [], // menu list data
	colorSkinName: 'default', //theme style data
	// 表格数据
	tableList:[],
	// 表格数据变化
	watchTableList:false,
	// 新增框是否显示
	isAddForm:false,
	// 新增框内title
	addTitle:"新增数据",
	// 当前行数据
	tableCurrentRow: [],
	// 列表数据总条数
	totalListNum:null,
	// 当前的列表pageNum
	currentPageNum:1,
	// 当前的列表pageSize
	currentPageSize:5,
	// 新增,修改,查看的是否可编辑
	inputDisabled:false
}
