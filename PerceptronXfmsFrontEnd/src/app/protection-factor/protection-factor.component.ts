import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-protection-factor',
  templateUrl: './protection-factor.component.html',
  styleUrls: ['./protection-factor.component.css'],
  providers: [ConfigService]
})
export class ProtectionFactorComponent implements OnInit {

  querryId: any;

  constructor(private route: ActivatedRoute, private _httpService: ConfigService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    let hereitis = 1;
  }

  ngAfterViewInit() {
    // Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

}
