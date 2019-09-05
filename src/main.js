// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import qs from 'qs'
import router from './router'
import	Button from 'element-ui'
import	Input from 'element-ui'
import	Radio from 'element-ui'
import	RadioGroup from 'element-ui'
import	RadioButton from 'element-ui'
import	Checkbox from 'element-ui'
import	CheckboxButton from 'element-ui'
import	CheckboxGroup from 'element-ui'
import	Tree from 'element-ui'
import	datePicker from 'element-ui'
import	TimeSelect from 'element-ui'
import	TimePicker from 'element-ui'
import	Breadcrumb from 'element-ui'

import	BreadcrumbItem from 'element-ui'
import	Pagination from 'element-ui'
import	Message from 'element-ui'


import store from './Vuex/store'

Vue.use(Button);

Vue.use(Input);

Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);

Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);

Vue.use(Tree);

Vue.use(datePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Pagination);
Vue.use(Message);
Vue.use(Vuex);
Vue.prototype.$qs = qs;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
	store,
  router,
  components: { App },
  template: '<App/>'
});
