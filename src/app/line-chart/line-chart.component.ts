import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    const line_chart=document.getElementById('line-chart')
    const chart = echarts.init(line_chart);

    /*const option = {
      title: {
        text: 'Stacked Line'
      },
      color: ['yellow', 'grey'], // Line colors
     
      xAxis: {
        type: 'category',
        name:'week',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        nameTextStyle: { color: 'red' },
        axisLabel: { color: 'green' }
      },
      yAxis: {
        type: 'value',
        name:'value',
        nameTextStyle: { color: 'yellow',fontSize:'30px' },
        axisLabel: { color: 'red' }
      },
     
      tooltip: { // Configure tooltip
        trigger: 'axis',
        // textStyle: { color: 'blue' },
        // axisPointer: {
        //   type: 'cross'
        // },
        // //formatter: '{b}: {c}' // Tooltip format
        // formatter: function(params:any) {
        //   let tooltip = params[0].axisValueLabel + '<br/>';
        //   params.forEach((param:any) => {
        //     const textStyle = {
        //       color: param.seriesIndex === 0 ? 'yellow' : 'grey' // Different color for each series
        //     };
        //     tooltip += `<span style="color:${textStyle.color};">${param.seriesName}: ${param.value}</span><br/>`;
        //   });
        //   return tooltip;
        // }
      },
      legend: {
        data: ['country A','country B']
      },
       series: [//{
      //   data: [120, 200, 150, 80, 70, 110, 130,70],

      //   type: 'line',
      //   smooth: true,
      //   areaStyle: {}
      // },
      {
        name: 'Country A', // Name for the series (line)
        data: [120, 200, 150, 80, 70, 110, 130], // Data for Country A
        type: 'line',
       
        tooltip: {
          textStyle: { color: 'yellow' } // Text color for tooltip of Country A
        }
      },
      {
        name: 'Country B', // Name for the series (line)
        data: [150, 180, 170, 90, 80, 120, 140], // Data for Country B
        type: 'line',
        
        tooltip: {
          textStyle: { color: 'grey' } // Text color for tooltip of Country A
        }
      },
    ] };*/
    const option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 1000, name: 'Video Ads' }
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
   

    chart.setOption(option);
  }
}