import leeInput from './src/input';

/* istanbul ignore next */
leeInput.install = function(Vue) {
	Vue.component(leeInput.name, leeInput);
};

export default leeInput;
