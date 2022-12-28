import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../config.service';
import { DomSanitizer } from '@angular/platform-browser';
import PdbParser from 'ngl/ngl.js';
import * as NGL from 'ngl/ngl.js';


//import { readFileSync } from 'fs';


@Component({
  selector: 'app-protection-factor',
  templateUrl: './protection-factor.component.html',
  styleUrls: ['./protection-factor.component.css'],
  providers: [ConfigService]
})
export class ProtectionFactorComponent implements OnInit {

  
  querryId: any;
  base64data: any;
  ImageFilePath: any;

  constructor(private route: ActivatedRoute, private _httpService: ConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    //this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
    this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
        

  }

  what(data){


    this.base64data = data.SasaFileBlob;
    this.ImageFilePath = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.base64data);


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
