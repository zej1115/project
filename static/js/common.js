
//格式化get查询字符串
export function formatGetUrl (obj) {
  if (typeof(obj) === 'object') {
    var str = '';
    var getUrl = '';
    for (var i in obj) {
      if (obj[i] || obj[i] === 0 || obj[i] === '0' ) {
          str += i + '=' + encodeURIComponent(obj[i]) + '&'
      }
    }
    return str.replace(/&$/g,'');
  }
}

//格式化价格 (数字，小数位数)
export function formatNum(number, fractionalDigits) {
	if (!$.isNumeric(number)) {
		throw new Error('parameter [number] not a Number');
	}
	fractionalDigits = fractionalDigits || 0;

	var iThis = parseFloat(number);
	var that = iThis < 0 ? -iThis : iThis;
	var changeNum = (parseInt(that * Math.pow(10, fractionalDigits) + 0.5) / Math.pow(10, fractionalDigits)).toString();
	var index = changeNum.indexOf(".");
	if (index < 0 && fractionalDigits > 0) {
		changeNum = changeNum + ".";
		for (var i = 0; i < fractionalDigits; i++) {
			changeNum = changeNum + "0";
		}
	} else {
		index = changeNum.length - index;
		for (var i = 0; i < (fractionalDigits - index) + 1; i++) {
			changeNum = changeNum + "0";
		}
	}
	if (iThis < 0) {
		return -changeNum;
	} else {
		return changeNum;
	}
}

//格式化价格(千分位)
export function formatPriceNum(num) {
	num = num.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	return num;
}

//获取浏览器信息
export function getBrowserInfo() {
  var Sys = {
    ie: '',
    firefox: '',
    chrome: '',
    opera: '',
    safari: ''
  };
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
      (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
          (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
  return Sys;
}

//去除字符串首尾空格
export function trimString (str) {
  var reg = /(^\s+)|(\s+$)/g; //匹配首尾空格
  if (typeof(str) === 'string') {
      return str.replace(reg,'')
  }
}

//域名列表(测试环境)
export function baseUrl () {
  return {
    url_01: 'http://172.18.12.21',
    url_02: '',
    url_03: '',
    url_04: '',
    url_05: '',
    url_06: ''
  };
}

//域名列表(生产环境)
/*export function baseUrl () {
    return {
        url_01: 'http://10.1.20.92',
        url_02: 'http://10.1.20.92',
        url_03: 'http://10.1.20.92',
        url_04: 'http://10.1.20.92',
        url_05: 'http://10.1.20.92',
        url_06: 'http://10.1.20.93' //仅限定时任务
    };
}*/
