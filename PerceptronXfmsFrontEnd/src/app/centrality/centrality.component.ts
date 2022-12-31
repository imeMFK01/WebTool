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


  constructor(private route: ActivatedRoute, private _httpService: ConfigService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    //this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
    this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
  }




  what(data){

    

    let DoubleQuoteJsonPfSasaData = data.PfSasaTabXlsFile.replaceAll("'", "\"");
    let PfSasaData = JSON.parse(DoubleQuoteJsonPfSasaData);
  
    //ResultsBridge.xlsx
    for(let Row = 1; Row < PfSasaData.length; Row++)
    {
      
        let temp = new SasaPfDataValue(Row.toString(), PfSasaData[Row][0], PfSasaData[Row][1], PfSasaData[Row][2], PfSasaData[Row][3]);
        this.SasaPfDataValueObj.push(temp);
    }
    this.dataSource = new MatTableDataSource(this.SasaPfDataValueObj);

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

export class SasaPfDataValue{
  RowNo:string;
  AminoAcidNo: string;
  Residue: string;
  SasaValue: string;
  LogPfValue: string;


  constructor(cRowNo, cAminoAcidNo, cResidue, cSasaValue, cLogPfValue) {
    this.RowNo = cRowNo;
    this.AminoAcidNo = cAminoAcidNo;
    this.Residue = cResidue;
    this.SasaValue = cSasaValue;
    this.LogPfValue = cLogPfValue;

  }

}











}


