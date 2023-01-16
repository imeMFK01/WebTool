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


  FastaHeader: string;
  ProteinSequence: string;
  ProteinSequenceForDisplay; string;
  SeqPatchSize = 10;
  LineSeqPatchSize = 60;
  FastaHeaderWithLink: any;

  MainHeaderInfo:string= "";
  ProteinName: string = "";
  GeneName: string = "";
  NoOfAminoAcids: string = "";
  OrganismName: string = "";
  PositionArray:string = "";

  querryId: any;
  displayedColumns = ['Serial', 'Chain', 'Residue', 'ResiduePosition', 'DegreeNormalizedAveraged', 'DegreeNot-NormalizedAveraged', 'DegreeNormalizedNotAveraged', 'DegreeNotNormalizedNotAveraged', 'BetweennessNormalizedAveraged', 'BetweennessNotNormalizedAveraged', 'BetweennessNormalizedNotAveraged', 'BetweennessNotNormalizedNotAveraged'];
  CentralityDataValueObj = [];
  dataSource: MatTableDataSource<CentralityDataValue>;

  constructor(private route: ActivatedRoute, private _httpService: ConfigService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    //this._httpService.GetDetailedPFResults(this.querryId).subscribe(data => this.what(data));
    this._httpService.GetDetailedCentralityResults(this.querryId).subscribe(data => this.what(data));
  }


 


  what(data) {

    let DoubleQuoteJsonCentralityData = data.BridgeResultsFile.replaceAll("'", "\"");
    let CentralityData = JSON.parse(DoubleQuoteJsonCentralityData);

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

    //ResultsBridge.xlsx
    for (let Row = 0; Row < CentralityData.length; Row++) {
      let temp = new CentralityDataValue((Row + 1).toString(), CentralityData[Row][1], CentralityData[Row][2], CentralityData[Row][3],
        CentralityData[Row][4], CentralityData[Row][5], CentralityData[Row][6], CentralityData[Row][7], CentralityData[Row][8], CentralityData[Row][9], CentralityData[Row][10], CentralityData[Row][11]);      //Updated 202301121608//, CentralityData[Row][0]
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

export class CentralityDataValue {
  RowNo:string
  Chain:string;
  Residue:string;
  ResPosition: string;
  DegreeNormAvg: string;
  DegreeNotNormAvg: string;
  DegreeNormNotAvg: string;
  DegreeNotNormNotAvg: string;
  BetNormAvg: string;
  BetNotNormAvg: string;
  BetNormNotAvg: string;
  BetNotNormNotAvg: string;

  constructor(cRowNo, cChain, cResidue, cResPosition , cDegreeNormAvg, cDegreeNotNormAvg, cDegreeNormNotAvg, cDegreeNotNormNotAvg, cBetNormAvg, cBetNotNormAvg, cBetNormNotAvg, cBetNotNormNotAvg) {
    this.RowNo = cRowNo;
    this.Chain = cChain;
    this.Residue = cResidue;
    this.ResPosition = cResPosition;
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









// while (loopIsTrue) {
//   let start; //= IterSeq;
//   let end; //= this.SeqPatchSize;

//   if (IterSeq == 0) {
//     start = IterSeq;
//     end = this.SeqPatchSize;

//     this.ProteinSequenceForDisplay = (IterSeq + 1).toString() + ".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.ProteinSequence.substring(start, end) + " ";
//   }
//   else {
//     start = IterSeq;
//     end = start + this.SeqPatchSize;




//     //let Patch =  this.LineSeqPatchSize - 1;
//     if (IterSeq % this.LineSeqPatchSize == 0) {
//       this.ProteinSequenceForDisplay = this.ProteinSequenceForDisplay + "<br/>" + (IterSeq + 1).toString() + ".&nbsp;&nbsp;&nbsp;&nbsp;"
//     }
//     this.ProteinSequenceForDisplay = this.ProteinSequenceForDisplay + this.ProteinSequence.substring(start, end) + " ";

//     if (this.ProteinSequence.length < end) {
//       break;
//     }

//   }
//   IterSeq = IterSeq + 10;
// }