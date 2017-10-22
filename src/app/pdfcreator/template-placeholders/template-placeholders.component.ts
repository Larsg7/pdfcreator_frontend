import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-template-placeholders',
  templateUrl: './template-placeholders.component.html',
  styleUrls: ['./template-placeholders.component.scss']
})
export class TemplatePlaceholdersComponent implements OnInit {

  constructor(public templateService: TemplateService) { }

  ngOnInit() {
  }

}
