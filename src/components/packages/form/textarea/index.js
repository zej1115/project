import leeTextarea from './src/textarea';

/* istanbul ignore next */
leeTextarea.install = function(Vue) {
	Vue.component(leeTextarea.name, leeTextarea);
};

export default leeTextarea;
