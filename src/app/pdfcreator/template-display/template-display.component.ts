import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-template-display',
  templateUrl: './template-display.component.html',
  styleUrls: ['./template-display.component.scss']
})
export class TemplateDisplayComponent implements OnInit {

  constructor(public templateService: TemplateService) {
  }

  ngOnInit() {
  }

}
