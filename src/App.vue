<template>
  <div id="app">
  	<!--在模板中使用组件-->
  	
  	<!--数据绑定-->
  	<!--<v-binding></v-binding>-->
    
    <!--vue-resource 也就是ajax-->
    <!--<v-vueResource></v-vueResource>-->
    
    <!--Axios 也就是ajax-->
    <!--<v-axiostest></v-axiostest>-->
    
    <!--子父组件互相获取数据/方法-->
    <!--<v-parent01></v-parent01>-->
    
    <!--同级组件相互传-->
    <!--<v-parent02></v-parent02>-->
    
    <div>
    	<!--路由 路径传参-->
    	<router-link to="/re/1/age">re</router-link>
    	<!--路由 get传参-->
      <router-link to="/ax?id=2">ax</router-link>
    </div>
    <!--路由-->
    <router-view></router-view>
    
  </div>
</template>

<script>
	
//引入组件
//数据绑定
import binding from './view/binding.vue';
//vue-resource 也就是ajax
import vueResource from './view/vue_resource.vue';
//Axios 也就是ajax
import axiostest from './view/axiostest.vue';
//子父组件互相获取数据/方法
import parent01 from './view/parent01.vue';
//同级组件相互传
import parent02 from './view/parent02.vue';

	
export default {
  //业务逻辑里面定义的数据
  data () {
    return {
      
    }
  },
  //放方法的地方
  methods:{
  	
  },
  /*挂载组件  前面的组件名称不能和html标签一样*/
  components: {
  	//数据绑定
  	'v-binding' : binding,
  	//vue-resource 也就是ajax
  	'v-vueResource' : vueResource,
  	//vaxios 也就是ajax
  	'v-axiostest' : axiostest,
  	'v-parent01' : parent01,
  	'v-parent02' : parent02
  }
  
}
</script>

<style lang="scss">

</style>
