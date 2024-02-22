import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-examchart',
  templateUrl: './examchart.component.html',
  styleUrl: './examchart.component.css'
})
export class ExamchartComponent implements OnInit{
 total=0
  constructor(private api:ApiService){}
 ngOnInit(): void {
  this.refresh()
 }

 refresh(){
  let response=[
    {
      q1:0,
      q2:0,
      q3:0,
      q4:0,
      q5:0
    }
  ]
  let length=0

  let q1=0
  let q2=0
  let q3=0
  let q4=0
  let q5=0
  this.api.getExam().subscribe(res=>{
     response=res
     console.log(response)
     length=response.length
     this.total=length
     for(let i=0;i<length;i++){
      q1+=response[i].q1
      q2+=response[i].q2
      q3+=response[i].q3
      q4+=response[i].q4
      q5+=response[i].q5
   }
   console.log(q1,' ',q2,' ',q3,' ',q4,' ',q5)
  const pie_chart=document.getElementById('pie-chart')
  const pieChart = echarts.init(pie_chart);
  const option = {
    // title: {
    //   text: 'Chart for Q and A',
    //   subtext: 'Percentage of correct  answers',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: q1, name: 'question 1' },
          { value: q2, name: 'question 2' },
          { value: q3, name: 'question 3' },
          { value: q4, name: 'question 4' },
          { value: q5, name: 'question 5' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
 

  pieChart.setOption(option);


  //bar chart
  const bar_chart=document.getElementById('bar-chart')
  const barChart = echarts.init(bar_chart);
  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },

    
    xAxis: {
      type: 'category',
      data: ['question 1', 'question 2', 'question 3', 'question 4', 'question 5']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [q1,q2,q3,q4,q5],
        type: 'bar'
      }
    ]
  };
  barChart.setOption(option1);


  //line chart

const line_chart=document.getElementById('line-chart')
const lineChart = echarts.init(line_chart);
const option2 = {
  tooltip: {
    trigger: 'axis',
   
  },

  
  xAxis: {
    type: 'category',
    data: ['question 1', 'question 2', 'question 3', 'question 4', 'question 5']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [q1,q2,q3,q4,q5],
      type: 'line'
    }
  ]
};
lineChart.setOption(option2);

  },
  err=>{
    console.error(err)
  })

 


 

  
  
  
 }
}
