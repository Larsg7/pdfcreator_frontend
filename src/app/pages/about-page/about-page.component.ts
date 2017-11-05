import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  public config = CONFIG;

  constructor() { }

  ngOnInit() {
  }

}
