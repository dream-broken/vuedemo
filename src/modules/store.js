/*Vuex 是一个专为 Vue.js 设计的状态管理模式
	vuex解决了组件之间同一状态的共享问题。当我们的应用遇到多个组件共享状态时，会需要：
	多个组件依赖于同一状态。传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。这需要你去学习下，vue编码中多个组件之间的通讯的做法。
	来自不同组件的行为需要变更同一状态。我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。
	以上的这些模式非常脆弱，通常会导致无法维护的代码。来自官网的一句话：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
	它采用集中式存储管理应用的所有组件的状态。这里的关键在于集中式存储管理。这意味着本来需要共享状态的更新是需要组件之间通讯的，而现在有了vuex，就组件就都和store通讯了。问题就自然解决了。
	这就是为什么官网再次会提到Vuex构建大型应用的价值。如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。
	https://vuex.vuejs.org/zh-cn/
*/
/*Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
    1.vuex解决了组件之间同一状态的共享问题  （解决了不同组件之间的数据共享）
    2.组件里面数据的持久化。
*/

//使用
//cnpm/npm install vuex --save
//引入vue
import Vue from 'vue';
//引入vuex
import Vuex from 'vuex';
//使用Vuex
Vue.use(Vuex);

//数据存放
var state = {
	count : 0
}

//方法存放
var mutations = {
	add(state,num) {
		state.count += num;
	}
}

//实例化
const store = new Vuex.Store({
	state,
	mutations
});

//暴露出
export default store;

//在main.js内引入 这样是全局引入 想局部使用就在那个页面引入
//import store from './modules/store.js';

//挂载
//store,

//数据访问
//this.$store.state.count

//方法访问
//this.$store.commit('add', 2);
