<template>
	<div class="lee-input-box" :class="[ inputSize ? 'lee-input-' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-clearable' : inputClearable
    }]">
		
		<template v-if="type === 'text'">
			<input
				class="lee-input-inner"
				:class="{'is-readonly': inputReadonly}"
				:type="type"
				:disabled="inputDisabled"
				:readonly="readonly"
				:value="currentValue"
				:placeholder="inputPlaceholder"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@change="handleChange"
				v-if="!inputReadonly">
			
			<input
				class="lee-input-inner"
				:class="{'is-readonly': inputReadonly}"
				:type="type"
				:disabled="inputDisabled"
				:readonly="readonly"
				:value="currentValue"
				:placeholder="inputPlaceholder"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@change="handleChange"
				v-if="inputReadonly"
				:unselectable="'on'"
				onfocus='this.blur()'>
		</template>
		
		<template v-if="type === 'password'">
			<input
				class="lee-input-inner"
				:class="{'is-readonly': inputReadonly}"
				:type="type"
				:disabled="inputDisabled"
				:readonly="readonly"
				:value="currentValue"
				:placeholder="inputPlaceholder"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@change="handleChange">
		</template>
	</div>
</template>

<script>
	export default {
		name: "lee-input",
		data() {
			return {
				currentValue: this.value === undefined || this.value === null ? '' : this.value,
				focused: false,
				isOnComposition: false,
				valueBeforeComposition: null
			}
		},
		
		props: {
			value: [String, Number],
			size: String,
			clearable: {
				type: Boolean,
				default: false
			},
			disabled: Boolean,
			readonly: Boolean,
			type: {
				type: String,
				default: 'text'
			},
			placeholder: [String]
		},
		
		computed: {
			inputSize() {
				return this.size;
			},
			inputClearable() {
				return this.clearable
			},
			inputDisabled() {
				return this.disabled;
			},
			inputReadonly() {
				return this.readonly
			},
			inputPlaceholder() {
				return this.placeholder
			}
		},
		
		methods: {
			handleFocus(event) {
				this.focused = true;
				this.$emit('focus', event);
			},
			
			handleBlur(event) {
				this.focused = false;
				this.$emit('blur', event);
			},
			
			handleInput(event) {
				const value = event.target.value;
				this.setCurrentValue(value);
				if (this.isOnComposition) return;
				this.$emit('input', value);
			},
			
			setCurrentValue(value) {
				this.currentValue = value;
			},
			
			handleChange(event) {
				this.$emit('change', event.target.value);
			},
		},
		
		watch: {
			value(val, oldValue) {
				this.setCurrentValue(val);
			}
		},
	}
</script>
<style>
	input::-ms-clear, input::-ms-reveal { display: none; }
</style>
