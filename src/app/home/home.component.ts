import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import { Color, Label } from 'ng2-charts';


//import * as CanvasJS from '../assets/canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	products = [];
	products2 = [];
	dataSource = [];
	dataBar1 = [];
	dataBar2 = [];
	dataCount = [];
	dataCount2 = [];

	 displayedColumns: string[] = ['segment','riskIdentifiedBy','riskIdentifiedThrough','opensince','program','project','impact','rag','riskID','riskCategory'];
	 displayedColumns2: string[] = ['programs','statustrackingandreportingRigor','projectComplexity','resourceFullfillmentorStabilityorAttrition','teamCompetencyandSkill',
	                                 'effortEstimates','scheduleEstimates','requirementsStabilityorClarity','milestoneAchievement','codeQualityandHighDefectsDensity',
									 'productivityBlueOptima','productivityDta','customerSLA','projectManagementRisk','teamOrganizationandStructure','subContractingandVendorDeliverables',
									  'customerCommitment','customerProcess'];

  constructor(private dataService: DataService) { }
	add(x) {
		let sum=0;
		for(let i=0;i<this.products2.length;i++)
	  {
		 sum=sum+x[i];
	  }
  return sum;
  }

  ngOnInit(){
	  this.dataService.sendGetRequest().subscribe((data: any[])=>{
		// console.log(data);
      this.products = data;
	  this.dataSource = this.products;
	  this.dataBar1 = this.products.map(item => item.rag)
	  this.dataCount.push(this.dataBar1.filter((v) => (v == 'Code Red')).length);
	  this.dataCount.push(this.dataBar1.filter((v) => (v == 'Amber Escalate')).length);
	  this.dataCount.push(this.dataBar1.filter((v) => (v == 'Amber Manage')).length);
	  this.dataCount.push(this.products.length);
	 // this.dataBar2 = this.products.map(item => item.name)


    })


	this.dataService.sendGetRequest2().subscribe((data: any[])=>{

      this.products2 = data;

	  var temp= this.products2.map(item => item.teamCompetencyandSkill);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.projectComplexity);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.resourceFullfillmentorStabilityorAttrition);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.statustrackingandreportingRigor);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.effortEstimates);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.scheduleEstimates);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.requirementsStabilityorClarity);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.milestoneAchievement);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.codeQualityandHighDefectsDensity);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.productivityBlueOptima);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.productivityDta);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.customerSLA);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.projectManagementRisk);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.teamOrganizationandStructure);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.subContractingandVendorDeliverables);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.customerCommitment);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));
	  temp= this.products2.map(item => item.customerProcess);
	  this.add(temp);
	  this.dataCount2.push(this.add(temp));


		console.log(this.dataCount2);
		console.log("hkgfhcbvn");
		//console.log(this.dataCount2);
     //this.dataBar2 = this.products.map(item => item.rag)
	//  this.dataCount.push(this.products.length);
    })

  }
  barChartOptions: ChartOptions = {

    scales: {
            xAxes: [{
              gridLines: {
				  drawOnChartArea: false


              }
            }],
            yAxes: [{
              gridLines: {
				  drawOnChartArea: false


              }
            }]
          },
	  responsive: true
  };
  chartType: string = 'horizontalBar';
  barChartLabels: Label[] = ["CODE RED","AMBER ESCALATE","AMBER MANAGE","TOTAL #PROGRAMS"];

colorchar   = ["red","yellow","yellow","blue"];

 // barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.dataCount,backgroundColor: this.colorchar, label: 'OVERALL RAG STATUS ' }
  ];

  //--------------------------------------------------------------------------------------------
  barChartLabels2: Label[] = ['Team Competency and Skill','Project Complexity','Resource Fullfillmentor Stability Or Attrition','Status Tracking And Reporting Rigor',
	                                 'Effort Estimates','Schedule Estimates','Requirements Stability Or Clarity','Milestone Achievement','Code Quality And High Defects Density',
									 'Productivity Blue Optima','Productivity Dta','Customer SLA','Project Management Risk','Team Organization And Structure','SubContracting And Vendor Deliverables',
									  'Customer Commitment','Customer Process'];
  colorchar2   = ["blue"];
   barChartData2: ChartDataSets[] = [
    { data: this.dataCount2,backgroundColor: "#739AC5",  label: '#RISKS' }
  ];


}
