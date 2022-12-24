<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/logo.png" alt="" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陆时间：<span>2022-12-23</span></p>
            <p>上次登陆地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card class="box-card-table">
          <el-table :data="tableData" style="width: 100%">
            <!-- <el-table-column prop="name" label="课程"> </el-table-column>
            <el-table-column prop="todayBuy" label="今日购买">
            </el-table-column>
            <el-table-column prop="monthBuy" label="本月购买">
            </el-table-column>
            <el-table-column prop="totalBuy" label="总购买"> </el-table-column> -->
            <el-table-column
              v-for="(val, key) in tableLabel"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="count">
          <el-card
            :body-style="{ display: 'flex', padding: 0 }"
            v-for="item in countData"
            :key="item.name"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">¥{{ item.value }}</p>
              <p class="dec">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <!-- //折线图 -->
          <div ref="echartsLine" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <div ref="echartsBar" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="echartsPie" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '../api/index'
import * as echarts from 'echarts'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        { name: '今日收藏订单', value: 210, icon: 'star-on', color: '#ffb980' },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        { name: '本月收藏订单', value: 210, icon: 'star-on', color: '#ffb980' },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
    }
  },
  computed: {},
  mounted() {
    getData().then(({ data }) => {
      console.log(data, 111)
      const { tableData, orderData, userData, videoData } = data.data
      this.tableData = tableData
      // 获取X轴数据
      const xAxis = Object.keys(orderData.data[0])
      let myChart1 = echarts.init(this.$refs.echartsLine)
      let echarts1Option = {
        yAxis: {
          type: 'value',
        },
      }
      echarts1Option.xAxis = {
        data: xAxis,
      }
      echarts1Option.legend = {
        data: xAxis,
      }
      echarts1Option.series = []
      xAxis.forEach((item) => {
        echarts1Option.series.push({
          name: item,
          data: orderData.data.map((i) => i[item]),
          type: 'line',
        })
      })
      myChart1.setOption(echarts1Option)
      //柱状图
      let myChart2 = echarts.init(this.$refs.echartsBar)
      let echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333',
          },
        },
        xAxis: {
          type: 'category',
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map((item) => item.new),
            type: 'bar',
          },
          {
            name: '活跃用户',
            data: userData.map((item) => item.active),
            type: 'bar',
          },
        ],
      }
      myChart2.setOption(echarts2Option)
      // 饼图
      let myChart3 = echarts.init(this.$refs.echartsPie)
      let echarts3Option = {
        tooltip: {
          trigger: 'item',
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [
          {
            type: 'pie',
            // radius: '50%',
            data: videoData,
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)',
            //   },
            // },
          },
        ],
      }
      myChart3.setOption(echarts3Option)
    })
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  margin-bottom: 20px;
  img {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 40px;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 16px;
    }
  }
}
.box-card-table {
  margin-top: 20px;
  height: 460px;
}
.count {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .dec {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>
