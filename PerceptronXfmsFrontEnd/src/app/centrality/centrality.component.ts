import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatCardModule } from '@angular/material';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-centrality',
  templateUrl: './centrality.component.html',
  styleUrls: ['./centrality.component.css'],
  providers: [ConfigService]
})
export class CentralityComponent implements OnInit {


  querryId: any;
  displayedColumns = ['Serial', 'ChainResPos', 'DegreeNormalizedAveraged', 'DegreeNot-NormalizedAveraged', 'DegreeNormalizedNotAveraged', 'DegreeNotNormalizedNotAveraged', 'BetweennessNormalizedAveraged', 'BetweennessNotNormalizedAveraged', 'BetweennessNormalizedNotAveraged', 'BetweennessNotNormalizedNotAveraged'];
  CentralityDataValueObj = [];
  dataSource: MatTableDataSource<CentralityDataValue>;

  constructor(private route: ActivatedRoute, private _httpService: ConfigService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    //this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
    this._httpService.GetDetailedCentralityResults(this.querryId).subscribe(data => this.what(data));
  }


  what(data){
    let DoubleQuoteJsonCentralityData = data.BridgeResultsFile.replaceAll("'", "\"");
    let CentralityData = JSON.parse(DoubleQuoteJsonCentralityData);
  
    //ResultsBridge.xlsx
    for(let Row = 0; Row < CentralityData.length; Row++)
    {
        let temp = new CentralityDataValue((Row+1).toString(), CentralityData[Row][0], CentralityData[Row][1], CentralityData[Row][2], CentralityData[Row][3],
        CentralityData[Row][4], CentralityData[Row][5], CentralityData[Row][6], CentralityData[Row][7], CentralityData[Row][8]);
        this.CentralityDataValueObj.push(temp);
    }
    this.dataSource = new MatTableDataSource(this.CentralityDataValueObj);
  }
  
  ngAfterViewInit() {
    // Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }


    // RunThis(){

    // }
  }
}

export class CentralityDataValue{
  RowNo:string;
  ChainResPos: string;
  DegreeNormAvg: string;
  DegreeNotNormAvg: string;
  DegreeNormNotAvg: string;
  DegreeNotNormNotAvg: string;
  BetNormAvg: string;
  BetNotNormAvg: string;
  BetNormNotAvg: string;
  BetNotNormNotAvg: string;

  constructor(cRowNo, cChainResPos, cDegreeNormAvg, cDegreeNotNormAvg, cDegreeNormNotAvg, cDegreeNotNormNotAvg, cBetNormAvg, cBetNotNormAvg, cBetNormNotAvg, cBetNotNormNotAvg) {
    this.RowNo = cRowNo;
    this.ChainResPos = cChainResPos;
    this.DegreeNormAvg = cDegreeNormAvg;
    this.DegreeNotNormAvg = cDegreeNotNormAvg;
    this.DegreeNormNotAvg = cDegreeNormNotAvg;
    this.DegreeNotNormNotAvg = cDegreeNotNormNotAvg;
    this.BetNormAvg = cBetNormAvg;
    this.BetNotNormAvg = cBetNotNormAvg;
    this.BetNormNotAvg = cBetNormNotAvg;
    this.BetNotNormNotAvg = cBetNotNormNotAvg;

  }

}