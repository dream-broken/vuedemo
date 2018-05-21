<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div style="width: 100%;height: 100%;">

    <!-- sku高级搜索 -->
    <div style="height: 5%;/*text-align: center; */">
      <el-select v-model="skuSearcherpmId" placeholder="选择采购经理" size="small" :clearable="true" @change="selectChange">
        <el-option v-for="item in purchaseManagers" :key="item.id" :label="item.realname"
                   :value="item.id"></el-option>
      </el-select>
      <el-switch
        v-model="skuSearcherpmId==user.id"
        active-text="只看我的"
        inactive-text="" @change="handleMe">
      </el-switch>
    </div>

    <!-- sku库存echars图 -->
    <div id="main" style="height: 94%;width: 100%;" @click="getSkuWmsBy()"></div><!--currentInit(),-->

    <!-- sku库存列表 -->
    <el-dialog :title="tableTitle" :visible.sync="dialogTableVisible" top="2%" width="40%">
      <el-table :data="gridPageData">
        <el-table-column property="skuid" label="skuid" width="150"></el-table-column>
        <el-table-column property="skuname" label="商品名" width="200"></el-table-column>
        <el-table-column property="wmsquantity" label="库存/件"></el-table-column>
        <el-table-column property="spmId" label="采购经理"></el-table-column>
      </el-table>
      <!--分页--><!--:current-page="currentPage4"-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20]"
        :page-size="currentPageSize"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="gridData.length">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import Vue from 'vue'
  import { getWmsTotal, getSkuAndWmsCountList, loadUsersByRole } from '@/service/api';
  import { userGet,userPageGet} from '@/usermanage/service/getData'
  import { mapGetters} from 'vuex'
  import { SkuSearcher } from '@/service/models'

  var oneSkuWmsName = '';

  export default {
    name: '',
    data () {//数据和 charts 变量可以描述在 data 中
      return {
        charts: '',
        //x轴 类目
        xAxisData:[],
        //y轴 数量
        seriesData:[],
        //模态窗总数据
        gridData: [],
        //模态窗当页数据
        gridPageData:[],
        //模态窗显示/隐藏
        dialogTableVisible: false,
        //模态窗标题
        tableTitle:'',
        //采购经理数据
        purchaseManagers:[],
        skuSearcher: new SkuSearcher(),
        //采购经理id
        skuSearcherpmId: '',
        //当前页
        currentPage:1,
        //显示条数
        currentPageSize:10
      }
    },
    //methods 中 定义一个方法，内容就是平时echarts的步骤。
    methods:{
      //定义echars函数
      drawPie(id){
        this.echarts = echarts.init(document.getElementById(id))
        this.echarts.setOption({
          /*title : {
           text: 'SKU',
           subtext: '纯属虚构',
           x:'center'
           },*/
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.xAxisData,
              name : '类目',
              axisTick: {
                alignWithLabel: true,
                interval:0
              },
              axisLabel: {
                interval: 0
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              name : '库存/件'
            }
          ],
          series : [
            {
              name:'数量',
              type:'bar',
              barWidth: '60%',
              label: {
                normal: {
                  show: true
                }
              },
              data:this.seriesData
            }
          ]
        })
      },
      //点击柱状图获取sku列表
      async getSkuWmsBy() {
        this.currentPageSize = 10;
        this.currentPage = 1;
        if (oneSkuWmsName != '' && oneSkuWmsName != null) {
          this.tableTitle = oneSkuWmsName;
          var res;
          var temp = this.skuSearcherpmId;
          if (temp != '' && temp != null) {
            res = await getSkuAndWmsCountList(oneSkuWmsName, temp);
          } else {
            res = await getSkuAndWmsCountList(oneSkuWmsName, '');
          }
          for  (var  i = 0; i < res.data.length; i++) {
            for  (var j = 0; j < this.purchaseManagers.length; j++) {
              if (res.data[i].spmId == this.purchaseManagers[j].id) {
                res.data[i].spmId = this.purchaseManagers[j].nickname;
              } else if (res.data[i].spmId == 0) {
                res.data[i].spmId = '--';
              }
            }
          }
          this.gridData = res.data;
          this.dialogTableVisible = true;
          oneSkuWmsName = '';
          this.handleCurrentChange(1);
        }
      },
      //获取采购经理
      async loadPurchaseManager() {
        let res = await loadUsersByRole('purchaseManager')
        if (!res || res.status != 200) return
        this.purchaseManagers = res.data
      },
      //只看我
      handleMe(flag){
        if(flag) {
          this.skuSearcherpmId = this.user.id;
          this.getWms(false, true);
        }
        else {
          this.skuSearcherpmId='';
          this.getWms(true, true);
        }
      },
      //选择经理
      selectChange(pr) {
        if (pr != null && pr != '') {
          this.getWms(false, true);
        } else {
          this.getWms(true, true);
        }
      },
      //每页几条
      handleSizeChange(page) {
        this.currentPageSize = page;
        this.handleCurrentChange(1);
      },
      //获取当前页
      handleCurrentChange(page) {
        this.gridPageData = [];
        this.currentPage = page;
        var pageSize = this.currentPageSize;
        var dataLength = this.gridData.length;
        var startIndex = (pageSize * page) - pageSize;
        var endIndex;
        if (pageSize * page >= dataLength) {
          endIndex = dataLength;
        } else {
          endIndex = (pageSize * page);
        }
        for (var i = startIndex; i < endIndex; i++) {
          this.gridPageData.push(this.gridData[i]);
        }
      },
      //加载数据 status全部/用户 clr首次加载/再次加载
      async getWms(status, clr) {
        if (clr) {
          this.echarts.clear();
        }
        var res;
        if (status) {
          res = await getWmsTotal("");
        } else {
          res = await getWmsTotal(this.skuSearcherpmId);
        }
        var i = 0;
        for (var t in res.data) {
          this.xAxisData[i] = t.split('（')[0];
          this.seriesData[i] = res.data[t] / 100;
          i++;
        }
        this.$nextTick(function() {
          this.drawPie('main');
          this.echarts.on('click', function (params) {
            //console.log(params);
            oneSkuWmsName = params.name;
          })
        });

      }
    },
    computed:{
      ...mapGetters([ 'user']),
    },
    //调用
    mounted(){//mounted 中调用 （mounted 是 vue 的生命周期，表示挂载完毕，html 已经渲染）
      this.getWms(true, false);
      this.loadPurchaseManager();
    }
  }

</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
