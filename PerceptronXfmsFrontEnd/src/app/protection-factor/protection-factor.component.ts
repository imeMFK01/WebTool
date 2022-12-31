import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator, MatTableDataSource, MatCardModule } from '@angular/material';
// import PdbParser from 'ngl/ngl.js';
// import * as NGL from 'ngl/ngl.js';


//import { readFileSync } from 'fs';


@Component({
  selector: 'app-protection-factor',
  templateUrl: './protection-factor.component.html',
  styleUrls: ['./protection-factor.component.css'],
  providers: [ConfigService]
})
export class ProtectionFactorComponent implements OnInit {

  displayedColumns = ['Serial', 'ResiduePos', 'Residue','SASA', 'LogPF'];
  
  dataSource: MatTableDataSource<SasaPfDataValue>;
  JsonString: any;
  SasaPfDataValueObj = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  querryId: any;
  base64data: any;
  ImageFilePath: any;

  constructor(private route: ActivatedRoute, private _httpService: ConfigService, private sanitizer: DomSanitizer) {

    


    
    //const SasaPfDataValueObjArray: 
    // let SasaPfDataValueObj = new SasaPfDataValue();
    // const Obj: SasaPfDataValueObjArray[] = [];

    //SasaPfDataValueObj:  SasaPfDataValue;

   
    this.dataSource = new MatTableDataSource(this.SasaPfDataValueObj);

    let a = 1;

   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    //this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
    this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
        

  }

  what(data){

    //  SASAmain.png
    this.base64data = data.SasaFileBlob;
    this.ImageFilePath = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.base64data);

    

    let DoubleQuoteJsonPfSasaData = data.PfSasaTabXlsFile.replaceAll("'", "\"");
    let PfSasaData = JSON.parse(DoubleQuoteJsonPfSasaData);
    
    //this.JsonString = "[['Position_Tableleft','Residue','SASA','LogPF'],['12','ASP','22.83','4.4303'],['13','ASP','46.09','4.1309'],['14','PHE','105.19','4.1032'],['17','MET','41.29','4.1268'],['18','ARG','40.08','3.5593'],['19','ARG','141.62','4.6759'],['26','LYS','90.47','5.6613'],['27','GLU','104.92','3.669'],['34','GLU','79.5','3.0382'],['35','GLU','52.49','3.0297'],['37','GLU','120.65','2.9538'],['38','ASP','23.49','2.9697'],['41','ASP','35.14','3.593'],['57','ASP','21.05','2.7237'],['58','TRP','65.76','3.8844'],['59','ASN','87.62','3.6208'],['60','MET','24.55','4.098'],['62','ASN','114.53','3.4761'],['63','MET','26.01','4.2889'],['64','ASP','57.39','3.8723'],['75','ASP','38.55','3.4735'],['78','MET','38.76','3.9421'],['85','MET','25.21','3.9609'],['89','GLU','130.03','4.1631'],['91','LYS','103.29','3.8957'],['92','LYS','155.77','4.3745'],['94','ASN','37.11','3.1647'],['106','TYR','73.88','3.8436'],['109','LYS','46.31','4.129'],['122','LYS','122.04','5.4976']]";

    //PF_SASA_tab.xls
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








































































//     NGL.MMTF.fetch("3PQR",
//   // onLoad callback
//  function( mmtfData ){ console.log( mmtfData ) },
//  // onError callback
//   function( error ){ console.error( error ) }
//  );




//     let stringBlob = new Blob( [ data ], { type: 'text/plain'} );
//     NGL.autoLoad( stringBlob, { ext: "pdb" } );


//     NGL.autoLoad( "http://files.rcsb.org/download/5IOS.cif" );

    // const file = readFileSync('../../assets/Modifiedchey.txt', 'utf-8');


    // let stringBlob = new Blob( [ data ], { type: 'text/plain'} );
    // let ch = NGL.autoLoad( stringBlob, { ext: "pdb" } );

  
    // let x = new NGL.PdbWriter()

    // var stage;
    // stage.loadFile(data).then(function (o) {
    //   o.addRepresentation('cartoon')
    //   o.autoView()
    // })


    
    // stage = new NGL.Stage("viewport")
    // var load = NGL.getQuery("load")
    // if (load) stage.loadFile(load, { defaultRepresentation: true })
    // var script = NGL.getQuery("script")
    // if (script) stage.loadScript("./scripts/" + script + ".js")


    //let p = new PdbParser(data);
