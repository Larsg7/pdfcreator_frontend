import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../config';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component';

interface Feature {
  description?: string;
  icon?: string;
  name?: string;
  link?: string;
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
      name: 'Immer die aktuellste Version',
      description: `Keine unterschiedlichen Versionen mehr, im ${this.config.APP_NAME} ist immer die aktuelle Version
      des Templates verfügbar.`,
      icon: 'update'
    },
    {
      name: 'Serienerstellung',
      description: 'Erstelle eine Serie an Templates aus einem Excel Dokument.',
      icon: 'library_books',
      link: '#'
    },
    {
      name: 'Nutzeraccounts',
      description: 'Speichere deine Templates in einem Nutzeraccount und nutze sie überall.',
      icon: 'account_circle'
    },
    {
      name: 'Verschiedene Platzhalter',
      description: 'Nutze Platzhalter für einzelne, Variablen für mehrere Ersetzungen und Ausdrücke für eine Vielzahl an Funktionen.',
      icon: 'build',
      link: '#'
    },
    {
      name: 'Geschützte Daten',
      description: 'Deine Daten werden auf Servern der Universität gespeichert.',
      icon: 'lock',
      link: '#'
    },
    {
      name: 'Open Source',
      description: `Der ${this.config.APP_NAME} ist komplett Open Source und frei zu nutzen.`,
      icon: 'thumb_up',
      link: 'https://github.com/Larsg7/pdfcreator_frontend'
    },
  ]

  constructor(private nav: Router,
              private alert: AlertService,
              private auth: AuthService) {
  }

  ngOnInit() {
  }

  go() {
    if (this.auth.isUserLoggedIn()) {
      this.navigateToApp();
    } else {
      this.alert.showDialog(LoginDialogComponent, {}).then((res) => {
        if (res) {
          this.go();
        }
      });
    }
  }

  private navigateToApp() {
    this.nav.navigate(['/app']);
  }

}
