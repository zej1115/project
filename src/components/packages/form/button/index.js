import leeButton from './src/button';

/* istanbul ignore next */
leeButton.install = function(Vue) {
  Vue.component(leeButton.name, leeButton);
};

export default leeButton;
