import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-frustration',
  templateUrl: './frustration.component.html',
  styleUrls: ['./frustration.component.css'],
  providers: [ConfigService]
})
export class FrustrationComponent implements OnInit {

  querryId: any;
  ConfigurationalAroundImage:any;
  ConfigurationalImage:any;
  ConfigurationalMap:any;



  FastaHeader:string;
  ProteinSequence: string;
  ProteinSequenceForDisplay; string;
  SeqPatchSize = 10;
  LineSeqPatchSize = 60;
  FastaHeaderWithLink :any;

  MainHeaderInfo:string= "";
  ProteinName: string = "";
  GeneName: string = "";
  NoOfAminoAcids: string = "";
  OrganismName: string = "";
  PositionArray:string = "";

  constructor(private route: ActivatedRoute, private _httpService: ConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    this._httpService.GetDetailedFrustratometerResults(this.querryId).subscribe(data => this.what(data));
  }

  ngAfterViewInit() {
    // Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  what(data){

    // let DoubleQuoteJsonFrustrationData = data.replaceAll("'", "\"");
    // let FrustrationData = JSON.parse(DoubleQuoteJsonFrustrationData);

    // this.ConfigurationalAroundImage = FrustrationData[0];
    // this.ConfigurationalImage = FrustrationData[1];
    // this.ConfigurationalMap = FrustrationData[2];

    this.ConfigurationalAroundImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data.ImageFilesInListOfBlobs[0]);
    this.ConfigurationalImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data.ImageFilesInListOfBlobs[1]);
    this.ConfigurationalMap =  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data.ImageFilesInListOfBlobs[2]);


    //Formatting protein sequence for display
    let DoubleQuoteFastaFile = data.FastaFileInfo.replaceAll("'", "\"");
    let FastaFile = JSON.parse(DoubleQuoteFastaFile);
    this.FastaHeader = data.UniProtObj.PrimaryAccessionNo; //FastaFile.ProteinHeader; 
    this.ProteinSequence = FastaFile.ProteinSequence;

    //Data of Uniprot info
    if (data.UniProtObj.CheckDataFetched == "True")
    {
      this.MainHeaderInfo = data.UniProtObj.MainHeaderInfo;
      this.ProteinName = data.UniProtObj.ProteinName;
      this.GeneName = data.UniProtObj.GeneName;
      this.NoOfAminoAcids = data.UniProtObj.NoOfAminoAcids;
      this.OrganismName = data.UniProtObj.OrganismName;
    }


    let IterSeq = 0;
    let loopIsTrue = true;
    while (loopIsTrue) {
      let start; //= IterSeq;
      let end; //= this.SeqPatchSize;

      if (IterSeq == 0) {
        start = IterSeq;
        end = this.SeqPatchSize;

        this.ProteinSequenceForDisplay =  "&nbsp;&nbsp;&nbsp;&nbsp;" + this.ProteinSequence.substring(start, end) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        this.PositionArray = this.PositionArray + (IterSeq + 1).toString() + "." + "<br/>";
      }
      else {
        start = IterSeq;
        end = start + this.SeqPatchSize;




        //let Patch =  this.LineSeqPatchSize - 1;
        if (IterSeq % this.LineSeqPatchSize == 0) {
          this.ProteinSequenceForDisplay = this.ProteinSequenceForDisplay + "<br/>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
          this.PositionArray = this.PositionArray + (IterSeq + 1).toString() + "." + "<br/>";
        }
        this.ProteinSequenceForDisplay = this.ProteinSequenceForDisplay + this.ProteinSequence.substring(start, end) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

        if (this.ProteinSequence.length < end) {
          break;
        }

      }
      IterSeq = IterSeq + 10;
    }

    this.FastaHeaderWithLink = "http://www.uniprot.org/uniprot/" + this.FastaHeader;
    // let ProteinHeader = <HTMLLabelElement>document.getElementById("ProteinHeader");
    // ProteinHeader.innerHTML = this.FastaHeader;

    let sequence = <HTMLLabelElement>document.getElementById("sequence");
    sequence.innerHTML = this.ProteinSequenceForDisplay;
    
    let PositionArraySeq = <HTMLLabelElement>document.getElementById("PositionArraySeq");
    PositionArraySeq.innerHTML = this.PositionArray;

  }


}
