import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';

interface Feature {
  description?: string;
  icon?: string;
  name?: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public config = CONFIG;
  public features: Feature[] = [
    {
      name: 'Serienerstellung',
      description: 'Erstelle eine Serie an Templates aus einem Excel Dokument.',
      icon: 'content_copy'
    },
    {
      name: 'Serienerstellung',
      description: 'Erstelle eine Serie an Templates aus einem Excel Dokument.',
      icon: 'content_copy'
    },
    {
      name: 'Serienerstellung',
      description: 'Erstelle eine Serie an Templates aus einem Excel Dokument.',
      icon: 'content_copy'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
