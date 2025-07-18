import { Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private translate: TranslateService) {
    }

    async ngOnInit() {
      console.log("begin ngOnInit App")
      this.translate.addLangs(['de', 'en']);
      this.translate.setDefaultLang('en');
      this.translate.use('en');

        const storedLang = localStorage.getItem('language');
        if (storedLang) {
          this.translate.use(storedLang);
        } else {
          const browserLang = this.translate.getBrowserLang();
          const defaultLang = browserLang?.match(/en|fr/) ? browserLang : 'en';
          this.translate.use(defaultLang);
          localStorage.setItem('language', defaultLang);
        }

        console.log("end ngOnInit App")
      }

}
