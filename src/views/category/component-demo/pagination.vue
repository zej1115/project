<template>
	<div class="bg-color-white pd-tb20 pd-lr20 navigation">
		<div class="f18 h50 lh50">分页</div>
		
		<div class="mg-b20">
			<div class="h30 lh30">左对齐</div>
			<div class="clear">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="[5, 10, 20]"
					:page-size="5"
					layout="total, sizes, prev, pager, next, jumper"
					:total="100">
				</el-pagination>
			</div>
		</div>
		
		<hr>
		
		<div class="mg-b20">
			<div class="h30 lh30">右对齐</div>
			<div class="clear">
				<el-pagination
					background
					class="fr"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="[5, 10, 20]"
					:page-size="5"
					layout="total, sizes, prev, pager, next, jumper"
					:total="100">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "navigation",
		
		data() {
			return {
				currentPage4: 1
			};
		},
		
		methods: {
			handleSizeChange(val) {
				console.log('每页条数：' + val);
			},
			handleCurrentChange(val) {
				console.log('当前页：' + val);
			}
		},
	}
</script>

