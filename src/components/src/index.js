import Input from '../packages/form/input/index.js'
import Textarea from '../packages/form/textarea/index.js'
import Button from '../packages/form/button/index.js'
import Radio from '../packages/form/radio/index.js';
import RadioGroup from '../packages/form/radio-group/index.js';
import RadioButton from '../packages/form/radio-button/index.js';
import Checkbox from '../packages/form/checkbox/index.js';
import CheckboxButton from '../packages/form/checkbox-button/index.js';
import CheckboxGroup from '../packages/form/checkbox-group/index.js';
import Message from '../packages/notice/message/index.js';
// import MessageBox from '../packages/notice/message-box/index.js';

const components = [
	Input,
	Textarea,
	Button,
	Radio,
	RadioGroup,
	RadioButton,
	Checkbox,
	CheckboxButton,
	CheckboxGroup,
	Message
];

const install = function (Vue, opts = {}) {
	components.forEach(component => {
		Vue.component(component.name, component);
	});

	// Vue.prototype.$msgbox = MessageBox;
	// Vue.prototype.$alert = MessageBox.alert;
	// Vue.prototype.$confirm = MessageBox.confirm;
	// Vue.prototype.$prompt = MessageBox.prompt;
	// Vue.prototype.$notify = Notification;
	// Vue.prototype.$message = Message;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default install;
