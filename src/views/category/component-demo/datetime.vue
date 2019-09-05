<template>
	<div class="bg-color-white pd-tb20 pd-lr20 form-datetime">
		<div class="mg-b20">
			<div class="f16 h30 lh30">单时间点选择</div>
			<div class="">
				<el-time-select
					size="small"
					v-model="timeData"
					:picker-options="{
					start: '08:30',
					step: '00:10',
					end: '18:30'
				}"
					placeholder="选择时间">
				</el-time-select>
			</div>
		</div>
		
		<div class="mg-b20">
			<div class="f16 h30 lh30">时间区间选择</div>
			<div class="">
				<el-time-select
					placeholder="开始时间"
					size="small"
					v-model="startTime"
					:picker-options="{
						start: '00:00',
						step: '00:10',
						end: '23:59',
						maxTime: endTime
					}">
				</el-time-select>
				<el-time-select
					placeholder="结束时间"
					size="small"
					v-model="endTime"
					:picker-options="{
						start: '00:00',
						step: '00:10',
						end: '23:59',
						minTime: startTime
					}">
				</el-time-select>
			</div>
		</div>
		
		<div class="mg-b20">
			<div class="f16 h30 lh30">单独日期选择  <span class="f12">{{ date1 }}</span></div>
			<div class="w200">
				<el-date-picker
					v-model="date1"
					size="small"
					type="date"
					placeholder="选择日期"
					value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		</div>
		
		<div class="mg-b20">
			<div class="f16 h30 lh30">日期区间选择(禁止跨年)  <span class="f12">{{ dateRange1.startDate }} ~ {{ dateRange1.endDate }}</span></div>
			<div class="">
				<el-date-picker
					@change="setEndDate"
					v-model="dateRange1.startDate"
					size="small"
					type="date"
					:picker-options="dateRange1.startDatePicker"
					placeholder="选择开始日期"
					value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-date-picker
					@change="setStartDate"
					v-model="dateRange1.endDate"
					size="small"
					type="date"
					:picker-options="dateRange1.endDatePicker"
					placeholder="选择结束日期"
					value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		</div>
		
		<div class="mg-b20">
			<div class="f16 h30 lh30">日期区间选择(可跨年)  <span class="f12">{{ dateRange2.startDate }} ~ {{ dateRange2.endDate }}</span></div>
			<div class="">
				<el-date-picker
					@change="setEndDate2"
					v-model="dateRange2.startDate"
					size="small"
					type="date"
					:picker-options="dateRange2.startDatePicker"
					placeholder="选择开始日期"
					value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-date-picker
					@change="setStartDate2"
					v-model="dateRange2.endDate"
					size="small"
					type="date"
					:picker-options="dateRange2.endDatePicker"
					placeholder="选择结束日期"
					value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "form-datetime",
		
		data() {
			return {
				timeData: '',
				
				startTime: '',
				endTime: '',
				
				date1: '2019-05-20',
				
				//日期区间(禁止跨年)
				dateRange1: {
					startDate: null,
					endDate: null,
					startDatePicker: {},
					endDatePicker: {},
				},
				
				//日期区间(可跨年)
				dateRange2: {
					startDate: null,
					endDate: null,
					startDatePicker: {},
					endDatePicker: {},
				},
			}
		},
		
		methods: {
			setStartDate(startDate) {
				this.dateRange1.startDatePicker = Object.assign({}, this.dateRange1.startDatePicker, {
					disabledDate: (time) => {
						if (this.dateRange1.endDate) {
							//如果结束时间已选，则开始时间不能小于今天或者大于结束时间
							// console.log(new Date(this.insertDate.endDate).getFullYear());
							return time.getTime() > new Date(this.dateRange1.endDate).getTime() || time.getTime() < new Date(new Date(this.dateRange1.endDate).getFullYear(), 0, 1, 0, 0, 0).getTime();
						} else {
							//如果结束时间为空，则开始时间可以任意选择
							return time.getTime() < new Date(1970, 0, 1, 0, 0, 0).getTime();
						}
					}
				});
			},
			setEndDate(endDate) {
				this.dateRange1.endDatePicker = Object.assign({}, this.dateRange1.endDatePicker, {
					disabledDate: (time) => {
						if (this.dateRange1.startDate) {
							//如果开始时间已选，则结束时间不能小于开始时间
							return time.getTime() < new Date(this.dateRange1.startDate).getTime() || time.getTime() > new Date(new Date(this.dateRange1.startDate).getFullYear(), 11, 31, 0, 0, 0).getTime();
						} else {
							//如果开始时间为空，则结束时间不能小于今天
							// return time.getTime() > new Date(1970, 0, 1, 0, 0, 0).getTime();
						}
					}
				});
			},
			
			setStartDate2(startDate) {
				this.dateRange2.startDatePicker = Object.assign({}, this.dateRange2.startDatePicker, {
					disabledDate: (time) => {
						if (this.dateRange2.endDate) {
							//如果结束时间已选，则开始时间不能小于今天或者大于结束时间
							// console.log(new Date(this.insertDate.endDate).getFullYear());
							return time.getTime() > new Date(this.dateRange2.endDate).getTime();
						} else {
							//如果结束时间为空，则开始时间可以任意选择
							return time.getTime() < new Date(1970, 0, 1, 0, 0, 0).getTime();
						}
					}
				});
			},
			setEndDate2(endDate) {
				this.dateRange2.endDatePicker = Object.assign({}, this.dateRange2.endDatePicker, {
					disabledDate: (time) => {
						if (this.dateRange2.startDate) {
							//如果开始时间已选，则结束时间不能小于开始时间
							return time.getTime() < new Date(this.dateRange2.startDate).getTime();
						} else {
							//如果开始时间为空，则结束时间不能小于今天
							// return time.getTime() > new Date(1970, 0, 1, 0, 0, 0).getTime();
						}
					}
				});
			}
		}
	}
</script>
