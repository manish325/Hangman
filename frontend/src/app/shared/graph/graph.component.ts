import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { IGraphData } from 'src/app/core/models/graph';
import { GraphService } from 'src/app/core/services/player/graph/graph.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
 graphData : IGraphData[] = [];
  constructor(private graphService : GraphService) {}

  ngOnInit(): void {
    // this.createGraph();
    this.getGraphData();
  }

  ngAfterViewInit(): void {
    this.createGraph();
  }

  createGraph(): void {
    // Prepare your graph data
    const graphData = [
      { tournament: 'Tournament A', score: 150 },
      { tournament: 'Tournament B', score: 220 },
      { tournament: 'Tournament C', score: 180 },
      // Add more data as needed
    ];

    // Create the chart
    Highcharts.chart('chartContainer', {
      chart: {
        type: 'column', // Specify the chart type as 'column'
      },
      title: {
        text: 'Players Graph',
      },
      xAxis: {
        categories: this.graphData.map((data) => data.tournament),
        title: {
          text: 'Tournament Name',
        },
      },
      yAxis: {
        title: {
          text: 'Score',
        },
      },
      series: [
        {
          type: 'column', // Specify the series type as 'column'
          name: 'Score',
          data: this.graphData.map((data) => data.score),
        },
      ],
    });
  }

  getGraphData() {
    this.graphService.getGraphData().subscribe({
      next : (response : IGraphData[])=>{
        this.graphData = response;
        this.createGraph();
      }
    })
  }
}
