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

    this.ConfigurationalAroundImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data[0]);
    this.ConfigurationalImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data[1]);
    this.ConfigurationalMap =  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + data[2]);

  }


}
