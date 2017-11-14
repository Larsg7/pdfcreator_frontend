import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  public config = CONFIG;
  backendVersion: string;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getBackendVersion().subscribe(v => this.backendVersion = v ? v.version : '');
  }

}
