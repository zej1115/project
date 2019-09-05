<template>
	<div class="lee-textarea-box" :class="[ inputSize ? 'lee-input-' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-clearable' : inputClearable
    }]">
		<template>
			<textarea class="lee-textarea-inner"
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
			</textarea>
			<textarea class="lee-textarea-inner"
								:disabled="inputDisabled"
								:readonly="readonly"
								:value="currentValue"
								:placeholder="inputPlaceholder"
								@input="handleInput"
								@focus="handleFocus"
								@blur="handleBlur"
								@change="handleChange"
								v-if="!inputReadonly">
			</textarea>
		</template>
	</div>
</template>

<script>
	export default {
		name: "lee-textarea",
		data() {
			return {
				currentValue: this.value === undefined || this.value === null ? '' : this.value
			}
		},

		props: {
			value: [String, Number],
			clearable: {
				type: Boolean,
				default: false
			},
			disabled: Boolean,
			readonly: Boolean,
			placeholder: [String]
		},

		computed: {
			inputSize() {
				return this.size;
			},
			inputClearable() {
				console.log(this.clearable);
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
	}
</script>
