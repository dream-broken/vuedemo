import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
Vue.use(VueResource);

import router from './modules/router.js';
import store from './modules/store.js';

import 'font-awesome/scss/font-awesome.scss'

//Vue-html5-editor是一个Vue的富文本编辑器插件，简洁灵活可扩展，适用于vue2.0以上版本，支持IE11. https://github.com/PeakTai/vue-html5-editor
import VueHtml5Editor from 'vue-html5-editor'
Vue.use(VueHtml5Editor, {
	// 全局组件名称，使用new VueHtml5Editor(options)时该选项无效 
	name: "vue-html5-editor",
	// 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
	showModuleName: true,
	// 自定义各个图标的class，默认使用的是font-awesome提供的图标
	icons: {
		text: "fa fa-pencil",
		color: "fa fa-paint-brush",
		font: "fa fa-font",
		align: "fa fa-align-justify",
		list: "fa fa-list",
		link: "fa fa-chain",
		unlink: "fa fa-chain-broken",
		tabulation: "fa fa-table",
		image: "fa fa-file-image-o",
		hr: "fa fa-minus",
		eraser: "fa fa-eraser",
		undo: "fa-undo fa",
		"full-screen": "fa fa-arrows-alt",
	},
	// 配置图片模块
	image: {
		// 文件最大体积，单位字节  max file size
		sizeLimit: 512 * 1024,
		// 上传参数,默认把图片转为base64而不上传
		upload: {
			url: 'https://jsonplaceholder.typicode.com/posts/',
			headers: {},
			params: {},
			fieldName: 'false'
		},
		// 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
		compress: {
			width: 1600,
			height: 1600,
			quality: 80
		},
		// 响应数据处理,最终返回图片链接
		uploadHandler(responseText) {
			//default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
			var json = JSON.parse(responseText)
			if(!json.ok) {
				console.log(json.msg)
			} else {
				console.log(json.msg);
				return json.data
			}
		}
	},
	// 语言，内建的有英文（en-us）和中文（zh-cn）
	language: "zh-cn",
	// 自定义要显示的模块，并控制顺序
	visibleModules: [
		"text",
		"color",
		"font",
		"align",
		"list",
		"link",
		"unlink",
		"tabulation",
		"image",
		"hr",
		"eraser",
		"undo",
		"full-screen",
	],
	// 扩展模块，具体可以参考examples或查看源码
	// extended modules
	modules: {
		//omit,reference to source code of build-in modules
	}
});

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})